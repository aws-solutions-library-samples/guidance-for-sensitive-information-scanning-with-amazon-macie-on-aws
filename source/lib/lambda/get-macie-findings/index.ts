import { Context, APIGatewayProxyResult } from 'aws-lambda';
import { 
  GetFindingsAPIEvent,
  GetFindingsRequest,
  GetFindingsResponse,
  GetFindingsErrorResponse
} from './types/api-gateway-event';
import { MacieFindingsRetriever } from './utils/findings-retriever';
import { Logger } from '../shared/utils/logger';
import { ErrorHandler } from '../shared/utils/error-handler';

/**
 * AWS Lambda handler for retrieving Macie job findings via API Gateway
 */
export const handler = async (
  event: GetFindingsAPIEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
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
    eventType: 'API Gateway'
  });

  try {
    return await handleAPIGatewayEvent(event, context, logger, errorHandler, startTime);
  } catch (error: any) {
    logger.error('Unexpected error in Lambda execution', error);
    return createAPIGatewayErrorResponse(500, 'Internal Server Error', error.message, context.awsRequestId);
  }
};

/**
 * Handle API Gateway GET /get-findings requests
 */
async function handleAPIGatewayEvent(
  event: GetFindingsAPIEvent,
  context: Context,
  logger: Logger,
  errorHandler: ErrorHandler,
  startTime: number
): Promise<APIGatewayProxyResult> {
  
  logger.info('Processing API Gateway request', {
    httpMethod: event.httpMethod,
    resource: event.resource,
    path: event.path
  });

  // Step 1: Validate and parse request parameters
  const request = parseAPIGatewayRequest(event);
  if (!request.success) {
    const errorMessage = (request as { success: false; error: string }).error;
    logger.error('Invalid request parameters', { error: errorMessage });
    return createAPIGatewayErrorResponse(400, 'Bad Request', errorMessage, context.awsRequestId);
  }

  const { jobId, maxResults = 50, nextToken } = request.data;

  logger.info('Processing findings request', {
    jobId,
    maxResults,
    hasNextToken: !!nextToken
  });

  // Step 2: Initialize findings retriever
  logger.info('Initializing Macie findings retriever');
  const findingsRetriever = new MacieFindingsRetriever(logger);

  // Step 3: Retrieve paginated findings
  logger.info('Retrieving paginated findings', { jobId, maxResults });
  const retrievalStartTime = Date.now();
  
  let paginatedResult;
  try {
    paginatedResult = await findingsRetriever.getFindingsForJobPaginated(jobId, maxResults, nextToken);
  } catch (macieError: any) {
    logger.error('Failed to retrieve findings from Macie', macieError, { jobId });
    return createAPIGatewayErrorResponse(500, 'Macie API Error', macieError.message, context.awsRequestId);
  }

  const retrievalDuration = Date.now() - retrievalStartTime;
  
  logger.info('Successfully retrieved paginated findings', {
    jobId,
    findingsReturned: paginatedResult.findings.length,
    totalFindings: paginatedResult.totalCount,
    hasNextToken: !!paginatedResult.nextToken,
    retrievalDuration: `${retrievalDuration}ms`
  });

  // Step 4: Prepare success response
  const successResponse: GetFindingsResponse = {
    success: true,
    data: {
      jobId: jobId,
      findings: paginatedResult.findings,
      totalFindings: paginatedResult.totalCount,
      maxResults: maxResults,
      nextToken: paginatedResult.nextToken,
      requestId: context.awsRequestId
    }
  };

  // Log summary statistics
  logger.info('Findings retrieval completed', {
    jobId,
    findingsReturned: paginatedResult.findings.length,
    totalFindings: paginatedResult.totalCount,
    findingsByCategory: paginatedResult.findings.reduce((acc, finding) => {
      acc[finding.category] = (acc[finding.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    findingsBySeverity: paginatedResult.findings.reduce((acc, finding) => {
      const severity = finding.severity?.description || 'Unknown';
      acc[severity] = (acc[severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  });

  // Log total execution time
  logger.logTiming('GetMacieFindings API execution', startTime);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token'
    },
    body: JSON.stringify(successResponse)
  };
}


/**
 * Parse and validate API Gateway request parameters
 */
function parseAPIGatewayRequest(event: GetFindingsAPIEvent): { success: true; data: GetFindingsRequest } | { success: false; error: string } {
  const queryParams = event.queryStringParameters;
  
  if (!queryParams || !queryParams.jobId) {
    return { success: false, error: 'Missing required parameter: jobId' };
  }

  const jobId = queryParams.jobId.trim();
  if (!jobId) {
    return { success: false, error: 'jobId parameter cannot be empty' };
  }

  let maxResults = 50; // Default value
  if (queryParams.maxResults) {
    const parsedMaxResults = parseInt(queryParams.maxResults, 10);
    if (isNaN(parsedMaxResults) || parsedMaxResults < 1 || parsedMaxResults > 50) {
      return { success: false, error: 'maxResults must be a number between 1 and 50' };
    }
    maxResults = parsedMaxResults;
  }

  const nextToken = queryParams.nextToken || undefined;

  return {
    success: true,
    data: {
      jobId,
      maxResults,
      nextToken
    }
  };
}

/**
 * Create standardized API Gateway error response
 */
function createAPIGatewayErrorResponse(
  statusCode: number,
  errorType: string,
  message: string,
  requestId: string
): APIGatewayProxyResult {
  const errorResponse: GetFindingsErrorResponse = {
    success: false,
    error: {
      type: errorType,
      message: message,
      requestId: requestId
    }
  };

  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token'
    },
    body: JSON.stringify(errorResponse)
  };
}
