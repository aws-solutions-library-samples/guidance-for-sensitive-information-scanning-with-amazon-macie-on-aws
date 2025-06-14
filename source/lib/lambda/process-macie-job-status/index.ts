import { Context } from 'aws-lambda';
import { Macie2Client, DescribeClassificationJobCommand } from '@aws-sdk/client-macie2';
import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';
import { 
  CloudWatchLogsEvent, 
  MacieJobLogEvent, 
  MacieJobStatusEventDetail 
} from './types/cloudwatch-logs-event';
import { MacieEventProcessor } from './utils/event-processor';
import { Logger } from '../shared/utils/logger';
import { EventBridgeValidator } from '../shared/utils/eventbridge-validator';

/**
 * AWS Lambda handler for processing Macie job status events from CloudWatch Logs
 * 
 * This function:
 * 1. Decodes CloudWatch Logs subscription filter events
 * 2. Parses Macie job log events
 * 3. Retrieves full job details from Macie API
 * 4. Extracts EventBus ARN from job tags
 * 5. Publishes enriched events to EventBridge
 */
export const handler = async (
  event: CloudWatchLogsEvent,
  context: Context
): Promise<void> => {
  const startTime = Date.now();
  
  // Initialize logger with context
  const logger = new Logger({
    requestId: context.awsRequestId,
    functionName: context.functionName,
    functionVersion: context.functionVersion
  });

  logger.info('Lambda function started', {
    functionName: context.functionName,
    functionVersion: context.functionVersion,
    remainingTimeInMillis: context.getRemainingTimeInMillis()
  });

  try {
    // Step 1: Decode CloudWatch Logs data
    logger.info('Decoding CloudWatch Logs data');
    const eventProcessor = new MacieEventProcessor(logger);
    const logsData = eventProcessor.decodeCloudWatchLogsData(event);

    // Step 2: Parse Macie job log events
    logger.info('Parsing Macie job log events');
    const macieEvents = eventProcessor.parseMacieLogEvents(logsData);

    if (macieEvents.length === 0) {
      logger.info('No relevant Macie events found, exiting');
      return;
    }

    // Step 3: Initialize AWS clients
    logger.info('Initializing AWS clients');
    const macieClient = new Macie2Client({
      region: process.env.AWS_REGION || 'us-east-1'
    });
    
    const eventBridgeClient = new EventBridgeClient({
      region: process.env.AWS_REGION || 'us-east-1'
    });

    const eventBridgeValidator = new EventBridgeValidator(logger);

    // Step 4: Process each Macie event
    logger.info('Processing Macie events', { eventCount: macieEvents.length });
    
    for (const macieEvent of macieEvents) {
      await processMacieEvent(
        macieEvent,
        macieClient,
        eventBridgeClient,
        eventBridgeValidator,
        eventProcessor,
        logger
      );
    }

    // Log total execution time
    logger.logTiming('ProcessMacieJobStatus Lambda execution', startTime);
    
    logger.info('Successfully processed all Macie events');

  } catch (error: any) {
    logger.error('Unexpected error in Lambda execution', error);
    throw error; // Re-throw to fail Lambda execution
  }
};

/**
 * Process a single Macie job event
 */
async function processMacieEvent(
  macieEvent: MacieJobLogEvent,
  macieClient: Macie2Client,
  eventBridgeClient: EventBridgeClient,
  eventBridgeValidator: EventBridgeValidator,
  eventProcessor: MacieEventProcessor,
  logger: Logger
): Promise<void> {
  const jobId = macieEvent.jobId;
  
  logger.info('Processing Macie event', {
    eventType: macieEvent.eventType,
    jobId: jobId,
    jobName: macieEvent.jobName
  });

  try {
    // Step 1: Get full job details from Macie API
    logger.info('Retrieving Macie job details', { jobId });
    const jobDetailsStartTime = Date.now();
    
    let jobDetails;
    try {
      const describeJobCommand = new DescribeClassificationJobCommand({
        jobId: jobId
      });
      
      const response = await macieClient.send(describeJobCommand);
      jobDetails = response;
      
      logger.logApiResponse('Macie2', 'DescribeClassificationJob', response, Date.now() - jobDetailsStartTime);
    } catch (macieError: any) {
      logger.error('Macie API call failed - failing execution', macieError, {
        jobId: jobId,
        eventType: macieEvent.eventType
      });
      
      // Throw error to fail Lambda execution as per requirements
      throw new Error(`Failed to retrieve Macie job details for ${jobId}: ${macieError.message}`);
    }

    // Step 2: Extract EventBus ARN from job tags
    const eventBusArn = eventBridgeValidator.findEventBusArnTag(jobDetails.tags);
    
    if (!eventBusArn) {
      logger.error('JobStatusEventBusArn tag not found in Macie job', undefined, {
        jobId: jobId,
        availableTags: jobDetails.tags ? Object.keys(jobDetails.tags) : []
      });
      
      // Log error but continue processing (don't fail execution for missing tag)
      return;
    }

    logger.info('Found JobStatusEventBusArn tag', { 
      jobId: jobId,
      eventBusArn: eventBusArn 
    });

    // Step 3: Validate EventBus exists
    const validationResult = await eventBridgeValidator.validateEventBusArn(eventBusArn);
    
    if (!validationResult.isValid) {
      logger.error('EventBus validation failed', undefined, {
        jobId: jobId,
        eventBusArn: eventBusArn,
        validationError: validationResult.error
      });
      
      // Log error but continue processing (don't fail execution for invalid EventBus)
      return;
    }

    logger.info('EventBus validation successful', {
      jobId: jobId,
      eventBusArn: eventBusArn,
      eventBusName: validationResult.eventBusName
    });

    // Step 4: Prepare EventBridge event
    const eventCategory = eventProcessor.classifyEventType(macieEvent.eventType);
    
    const eventDetail: MacieJobStatusEventDetail = {
      // Copy all original log data
      ...macieEvent,
      
      // Add enriched job details
      jobDetails: {
        jobArn: jobDetails.jobArn || '',
        name: jobDetails.name || '',
        description: jobDetails.description,
        s3JobDefinition: jobDetails.s3JobDefinition,
        statistics: jobDetails.statistics,
        tags: jobDetails.tags
      },
      
      // Add processing metadata
      eventCategory: eventCategory,
      processedAt: new Date().toISOString()
    };

    // Step 5: Publish to EventBridge
    logger.info('Publishing event to EventBridge', {
      jobId: jobId,
      eventBusArn: eventBusArn,
      eventType: macieEvent.eventType,
      eventCategory: eventCategory
    });

    const eventBusName = eventBridgeValidator.extractEventBusNameFromArn(eventBusArn);
    
    const putEventsCommand = new PutEventsCommand({
      Entries: [
        {
          Source: 'macie.job.status',
          DetailType: 'Macie Job Status Change',
          Detail: JSON.stringify(eventDetail),
          EventBusName: eventBusName!
        }
      ]
    });

    const publishStartTime = Date.now();
    const publishResponse = await eventBridgeClient.send(putEventsCommand);
    
    logger.logApiResponse('EventBridge', 'PutEvents', publishResponse, Date.now() - publishStartTime);

    // Check for failed entries
    if (publishResponse.FailedEntryCount && publishResponse.FailedEntryCount > 0) {
      logger.error('EventBridge publish had failed entries', undefined, {
        jobId: jobId,
        failedEntryCount: publishResponse.FailedEntryCount,
        entries: publishResponse.Entries
      });
      
      throw new Error(`Failed to publish event to EventBridge for job ${jobId}`);
    }

    logger.info('Successfully published event to EventBridge', {
      jobId: jobId,
      eventBusArn: eventBusArn,
      eventId: publishResponse.Entries?.[0]?.EventId
    });

  } catch (error: any) {
    logger.error('Error processing Macie event', error, {
      jobId: jobId,
      eventType: macieEvent.eventType
    });
    
    // Re-throw to fail Lambda execution
    throw error;
  }
}
