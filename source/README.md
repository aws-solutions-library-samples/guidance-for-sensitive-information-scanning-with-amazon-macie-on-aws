# Guidance for Sensitive Information Scanning with Amazon Macie on AWS

This sample code demonstrates how customer applications can scan artifacts for Personally Identifiable Information (PII), financial information or credentials, and other sensitive information with Amazon Macie.

## Setup

### Pre-requisites
1. Enable Amazon Macie on your account. See [Getting Started with Macie](https://docs.aws.amazon.com/macie/latest/user/getting-started.html) and follow all steps until Step 5. This ensures Macie is configured correctly and the Macie CloudWatch log group is created prior to deploying our stack
2. A recent/LTS version of [node.js](https://nodejs.org/en) installed on your laptop/PC from which you will be deploying this solution
3. An AWS account, and credentials for that account with sufficient permissions to deploy the sample code. See [Onboarding to AWS](https://aws.amazon.com/getting-started/onboarding-to-aws) if you are new to AWS and need to create an account
4. An [Amazon EventBridge](https://aws.amazon.com/eventbridge/) EventBus ARN where the Macie job completion event will be sent and a rule/subscription to listen for that event. You can use the default EventBus for this or create a new one. See [lib/lambda/process-macie-job-status/README.md](lib/lambda/process-macie-job-status/README.md) for event details. Create an Event rule to receive this event and use your application as the Target. You can also use CloudWatch logs as a target for this rule for testing. The Event pattern you can use for this rule is: 
```json
{
  "source": ["macie.job.status"]
}
```
5. An Amazon S3 bucket containing the objects that you want to scan
6. Your application that invokes the API to kick-off the Amazon Macie Classification job. See [API_USAGE.md](API_USAGE.md) for sample applications including command line tools that you can use for this

### Deploy the infrastructure
```bash
npx cdk bootstrap
npx cdk deploy
```

## Components

### Lambda Functions

For detailed documentation on the included Lambda functions, see [lib/lambda/README.md](lib/lambda/README.md).

### API Gateway Endpoints

This project includes API Gateway endpoints for creating Macie classification jobs and retrieving findings:

- **POST /create-job**: Create new Macie classification jobs
- **GET /get-findings**: Retrieve findings from completed jobs with pagination support

Both endpoints are secured with AWS WAF and require IAM authentication. For detailed API documentation including request/response formats, authentication, and usage examples, see [API_USAGE.md](API_USAGE.md).

## Usage

1. Call /create-job API to create a new job
2. Get notified via EventBridge on job completion
3. Call /get-findings API to get findings from the job

## Cleanup
Run `npx cdk destroy` to remove the stack that you deployed. Note that any Amazon S3 objects created by Amazon Macie will have to be manually cleaned up.
