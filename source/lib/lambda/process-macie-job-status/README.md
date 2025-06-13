# Process Macie Job Status Lambda Function

This Lambda function processes Amazon Macie job status events from CloudWatch Logs and publishes enriched events to EventBridge.

## Overview

The function is triggered by a CloudWatch Logs subscription filter that monitors the `/aws/macie/classificationjobs/` log group for job completion and error events. It:

- Decodes and parses CloudWatch Logs subscription filter events
- Retrieves full job details from Macie API
- Extracts EventBus ARN from job tags
- Publishes enriched events to the specified EventBridge event bus

## Trigger

**CloudWatch Logs Subscription Filter** monitoring `/aws/macie/classificationjobs/` with filter pattern:
```
?"SCHEDULED_RUN_COMPLETED" ?"JOB_COMPLETED" ?"NO_BUCKETS_MATCHED_THE_CRITERIA" ?"JOB_CANCELLED" ?"ACCOUNT_" ?"BUCKET_"
```

## Event Types Processed

### Completion Events
- `SCHEDULED_RUN_COMPLETED` - Scheduled job run completed
- `JOB_COMPLETED` - One-time job completed

### Error Events
- `NO_BUCKETS_MATCHED_THE_CRITERIA` - No S3 buckets matched job criteria
- `JOB_CANCELLED` - Job was cancelled
- `ACCOUNT_*` - Account-related errors (e.g., `ACCOUNT_ACCESS_DENIED`)
- `BUCKET_*` - Bucket-related errors (e.g., `BUCKET_ACCESS_DENIED`)

## Processing Flow

```
CloudWatch Logs Event
  ↓
Decode & Decompress (gzip + base64)
  ↓
Parse Macie Log Events (JSON)
  ↓
For Each Relevant Event:
  ├─ Get Macie Job Details (API call - FAIL ON ERROR)
  ├─ Extract EventBus ARN from tags (LOG ERROR, SKIP IF MISSING)
  ├─ Validate EventBus exists (LOG ERROR, SKIP IF INVALID)
  └─ Publish to EventBridge
```

## EventBridge Event Structure

Published events have the following structure:

```json
{
  "source": "macie.job.status",
  "detail-type": "Macie Job Status Change",
  "detail": {
    // Original CloudWatch log data
    "eventType": "JOB_COMPLETED",
    "jobId": "abc123...",
    "adminAccountId": "123456789012",
    "occuredAt": "2023-12-01T10:00:00Z",
    "description": "Job completed successfully",
    "jobName": "my-classification-job",
    "affectedAccount": "123456789012",
    "affectedResource": {...},
    "operation": "...",
    "runDate": "2023-12-01",
    
    // Enriched job details from Macie API
    "jobDetails": {
      "jobArn": "arn:aws:macie2:us-east-1:123456789012:classification-job/abc123",
      "name": "my-classification-job",
      "description": "Scan for PII data",
      "s3JobDefinition": {...},
      "statistics": {...},
      "tags": {
        "JobStatusEventBusArn": "arn:aws:events:us-east-1:123456789012:event-bus/my-bus"
      }
    },
    
    // Processing metadata
    "eventCategory": "completion|error",
    "processedAt": "2023-12-01T10:00:01Z"
  }
}
```

## Error Handling

### Macie API Errors - FAIL EXECUTION
- **Behavior**: Throw error to fail Lambda execution
- **Reason**: Ensures data consistency and triggers CloudWatch alarms
- **Retry**: CloudWatch will retry the entire batch
- **Monitoring**: Failed executions can be monitored via CloudWatch metrics

### Missing JobStatusEventBusArn Tag - LOG AND SKIP
- **Behavior**: Log error and skip publishing for this job
- **Reason**: Job was not configured for status notifications
- **Continue**: Process other events in the batch

### EventBus Validation Failure - LOG AND SKIP
- **Behavior**: Log error and skip publishing for this job
- **Reason**: EventBus may have been deleted or access denied
- **Continue**: Process other events in the batch

### Log Parsing Errors - LOG AND CONTINUE
- **Behavior**: Log error and skip malformed log entries
- **Reason**: Prevents single bad log entry from failing entire batch
- **Continue**: Process other valid log entries

## IAM Permissions

The Lambda function requires:

- `macie2:DescribeClassificationJob` - Get full job details
- `events:PutEvents` - Publish events to EventBridge
- `events:DescribeEventBus` - Validate EventBus existence
- CloudWatch Logs permissions (managed by AWS)

## Dependencies

This function uses shared utilities:

- `../shared/utils/logger.ts` - Structured logging
- `../shared/utils/eventbridge-validator.ts` - EventBus validation
- `./utils/event-processor.ts` - CloudWatch Logs processing
- `./types/cloudwatch-logs-event.ts` - Type definitions

## Monitoring

### CloudWatch Metrics
- **Invocations** - Number of times function is triggered
- **Duration** - Execution time per invocation
- **Errors** - Failed executions (Macie API errors)
- **Throttles** - Function throttling events

### CloudWatch Logs
All operations are logged with structured JSON:
- CloudWatch Logs decoding results
- Macie event parsing results
- API call timing and responses
- EventBridge publishing results
- Error details with context

### Recommended Alarms
- **Lambda Errors** - Alert on failed executions
- **Lambda Duration** - Alert on long execution times
- **EventBridge Failed Entries** - Alert on publishing failures

## Example Log Output

```json
{
  "level": "INFO",
  "timestamp": "2023-12-01T10:00:00.000Z",
  "requestId": "abc-123",
  "functionName": "ProcessMacieJobStatusFunction",
  "message": "Successfully published event to EventBridge",
  "data": {
    "jobId": "abc123",
    "eventBusArn": "arn:aws:events:us-east-1:123456789012:event-bus/my-bus",
    "eventId": "def456"
  }
}
```

## Testing

The function can be tested by:

1. **Creating a Macie job** with required `JobStatusEventBusArn` tag
2. **Waiting for job completion** or cancellation
3. **Monitoring CloudWatch Logs** for function execution
4. **Checking EventBridge** for published events

## Troubleshooting

### Function Not Triggered
- Check CloudWatch Logs subscription filter is active
- Verify Macie is writing logs to `/aws/macie/classificationjobs/`
- Check filter pattern matches actual log events

### Macie API Errors
- Verify IAM permissions for `macie2:DescribeClassificationJob`
- Check if job ID exists and is accessible
- Review CloudWatch Logs for detailed error messages

### EventBridge Publishing Failures
- Verify EventBus exists and is accessible
- Check IAM permissions for `events:PutEvents`
- Validate EventBus ARN format in job tags
