import { EventBridgeClient, DescribeEventBusCommand } from '@aws-sdk/client-eventbridge';
import { Logger } from './logger';

/**
 * EventBridge validation utilities
 */

export interface EventBusValidationResult {
  isValid: boolean;
  eventBusName?: string;
  error?: string;
}

export class EventBridgeValidator {
  private client: EventBridgeClient;
  private logger: Logger;

  constructor(logger: Logger, region?: string) {
    this.logger = logger;
    this.client = new EventBridgeClient({
      region: region || process.env.AWS_REGION || 'us-east-1'
    });
  }

  /**
   * Validate EventBridge ARN format
   */
  validateEventBusArnFormat(arn: string): boolean {
    const eventBusArnPattern = /^arn:aws:events:[a-z0-9-]+:\d{12}:event-bus\/[a-zA-Z0-9._-]+$/;
    return eventBusArnPattern.test(arn);
  }

  /**
   * Extract event bus name from ARN
   */
  extractEventBusNameFromArn(arn: string): string | null {
    const match = arn.match(/^arn:aws:events:[a-z0-9-]+:\d{12}:event-bus\/(.+)$/);
    return match ? match[1] : null;
  }

  /**
   * Check if EventBus exists by calling AWS API
   */
  async validateEventBusExists(eventBusName: string): Promise<EventBusValidationResult> {
    try {
      this.logger.info('Validating EventBus existence', { eventBusName });
      
      const command = new DescribeEventBusCommand({
        Name: eventBusName
      });

      const response = await this.client.send(command);
      
      if (response.Name) {
        this.logger.info('EventBus validation successful', { 
          eventBusName: response.Name,
          eventBusArn: response.Arn 
        });
        
        return {
          isValid: true,
          eventBusName: response.Name
        };
      } else {
        return {
          isValid: false,
          error: 'EventBus response missing name'
        };
      }
    } catch (error: any) {
      this.logger.error('EventBus validation failed', error, { eventBusName });
      
      return {
        isValid: false,
        error: error.message || 'Failed to validate EventBus'
      };
    }
  }

  /**
   * Find EventBus ARN tag (case-insensitive)
   */
  findEventBusArnTag(tags: Record<string, string> | undefined): string | null {
    if (!tags) {
      return null;
    }

    // Search for the tag key case-insensitively
    const targetKey = 'jobstatuseventbusarn';
    
    for (const [key, value] of Object.entries(tags)) {
      if (key.toLowerCase() === targetKey) {
        return value;
      }
    }
    
    return null;
  }

  /**
   * Complete validation: format + existence check
   */
  async validateEventBusArn(arn: string): Promise<EventBusValidationResult> {
    // Step 1: Validate ARN format
    if (!this.validateEventBusArnFormat(arn)) {
      return {
        isValid: false,
        error: 'Invalid EventBridge ARN format. Expected: arn:aws:events:region:account:event-bus/name'
      };
    }

    // Step 2: Extract event bus name
    const eventBusName = this.extractEventBusNameFromArn(arn);
    if (!eventBusName) {
      return {
        isValid: false,
        error: 'Could not extract EventBus name from ARN'
      };
    }

    // Step 3: Check if EventBus exists
    return await this.validateEventBusExists(eventBusName);
  }
}
