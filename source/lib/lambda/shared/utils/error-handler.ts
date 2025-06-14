import { Context } from 'aws-lambda';
import { Logger } from './logger';

/**
 * Common error handling utilities for Lambda functions
 */

export interface ErrorDetails {
  name?: string;
  message: string;
  stack?: string;
  statusCode?: number;
  requestId?: string;
  [key: string]: any;
}

export interface StandardErrorResponse {
  success: false;
  error: {
    type: string;
    message: string;
    details?: any;
    requestId: string;
  };
}

export class ErrorHandler {
  private logger: Logger;
  private context: Context;

  constructor(logger: Logger, context: Context) {
    this.logger = logger;
    this.context = context;
  }

  /**
   * Handle validation errors
   */
  handleValidationError(message: string, receivedData?: any): StandardErrorResponse {
    this.logger.error('Validation Error', undefined, { receivedData });
    
    return {
      success: false,
      error: {
        type: 'ValidationError',
        message,
        details: 'The provided input does not conform to the expected schema',
        requestId: this.context.awsRequestId
      }
    };
  }

  /**
   * Handle AWS API errors
   */
  handleAwsApiError(error: any, service: string, operation: string): StandardErrorResponse {
    this.logger.error(`${service} API Error`, error, {
      service,
      operation,
      errorCode: error.name,
      statusCode: error.$metadata?.httpStatusCode,
      awsRequestId: error.$metadata?.requestId
    });

    return {
      success: false,
      error: {
        type: error.name || `${service}ApiError`,
        message: error.message || `Failed to execute ${service} ${operation}`,
        details: {
          errorCode: error.name,
          statusCode: error.$metadata?.httpStatusCode,
          awsRequestId: error.$metadata?.requestId
        },
        requestId: this.context.awsRequestId
      }
    };
  }

  /**
   * Handle unexpected errors
   */
  handleUnexpectedError(error: any): StandardErrorResponse {
    this.logger.error('Unexpected Error', error);
    
    return {
      success: false,
      error: {
        type: 'UnexpectedError',
        message: error.message || 'An unexpected error occurred',
        details: {
          name: error.name,
          stack: error.stack
        },
        requestId: this.context.awsRequestId
      }
    };
  }

  /**
   * Handle custom application errors
   */
  handleCustomError(type: string, message: string, details?: any): StandardErrorResponse {
    this.logger.error(`Custom Error: ${type}`, undefined, { details });
    
    return {
      success: false,
      error: {
        type,
        message,
        details,
        requestId: this.context.awsRequestId
      }
    };
  }

  /**
   * Handle EventBridge validation errors
   */
  handleEventBridgeValidationError(message: string, eventBusArn?: string, validationError?: string): StandardErrorResponse {
    this.logger.error('EventBridge Validation Error', undefined, { 
      eventBusArn,
      validationError 
    });
    
    return {
      success: false,
      error: {
        type: 'EventBridgeValidationError',
        message,
        details: {
          eventBusArn,
          validationError,
          requiredTagKey: 'JobStatusEventBusArn',
          expectedArnFormat: 'arn:aws:events:region:account:event-bus/name'
        },
        requestId: this.context.awsRequestId
      }
    };
  }

  /**
   * Determine error type and handle appropriately
   */
  handleError(error: any, context?: { service?: string; operation?: string }): StandardErrorResponse {
    // AWS SDK errors
    if (error.$metadata) {
      return this.handleAwsApiError(error, context?.service || 'AWS', context?.operation || 'Unknown');
    }

    // Custom application errors
    if (error.type && error.message) {
      return this.handleCustomError(error.type, error.message, error.details);
    }

    // Default to unexpected error
    return this.handleUnexpectedError(error);
  }
}
