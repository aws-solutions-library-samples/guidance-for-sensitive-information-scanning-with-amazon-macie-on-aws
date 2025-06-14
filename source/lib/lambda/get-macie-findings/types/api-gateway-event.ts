import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { MacieFinding } from './macie-finding';

/**
 * API Gateway event for GET /get-findings endpoint
 */
export interface GetFindingsAPIEvent extends APIGatewayProxyEvent {
  queryStringParameters: {
    jobId: string;
    maxResults?: string;
    nextToken?: string;
  } | null;
}

/**
 * Request parameters for getting findings
 */
export interface GetFindingsRequest {
  jobId: string;
  maxResults?: number;
  nextToken?: string;
}

/**
 * Paginated response for findings retrieval
 */
export interface GetFindingsResponse {
  success: true;
  data: {
    jobId: string;
    findings: MacieFinding[];
    totalFindings: number;
    maxResults: number;
    nextToken?: string;
    requestId: string;
  };
}

/**
 * Error response for findings retrieval
 */
export interface GetFindingsErrorResponse {
  success: false;
  error: {
    type: string;
    message: string;
    details?: any;
    requestId: string;
  };
}

/**
 * Combined result type for API responses
 */
export type GetFindingsResult = GetFindingsResponse | GetFindingsErrorResponse;

/**
 * API Gateway response structure
 */
export interface GetFindingsAPIResponse extends APIGatewayProxyResult {
  body: string; // JSON stringified GetFindingsResult
}
