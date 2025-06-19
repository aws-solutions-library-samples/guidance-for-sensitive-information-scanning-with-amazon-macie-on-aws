# Get Macie Findings Lambda Function

This Lambda function retrieves all findings for completed Amazon Macie classification jobs and returns them in a structured format.

## Overview

The function is triggered by EventBridge events when Macie jobs complete successfully. It:

- Receives EventBridge events for completed Macie jobs
- Retrieves all findings for the job using automatic pagination
- Returns structured response with findings data and statistics
- Provides comprehensive logging and error handling

## Trigger

**EventBridge Rule** that matches:
```json
{
  "source": ["macie.job.status"],
  "detail-type": ["Macie Job Status Change"],
  "detail": {
    "eventCategory": ["completion"],
    "eventType": ["JOB_COMPLETED", "SCHEDULED_RUN_COMPLETED"]
  }
}
```

## Event Processing Flow

```
EventBridge (job completion event)
  ↓
Validate event (skip non-completion events)
  ↓
Extract job details (jobId, jobArn, jobName)
  ↓
Initialize Macie findings retriever
  ↓
Paginate through all findings (ListFindings + GetFindings)
  ↓
Transform findings to structured format
  ↓
Return response with findings and statistics
```

## Input Event Structure

The function expects EventBridge events with this structure:

```json
{
  "version": "0",
  "id": "event-id",
  "detail-type": "Macie Job Status Change",
  "source": "macie.job.status",
  "account": "AWS_ACCOUNT_ID",
  "time": "2023-12-01T10:00:00Z",
  "region": "us-east-1",
  "detail": {
    "eventType": "JOB_COMPLETED",
    "jobId": "abc123...",
    "jobName": "my-classification-job",
    "eventCategory": "completion",
    "jobDetails": {
      "jobArn": "arn:aws:macie2:AWS_REGION:AWS_ACCOUNT_ID:classification-job/abc123",
      "name": "my-classification-job",
      "tags": {...}
    }
  }
}
```

## Response Structure

### Success Response
```json
{
  "success": true,
  "data": {
    "jobId": "abc123...",
    "jobArn": "arn:aws:macie2:AWS_REGION:AWS_ACCOUNT_ID:classification-job/abc123",
    "jobName": "my-classification-job",
    "totalFindings": 42,
    "findings": [
      {
        "id": "finding-id-1",
        "accountId": "AWS_ACCOUNT_ID",
        "category": "PII",
        "severity": {
          "description": "High",
          "score": 7.5
        },
        "resourcesAffected": {
          "s3Bucket": {
            "arn": "arn:aws:s3:::my-bucket",
            "name": "my-bucket"
          },
          "s3Object": {
            "key": "sensitive-data.csv",
            "size": 1024
          }
        },
        "classificationDetails": {
          "jobId": "abc123...",
          "result": {
            "sensitiveData": [
              {
                "category": "PII",
                "totalCount": 5,
                "detections": [
                  {
                    "type": "SSN",
                    "count": 3
                  },
                  {
                    "type": "EMAIL_ADDRESS",
                    "count": 2
                  }
                ]
              }
            ]
          }
        }
      }
    ],
    "requestId": "lambda-request-id"
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "type": "MacieApiError",
    "message": "Failed to retrieve findings",
    "details": {
      "errorCode": "AccessDenied",
      "statusCode": 403
    },
    "requestId": "lambda-request-id"
  }
}
```

## Findings Structure

Each finding includes:

- **Basic Information**: ID, account, category, severity
- **Resource Details**: S3 bucket and object information
- **Classification Results**: Sensitive data types and counts
- **Timestamps**: Creation and update times
- **Status Information**: Archived status, sample flag

## Error Handling

### Event Validation
- **Invalid Event**: Missing jobId or invalid structure
- **Non-Completion Event**: Skips error events, only processes completions

### Macie API Errors
- **Access Denied**: Insufficient permissions to access findings
- **Job Not Found**: Job ID doesn't exist or is inaccessible
- **Rate Limiting**: API throttling errors with retry logic

### Pagination Handling
- **Safety Limits**: Maximum 100 pages to prevent infinite loops
- **Empty Results**: Graceful handling of jobs with no findings
- **Large Result Sets**: Efficient processing of jobs with many findings

## IAM Permissions

The Lambda function requires:

- `macie2:ListFindings` - List finding IDs for the job
- `macie2:GetFindings` - Retrieve detailed finding information
- CloudWatch Logs permissions (managed by AWS)

## Configuration

**Memory**: 1024 MB (for processing large numbers of findings)
**Timeout**: 15 minutes (for jobs with extensive findings)
**Runtime**: Node.js 18.x with AWS SDK v3

## Dependencies

This function uses shared utilities:

- `../shared/utils/logger.ts` - Structured logging
- `../shared/utils/error-handler.ts` - Standardized error handling
- `./utils/findings-retriever.ts` - Findings pagination utility
- `./types/eventbridge-event.ts` - Type definitions

## Monitoring

### CloudWatch Metrics
- **Invocations** - Number of job completion events processed
- **Duration** - Time to retrieve all findings
- **Errors** - Failed executions (Macie API errors)
- **Memory Usage** - Memory consumption during processing

### CloudWatch Logs
All operations are logged with structured JSON:
- Event validation results
- Findings retrieval progress (pages processed)
- API call timing and responses
- Summary statistics by category and severity
- Error details with context

### Key Log Messages
```json
{
  "level": "INFO",
  "message": "Successfully retrieved findings",
  "data": {
    "jobId": "abc123",
    "totalFindings": 42,
    "retrievalDuration": "2500ms"
  }
}
```

## Performance Considerations

### Pagination Strategy
- **Batch Size**: 50 findings per API call (maximum allowed)
- **Parallel Processing**: Sequential processing to avoid rate limits
- **Memory Management**: Efficient transformation of large result sets

### Optimization Tips
- Jobs with many findings may take several minutes to process
- Consider implementing result caching for frequently accessed jobs
- Monitor memory usage for jobs with thousands of findings

## Example Usage Flow

1. **Macie job completes** → Writes completion log to CloudWatch
2. **Process Macie Job Status function** → Publishes completion event to EventBridge
3. **EventBridge rule triggers** → Invokes Get Macie Findings function
4. **Function retrieves findings** → Returns structured response with all findings
5. **Downstream systems** → Can process findings for reporting, alerting, etc.

## Troubleshooting

### Function Not Triggered
- Check EventBridge rule is enabled and pattern matches events
- Verify job completion events are being published to EventBridge
- Check Lambda function permissions for EventBridge invocation

### Macie API Errors
- Verify IAM permissions for `macie2:ListFindings` and `macie2:GetFindings`
- Check if job ID exists and is accessible
- Review CloudWatch Logs for detailed error messages

### Timeout Issues
- Increase function timeout for jobs with many findings
- Consider implementing result streaming for very large jobs
- Monitor function duration and adjust memory allocation

### Memory Issues
- Increase memory allocation for jobs with thousands of findings
- Implement batch processing if memory usage is excessive
- Consider using streaming responses for large result sets
