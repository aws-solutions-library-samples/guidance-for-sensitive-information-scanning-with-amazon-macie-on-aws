/**
 * Logger utility for detailed parameter logging in Lambda functions
 */

export interface LogContext {
  requestId: string;
  functionName?: string;
  functionVersion?: string;
}

export class Logger {
  private context: LogContext;

  constructor(context: LogContext) {
    this.context = context;
  }

  /**
   * Log info level messages with detailed context
   */
  info(message: string, data?: any): void {
    const logEntry = {
      level: 'INFO',
      timestamp: new Date().toISOString(),
      requestId: this.context.requestId,
      functionName: this.context.functionName,
      functionVersion: this.context.functionVersion,
      message,
      data: data ? this.sanitizeData(data) : undefined
    };
    
    console.log(JSON.stringify(logEntry));
  }

  /**
   * Log error level messages with detailed context
   */
  error(message: string, error?: Error | any, data?: any): void {
    const logEntry = {
      level: 'ERROR',
      timestamp: new Date().toISOString(),
      requestId: this.context.requestId,
      functionName: this.context.functionName,
      functionVersion: this.context.functionVersion,
      message,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
        ...error
      } : undefined,
      data: data ? this.sanitizeData(data) : undefined
    };
    
    console.error(JSON.stringify(logEntry));
  }

  /**
   * Log debug level messages with detailed context
   */
  debug(message: string, data?: any): void {
    const logEntry = {
      level: 'DEBUG',
      timestamp: new Date().toISOString(),
      requestId: this.context.requestId,
      functionName: this.context.functionName,
      functionVersion: this.context.functionVersion,
      message,
      data: data ? this.sanitizeData(data) : undefined
    };
    
    console.log(JSON.stringify(logEntry));
  }

  /**
   * Log API request details
   */
  logApiRequest(service: string, operation: string, parameters: any): void {
    this.info(`${service} API Request: ${operation}`, {
      service,
      operation,
      parameters: this.sanitizeData(parameters)
    });
  }

  /**
   * Log API response details
   */
  logApiResponse(service: string, operation: string, response: any, duration?: number): void {
    this.info(`${service} API Response: ${operation}`, {
      service,
      operation,
      duration: duration ? `${duration}ms` : undefined,
      response: this.sanitizeData(response)
    });
  }

  /**
   * Log execution timing
   */
  logTiming(operation: string, startTime: number): void {
    const duration = Date.now() - startTime;
    this.info(`Operation completed: ${operation}`, {
      operation,
      duration: `${duration}ms`
    });
  }

  /**
   * Sanitize sensitive data for logging
   * Remove or mask sensitive information
   */
  private sanitizeData(data: any): any {
    if (!data) return data;
    
    // Create a deep copy to avoid modifying the original
    const sanitized = JSON.parse(JSON.stringify(data));
    
    // List of sensitive keys to mask
    const sensitiveKeys = [
      'password',
      'secret',
      'token',
      'key',
      'authorization',
      'auth',
      'credential',
      'clientToken'
    ];
    
    return this.maskSensitiveFields(sanitized, sensitiveKeys);
  }

  /**
   * Recursively mask sensitive fields in an object
   */
  private maskSensitiveFields(obj: any, sensitiveKeys: string[]): any {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.maskSensitiveFields(item, sensitiveKeys));
    }

    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const lowerKey = key.toLowerCase();
      const isSensitive = sensitiveKeys.some(sensitiveKey => 
        lowerKey.includes(sensitiveKey.toLowerCase())
      );

      if (isSensitive && typeof value === 'string') {
        result[key] = '***MASKED***';
      } else if (typeof value === 'object') {
        result[key] = this.maskSensitiveFields(value, sensitiveKeys);
      } else {
        result[key] = value;
      }
    }

    return result;
  }
}
