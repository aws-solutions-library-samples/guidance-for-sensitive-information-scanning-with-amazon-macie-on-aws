import * as zlib from 'zlib';
import { 
  CloudWatchLogsEvent, 
  CloudWatchLogsData, 
  MacieJobLogEvent, 
  MacieEventType,
  COMPLETION_EVENT_TYPES,
  ERROR_EVENT_TYPES 
} from '../types/cloudwatch-logs-event';
import { Logger } from '../../shared/utils/logger';

/**
 * Utility class for processing CloudWatch Logs events from Macie
 */
export class MacieEventProcessor {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  /**
   * Decode and decompress CloudWatch Logs data
   */
  decodeCloudWatchLogsData(event: CloudWatchLogsEvent): CloudWatchLogsData {
    try {
      // Decode base64
      const compressed = Buffer.from(event.awslogs.data, 'base64');
      
      // Decompress gzip
      const decompressed = zlib.gunzipSync(compressed);
      
      // Parse JSON
      const logsData: CloudWatchLogsData = JSON.parse(decompressed.toString('utf8'));
      
      this.logger.debug('Successfully decoded CloudWatch Logs data', {
        logGroup: logsData.logGroup,
        logStream: logsData.logStream,
        eventCount: logsData.logEvents.length
      });
      
      return logsData;
    } catch (error) {
      this.logger.error('Failed to decode CloudWatch Logs data', error);
      throw new Error(`Failed to decode CloudWatch Logs data: ${error}`);
    }
  }

  /**
   * Parse Macie job log events from CloudWatch log messages
   */
  parseMacieLogEvents(logsData: CloudWatchLogsData): MacieJobLogEvent[] {
    const macieEvents: MacieJobLogEvent[] = [];

    for (const logEvent of logsData.logEvents) {
      try {
        // Parse the JSON message
        const macieLogEvent: MacieJobLogEvent = JSON.parse(logEvent.message);
        
        // Validate that this is a Macie job event we care about
        if (this.isRelevantMacieEvent(macieLogEvent)) {
          macieEvents.push(macieLogEvent);
          
          this.logger.info('Parsed relevant Macie job event', {
            eventType: macieLogEvent.eventType,
            jobId: macieLogEvent.jobId,
            jobName: macieLogEvent.jobName
          });
        } else {
          this.logger.debug('Skipping irrelevant Macie event', {
            eventType: macieLogEvent.eventType
          });
        }
      } catch (error) {
        this.logger.error('Failed to parse log event message', error, {
          logEventId: logEvent.id,
          message: logEvent.message
        });
        // Continue processing other events instead of failing
        continue;
      }
    }

    this.logger.info('Parsed Macie log events', {
      totalLogEvents: logsData.logEvents.length,
      relevantMacieEvents: macieEvents.length
    });

    return macieEvents;
  }

  /**
   * Determine if a Macie event is relevant for processing
   */
  private isRelevantMacieEvent(event: MacieJobLogEvent): boolean {
    const eventType = event.eventType;
    
    // Check for completion events
    if (COMPLETION_EVENT_TYPES.includes(eventType as any)) {
      return true;
    }
    
    // Check for specific error events
    if (ERROR_EVENT_TYPES.includes(eventType as any)) {
      return true;
    }
    
    // Check for ACCOUNT_ prefixed events
    if (eventType.startsWith('ACCOUNT_')) {
      return true;
    }
    
    // Check for BUCKET_ prefixed events
    if (eventType.startsWith('BUCKET_')) {
      return true;
    }
    
    return false;
  }

  /**
   * Classify event type as completion or error
   */
  classifyEventType(eventType: MacieEventType): 'completion' | 'error' {
    // Check for completion events
    if (COMPLETION_EVENT_TYPES.includes(eventType as any)) {
      return 'completion';
    }
    
    // All other relevant events are considered errors
    return 'error';
  }

  /**
   * Extract job ID from Macie log event
   */
  extractJobId(event: MacieJobLogEvent): string {
    if (!event.jobId) {
      throw new Error('Job ID not found in Macie log event');
    }
    return event.jobId;
  }

  /**
   * Validate that required fields are present in Macie log event
   */
  validateMacieLogEvent(event: MacieJobLogEvent): void {
    const requiredFields = ['eventType', 'jobId', 'adminAccountId', 'occuredAt'];
    
    for (const field of requiredFields) {
      if (!event[field]) {
        throw new Error(`Required field '${field}' missing from Macie log event`);
      }
    }
  }
}
