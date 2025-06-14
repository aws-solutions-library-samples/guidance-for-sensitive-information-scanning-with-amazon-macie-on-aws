import { Context, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Macie2Client, CreateClassificationJobCommand, CreateClassificationJobCommandOutput } from '@aws-sdk/client-macie2';
import { MacieJobRequest, MacieJobResponse } from './types/macie-job-request';
import { isMacieJobRequest } from './types/macie-job-request.guard';
import { Logger } from '../shared/utils/logger';
import { ErrorHandler } from '../shared/utils/error-handler';
import { EventBridgeValidator } from '../shared/utils/eventbridge-validator';

/**
 * Type guard to check if event is an API Gateway proxy event
 */
function isAPIGatewayEvent(event: any): event is APIGatewayProxyEvent {
  return event && typeof event === 'object' && 'httpMethod' in event && 'headers' in event;
}

/**
 * Create standardized API Gateway error response
 */
function createAPIGatewayErrorResponse(statusCode: number, message: string, requestId: string): APIGatewayProxyResult {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token'
    },
    body: JSON.stringify({
      success: false,
      error: {
        type: 'ValidationError',
        message,
        requestId
      }
    })
  };
}

/**
 * Create standardized API Gateway success response
 */
function createAPIGatewaySuccessResponse(data: any): APIGatewayProxyResult {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token'
    },
    body: JSON.stringify(data)
  };
}

/**
 * AWS Lambda handler for creating Amazon Macie Classification Jobs
 * 
 * This function:
 * 1. Handles both direct Lambda invocation and API Gateway proxy events
 * 2. Validates the input event using ts-auto-guard generated type guards
 * 3. Creates a Macie Classification Job using the AWS SDK
 * 4. Provides detailed logging of all operations
 * 5. Returns structured success/error responses
 */
export const handler = async (
  event: MacieJobRequest | APIGatewayProxyEvent,
  context: Context
): Promise<MacieJobResponse | APIGatewayProxyResult> => {
  const startTime = Date.now();

  // Initialize logger with context
  const logger = new Logger({
    requestId: context.awsRequestId,
    functionName: context.functionName,
    functionVersion: context.functionVersion
  });

  // Initialize error handler
  const errorHandler = new ErrorHandler(logger, context);

  logger.info('Lambda function started', {
    functionName: context.functionName,
    functionVersion: context.functionVersion,
    remainingTimeInMillis: context.getRemainingTimeInMillis(),
    eventType: isAPIGatewayEvent(event) ? 'APIGatewayProxyEvent' : 'DirectInvocation'
  });

  try {
    // Step 1: Parse and validate input event
    logger.info('Parsing input event');

    let macieJobRequest: MacieJobRequest;

    if (isAPIGatewayEvent(event)) {
      // Handle API Gateway proxy event
      logger.info('Processing API Gateway proxy event');
      
      if (!event.body) {
        const errorMessage = 'API Gateway event missing body';
        return createAPIGatewayErrorResponse(400, errorMessage, context.awsRequestId);
      }

      try {
        macieJobRequest = JSON.parse(event.body);
        logger.info('Successfully parsed API Gateway request body');
      } catch (parseError: any) {
        const errorMessage = 'Invalid JSON in request body';
        logger.error('JSON parse error', parseError);
        return createAPIGatewayErrorResponse(400, errorMessage, context.awsRequestId);
      }
    } else {
      // Handle direct Lambda invocation
      logger.info('Processing direct Lambda invocation');
      macieJobRequest = event as MacieJobRequest;
    }

    // Step 2: Validate the parsed request
    logger.info('Validating MacieJobRequest schema');

    if (!isMacieJobRequest(macieJobRequest)) {
      const errorMessage = 'Invalid input: Event does not match MacieJobRequest schema';
      if (isAPIGatewayEvent(event)) {
        return createAPIGatewayErrorResponse(400, errorMessage, context.awsRequestId);
      }
      return errorHandler.handleValidationError(errorMessage, macieJobRequest);
    }

    logger.info('Input validation successful', {
      jobType: macieJobRequest.jobType,
      jobName: macieJobRequest.name,
      hasS3JobDefinition: !!macieJobRequest.s3JobDefinition,
      hasBucketDefinitions: !!macieJobRequest.s3JobDefinition?.bucketDefinitions,
      bucketDefinitionsCount: macieJobRequest.s3JobDefinition?.bucketDefinitions?.length || 0
    });

    // Step 3: Validate required EventBridge tag
    logger.info('Validating required JobStatusEventBusArn tag');

    const eventBridgeValidator = new EventBridgeValidator(logger);
    const eventBusArn = eventBridgeValidator.findEventBusArnTag(macieJobRequest.tags);

    if (!eventBusArn) {
      const errorMessage = 'Required tag "JobStatusEventBusArn" is missing';
      const providedTags = macieJobRequest.tags ? Object.keys(macieJobRequest.tags) : [];
      const errorResponse = errorHandler.handleEventBridgeValidationError(
        errorMessage,
        undefined,
        `Missing required tag. Provided tags: ${providedTags.join(', ')}`
      );
      
      if (isAPIGatewayEvent(event)) {
        return createAPIGatewayErrorResponse(400, errorMessage, context.awsRequestId);
      }
      return errorResponse;
    }

    logger.info('Found JobStatusEventBusArn tag', { eventBusArn });

    // Validate EventBus ARN format and existence
    const validationResult = await eventBridgeValidator.validateEventBusArn(eventBusArn);

    if (!validationResult.isValid) {
      const errorMessage = 'Invalid or non-existent EventBus ARN in JobStatusEventBusArn tag';
      return errorHandler.handleEventBridgeValidationError(
        errorMessage,
        eventBusArn,
        validationResult.error
      );
    }

    logger.info('EventBridge validation successful', {
      eventBusArn,
      eventBusName: validationResult.eventBusName
    });

    // Step 3: Initialize Macie client
    logger.info('Initializing Macie client');

    const macieClient = new Macie2Client({
      region: process.env.AWS_REGION || 'us-east-1'
    });

    // Step 4: Prepare CreateClassificationJob command
    logger.info('Preparing CreateClassificationJob command');

    const createJobCommand = new CreateClassificationJobCommand(macieJobRequest);

    // Log the API request (sanitized)
    logger.logApiRequest('Macie2', 'CreateClassificationJob', macieJobRequest);

    // Step 5: Execute the Macie API call
    logger.info('Executing CreateClassificationJob API call');
    const apiStartTime = Date.now();

    let response: CreateClassificationJobCommandOutput;

    try {
      response = await macieClient.send(createJobCommand);
    } catch (macieError: any) {
      const apiDuration = Date.now() - apiStartTime;
      logger.error('Macie API call failed', macieError, {
        apiDuration: `${apiDuration}ms`
      });

      return errorHandler.handleAwsApiError(macieError, 'Macie2', 'CreateClassificationJob');
    }

    const apiDuration = Date.now() - apiStartTime;

    // Log the API response (sanitized)
    logger.logApiResponse('Macie2', 'CreateClassificationJob', response, apiDuration);

    // Step 6: Validate response
    if (!response.jobId || !response.jobArn) {
      const errorMessage = 'Invalid response from Macie API: Missing jobId or jobArn';
      return errorHandler.handleCustomError('InvalidApiResponse', errorMessage, response);
    }

    // Step 7: Prepare success response
    const successResponse: MacieJobResponse = {
      success: true,
      data: {
        jobId: response.jobId,
        jobArn: response.jobArn,
        requestId: context.awsRequestId
      }
    };

    logger.info('Macie Classification Job created successfully', {
      jobId: response.jobId,
      jobArn: response.jobArn,
      jobName: macieJobRequest.name,
      jobType: macieJobRequest.jobType
    });

    // Log total execution time
    logger.logTiming('CreateMacieJob Lambda execution', startTime);

    // Return appropriate response format based on invocation type
    if (isAPIGatewayEvent(event)) {
      return createAPIGatewaySuccessResponse(successResponse);
    }
    
    return successResponse;

  } catch (error: any) {
    // Handle unexpected errors
    return errorHandler.handleUnexpectedError(error);
  }
};
