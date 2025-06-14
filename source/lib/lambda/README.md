# Lambda Functions

This directory contains AWS Lambda functions for Amazon Macie operations and shared utilities.

## Project Structure

```
lib/lambda/
├── README.md                        # This file
├── shared/                          # Shared utilities and types
│   ├── utils/
│   │   ├── logger.ts               # Common logging utility
│   │   ├── error-handler.ts        # Common error handling
│   │   └── eventbridge-validator.ts # EventBridge validation utility
│   └── types/
│       ├── lambda-responses.ts     # Standard response types
│       └── common-types.ts         # Common interfaces
├── create-macie-job/               # Create Macie Classification Jobs
│   ├── index.ts                    # Main handler
│   ├── types/
│   │   ├── macie-job-request.ts    # Function-specific types
│   │   └── macie-job-request.guard.ts # Auto-generated type guards
│   └── README.md                   # Function-specific documentation
├── process-macie-job-status/       # Process Macie job status events
│   ├── index.ts                    # Main handler
│   ├── types/
│   │   └── cloudwatch-logs-event.ts # CloudWatch Logs event types
│   ├── utils/
│   │   └── event-processor.ts      # CloudWatch Logs processing
│   └── README.md                   # Function-specific documentation
└── [future-lambda-functions]/      # Additional Lambda functions
    ├── index.ts
    ├── types/
    └── README.md
```

## Shared Components

### Utilities

- **`shared/utils/logger.ts`** - Structured JSON logging with parameter sanitization
- **`shared/utils/error-handler.ts`** - Standardized error handling and response formatting
- **`shared/utils/eventbridge-validator.ts`** - EventBridge ARN validation and EventBus verification

### Types

- **`shared/types/lambda-responses.ts`** - Standard success/error response interfaces
- **`shared/types/common-types.ts`** - Common types used across multiple functions

## Lambda Functions

### Create Macie Job Function

Creates Amazon Macie Classification Jobs with type-safe validation and comprehensive logging.

**Location**: `create-macie-job/`
**Documentation**: [create-macie-job/README.md](create-macie-job/README.md)
**Trigger**: Direct invocation (API Gateway, CLI, etc.)

**Key Features**:
- Type-safe input validation using `ts-auto-guard`
- Uses AWS SDK v3 `CreateClassificationJobCommandInput`
- **Required EventBridge validation** for job status notifications
- Detailed logging with parameter sanitization
- Comprehensive error handling using shared utilities

### Process Macie Job Status Function

Processes Macie job status events from CloudWatch Logs and publishes enriched events to EventBridge.

**Location**: `process-macie-job-status/`
**Documentation**: [process-macie-job-status/README.md](process-macie-job-status/README.md)
**Trigger**: CloudWatch Logs subscription filter on `/aws/macie/classificationjobs/`

**Key Features**:
- CloudWatch Logs event decoding and parsing
- Macie API integration for job details enrichment
- EventBridge event publishing to job-specific event buses
- Comprehensive error handling with execution failure on API errors
- Support for completion and error event types

## Development Guidelines

### Adding New Lambda Functions

1. Create a new folder under `lib/lambda/` with the function name
2. Create `index.ts` as the main handler
3. Create `types/` folder for function-specific types
4. Create `utils/` folder for function-specific utilities (if needed)
5. Create `README.md` for function documentation
6. Use shared utilities from `shared/` folder
7. Generate type guards if using custom types

### Shared Utilities Usage

Import shared utilities in your Lambda functions:

```typescript
import { Logger } from '../shared/utils/logger';
import { ErrorHandler } from '../shared/utils/error-handler';
import { EventBridgeValidator } from '../shared/utils/eventbridge-validator';
import { StandardLambdaResponse } from '../shared/types/lambda-responses';
```

### Type Guards Generation

For functions using custom types with validation:

```bash
# Update package.json script for your function
npm run generate-guards
```

## Common Patterns

### Logger Initialization
```typescript
const logger = new Logger({
  requestId: context.awsRequestId,
  functionName: context.functionName,
  functionVersion: context.functionVersion
});
```

### Error Handling
```typescript
const errorHandler = new ErrorHandler(logger, context);

// Handle different error types
return errorHandler.handleValidationError(message, data);
return errorHandler.handleAwsApiError(error, 'ServiceName', 'Operation');
return errorHandler.handleEventBridgeValidationError(message, arn, error);
return errorHandler.handleUnexpectedError(error);
```

### EventBridge Validation
```typescript
const eventBridgeValidator = new EventBridgeValidator(logger);

// Find EventBus ARN in tags (case-insensitive)
const eventBusArn = eventBridgeValidator.findEventBusArnTag(tags);

// Validate ARN format and EventBus existence
const validationResult = await eventBridgeValidator.validateEventBusArn(eventBusArn);
```

### Response Structure
```typescript
// Success response
const response: StandardLambdaResponse<YourDataType> = {
  success: true,
  data: yourData
};

// Error response (handled by ErrorHandler)
const response: StandardLambdaResponse = {
  success: false,
  error: {
    type: 'ErrorType',
    message: 'Error message',
    details: errorDetails,
    requestId: context.awsRequestId
  }
};
```

## Architecture Overview

```
Create Macie Job Lambda
  ↓ (creates job with EventBus ARN tag)
Amazon Macie Service
  ↓ (writes status logs)
CloudWatch Logs (/aws/macie/classificationjobs/)
  ↓ (subscription filter)
Process Macie Job Status Lambda
  ↓ (publishes enriched events)
EventBridge (job-specific event bus)
```

## Security Considerations

- All shared utilities include parameter sanitization
- Sensitive data is automatically masked in logs
- Error responses include minimal information to prevent data leakage
- Each function uses minimal IAM permissions
- EventBridge validation ensures only valid event buses are used

## Monitoring

All Lambda functions use structured JSON logging that includes:

- Request ID for correlation
- Function name and version
- Execution timing
- API request/response details (sanitized)
- Error details with stack traces
- EventBridge validation results

### Key Metrics to Monitor

- **Lambda Invocations** - Function execution frequency
- **Lambda Errors** - Failed executions (especially for Macie API errors)
- **Lambda Duration** - Execution time trends
- **EventBridge Events** - Published event counts
- **CloudWatch Logs Subscription Filter** - Processing lag

Logs are automatically sent to CloudWatch Logs for monitoring and analysis.
