/**
 * Standard Lambda response types used across all Lambda functions
 */

export interface StandardSuccessResponse<T = any> {
  success: true;
  data: T;
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

export type StandardLambdaResponse<T = any> = StandardSuccessResponse<T> | StandardErrorResponse;

/**
 * Common data structures for Lambda responses
 */
export interface JobCreationResponse {
  jobId: string;
  jobArn: string;
  requestId: string;
}

export interface JobStatusResponse {
  jobId: string;
  status: string;
  createdAt?: string;
  completedAt?: string;
  requestId: string;
}

export interface ValidationErrorDetails {
  field?: string;
  value?: any;
  constraint?: string;
  message: string;
}
