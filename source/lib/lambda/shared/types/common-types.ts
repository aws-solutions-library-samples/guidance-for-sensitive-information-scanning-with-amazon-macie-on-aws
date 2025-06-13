/**
 * Common types and interfaces used across multiple Lambda functions
 */

/**
 * AWS Lambda Context information
 */
export interface LambdaContext {
  requestId: string;
  functionName: string;
  functionVersion: string;
  remainingTimeInMillis: number;
}

/**
 * Common AWS service operation context
 */
export interface AwsOperationContext {
  service: string;
  operation: string;
  region?: string;
  accountId?: string;
}

/**
 * Common pagination parameters
 */
export interface PaginationParams {
  nextToken?: string;
  maxResults?: number;
}

/**
 * Common filter parameters
 */
export interface FilterParams {
  [key: string]: string | number | boolean | string[];
}

/**
 * Common sorting parameters
 */
export interface SortParams {
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

/**
 * Common query parameters combining pagination, filtering, and sorting
 */
export interface QueryParams extends PaginationParams, SortParams {
  filters?: FilterParams;
}

/**
 * Common metadata for API responses
 */
export interface ResponseMetadata {
  requestId: string;
  timestamp: string;
  version?: string;
}

/**
 * Common tags structure
 */
export interface Tags {
  [key: string]: string;
}

/**
 * Common resource identifier
 */
export interface ResourceIdentifier {
  id: string;
  arn?: string;
  name?: string;
}

/**
 * Common time range filter
 */
export interface TimeRange {
  startTime?: string;
  endTime?: string;
}

/**
 * Common status enumeration
 */
export type CommonStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

/**
 * Common job types
 */
export type JobType = 'ONE_TIME' | 'SCHEDULED' | 'RECURRING';

/**
 * Common AWS region type
 */
export type AwsRegion = string;

/**
 * Common AWS account ID type
 */
export type AwsAccountId = string;
