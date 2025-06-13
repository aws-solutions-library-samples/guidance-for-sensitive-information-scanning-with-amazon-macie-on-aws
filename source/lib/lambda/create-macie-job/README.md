# Create Macie Job Lambda Function

This Lambda function creates Amazon Macie Classification Jobs using the AWS SDK v3.

## Overview

The function accepts the same parameters as the AWS Macie `CreateClassificationJob` API and provides:

- Type-safe input validation using `ts-auto-guard`
- **Required EventBridge validation** for job status notifications
- Detailed logging with parameter sanitization
- Comprehensive error handling using shared utilities
- Structured success/error responses

## Required Parameters

### JobStatusEventBusArn Tag

**IMPORTANT**: This function requires a `JobStatusEventBusArn` tag (case-insensitive) in the `tags` parameter. The function will:

1. Validate the tag exists
2. Validate the ARN format matches EventBridge event bus pattern
3. Verify the EventBus exists in AWS
4. Log the validated EventBus for monitoring

## Input Format

The Lambda function accepts parameters matching the `CreateClassificationJobCommandInput` interface:

```typescript
{
  "jobType": "ONE_TIME" | "SCHEDULED",
  "name": "string",
  "s3JobDefinition": {
    "bucketDefinitions": [
      {
        "accountId": "string",
        "buckets": ["bucket-name-1", "bucket-name-2"]
      }
    ],
    // Optional: bucketCriteria, scoping
  },
  // REQUIRED: Must include JobStatusEventBusArn tag
  "tags": {
    "JobStatusEventBusArn": "arn:aws:events:region:account:event-bus/name",
    // Other optional tags...
  },
  // Optional parameters:
  "description": "string",
  "samplingPercentage": number,
  "scheduleFrequency": { /* schedule configuration */ },
  "customDataIdentifierIds": ["string"],
  "managedDataIdentifierIds": ["string"],
  "managedDataIdentifierSelector": "ALL" | "EXCLUDE" | "INCLUDE" | "NONE"
}
```

## Response Format

### Success Response
```typescript
{
  "success": true,
  "data": {
    "jobId": "string",
    "jobArn": "string", 
    "requestId": "string"
  }
}
```

### Error Response
```typescript
{
  "success": false,
  "error": {
    "type": "string",
    "message": "string",
    "details": any,
    "requestId": "string"
  }
}
```

## Example Usage

### Minimal Example (with required EventBus tag)
```json
{
  "jobType": "ONE_TIME",
  "name": "my-classification-job",
  "s3JobDefinition": {
    "bucketDefinitions": [
      {
        "accountId": "123456789012",
        "buckets": ["my-bucket"]
      }
    ]
  },
  "tags": {
    "JobStatusEventBusArn": "arn:aws:events:us-east-1:123456789012:event-bus/macie-job-status"
  }
}
```

### Complete Example
```json
{
  "jobType": "ONE_TIME",
  "name": "comprehensive-pii-scan",
  "description": "Scan for PII in customer data buckets",
  "s3JobDefinition": {
    "bucketDefinitions": [
      {
        "accountId": "123456789012",
        "buckets": ["customer-data-bucket", "user-uploads-bucket"]
      }
    ],
    "scoping": {
      "includes": {
        "and": [
          {
            "simpleScopeTerm": {
              "comparator": "EQ",
              "key": "OBJECT_EXTENSION",
              "values": ["txt", "csv", "json"]
            }
          }
        ]
      }
    }
  },
  "samplingPercentage": 100,
  "managedDataIdentifierSelector": "ALL",
  "tags": {
    "JobStatusEventBusArn": "arn:aws:events:us-east-1:123456789012:event-bus/macie-job-status",
    "Environment": "Production",
    "Team": "Security"
  }
}
```

## Error Types

The function can return the following error types:

- **ValidationError**: Input doesn't match expected schema
- **EventBridgeValidationError**: Missing or invalid JobStatusEventBusArn tag
- **MacieApiError**: AWS Macie API returned an error
- **InvalidApiResponse**: Macie API response missing required fields
- **UnexpectedError**: Unexpected runtime error

### EventBridge Validation Errors

Common EventBridge validation errors:

```json
{
  "success": false,
  "error": {
    "type": "EventBridgeValidationError",
    "message": "Required tag 'JobStatusEventBusArn' is missing",
    "details": {
      "requiredTagKey": "JobStatusEventBusArn",
      "expectedArnFormat": "arn:aws:events:region:account:event-bus/name",
      "providedTags": ["Environment", "Team"]
    },
    "requestId": "..."
  }
}
```

## Dependencies

This function uses shared utilities:

- `../shared/utils/logger.ts` - Structured logging
- `../shared/utils/error-handler.ts` - Standardized error handling
- `../shared/utils/eventbridge-validator.ts` - EventBridge ARN validation
- `../shared/types/lambda-responses.ts` - Common response types

## IAM Permissions

The Lambda function requires the following permissions:

- `macie2:CreateClassificationJob` - Create Macie classification jobs
- `s3:GetBucketLocation`, `s3:ListBucket`, `s3:GetObject` - S3 access for Macie
- `iam:PassRole` - Pass roles to Macie service
- **`events:DescribeEventBus`** - Validate EventBus existence

## Development

### Generate Type Guards

After modifying `types/macie-job-request.ts`:

```bash
npm run generate-guards
```

### Testing

The function can be tested locally or deployed and invoked via AWS CLI:

```bash
aws lambda invoke \
  --function-name CreateMacieJobFunction \
  --payload file://test-payload.json \
  response.json
```

**Note**: Ensure your test payload includes the required `JobStatusEventBusArn` tag.

## Monitoring

All operations are logged to CloudWatch with structured JSON including:

- Input validation results
- **EventBridge validation details**
- API request/response details (sanitized)
- Execution timing
- Error details with stack traces

Log entries include `requestId`, `functionName`, and `functionVersion` for correlation.

## Validation Flow

The function performs validation in this order:

1. **Basic Input Validation** - ts-auto-guard schema validation
2. **EventBridge Tag Validation** - Check for required tag (case-insensitive)
3. **EventBridge ARN Format Validation** - Validate ARN format
4. **EventBus Existence Check** - Verify EventBus exists in AWS
5. **Macie Job Creation** - Create the classification job
6. **Response Validation** - Ensure valid response from Macie API
