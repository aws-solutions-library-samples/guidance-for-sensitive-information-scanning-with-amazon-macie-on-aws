import { CreateClassificationJobCommandInput } from '@aws-sdk/client-macie2';
import { StandardLambdaResponse, JobCreationResponse } from '../../shared/types/lambda-responses';

/**
 * Lambda event input type for creating Macie Classification Jobs
 * Uses the same interface as the AWS SDK CreateClassificationJobCommandInput
 */
export interface MacieJobRequest extends CreateClassificationJobCommandInput {}

/**
 * Lambda response types for Macie job creation
 */
export interface MacieJobSuccessResponse {
  success: true;
  data: JobCreationResponse;
}

export interface MacieJobErrorResponse {
  success: false;
  error: {
    type: string;
    message: string;
    details?: any;
    requestId: string;
  };
}

export type MacieJobResponse = MacieJobSuccessResponse | MacieJobErrorResponse;
