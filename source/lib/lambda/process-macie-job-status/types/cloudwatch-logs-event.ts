/**
 * CloudWatch Logs event types for Lambda function triggered by subscription filter
 */

export interface CloudWatchLogsEvent {
  awslogs: {
    data: string; // Base64 encoded and gzipped log data
  };
}

export interface CloudWatchLogsData {
  messageType: string;
  owner: string;
  logGroup: string;
  logStream: string;
  subscriptionFilters: string[];
  logEvents: CloudWatchLogEvent[];
}

export interface CloudWatchLogEvent {
  id: string;
  timestamp: number;
  message: string; // JSON string containing Macie log data
}

/**
 * Macie job log event structure from CloudWatch
 */
export interface MacieJobLogEvent {
  eventType: string;
  jobId: string;
  adminAccountId: string;
  occuredAt: string;
  description: string;
  jobName: string;
  affectedAccount: string | undefined;
  affectedResource: any | undefined;
  operation: string | undefined;
  runDate: string;
  [key: string]: any; // Allow for additional fields from Macie logs
}

/**
 * EventBridge event structure for Macie job status
 */
export interface MacieJobStatusEvent {
  source: string;
  'detail-type': string;
  detail: MacieJobStatusEventDetail;
}

export interface MacieJobStatusEventDetail extends MacieJobLogEvent {
  // Original log data is spread here
  
  // Additional enriched data
  jobDetails?: {
    jobArn: string;
    name: string;
    description?: string;
    s3JobDefinition: any;
    statistics?: any;
    tags?: Record<string, string>;
  };
  
  // Processing metadata
  eventCategory: 'completion' | 'error';
  processedAt: string;
}

/**
 * Event type classification
 */
export const COMPLETION_EVENT_TYPES = [
  'SCHEDULED_RUN_COMPLETED',
  'JOB_COMPLETED'
] as const;

export const ERROR_EVENT_TYPES = [
  'NO_BUCKETS_MATCHED_THE_CRITERIA',
  'JOB_CANCELLED'
] as const;

export type CompletionEventType = typeof COMPLETION_EVENT_TYPES[number];
export type ErrorEventType = typeof ERROR_EVENT_TYPES[number];
export type MacieEventType = CompletionEventType | ErrorEventType | string;
