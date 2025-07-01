# Macie API Usage Guide

This document explains how to use the API Gateway endpoints for Amazon Macie Classification Jobs and Findings retrieval.

## API Endpoints

### 1. Create Classification Job
**URL**: `POST /create-job`
**Authentication**: AWS IAM (SigV4)
**Content-Type**: `application/json`

### 2. Get Findings
**URL**: `GET /get-findings`
**Authentication**: AWS IAM (SigV4)

## Security Features

### AWS WAF Protection
The API is protected by AWS WAF v2 with the following rules:
- **Common Rule Set**: Protection against common web exploits
- **Known Bad Inputs**: Blocks requests with known malicious patterns
- **SQL Injection Protection**: Prevents SQL injection attacks
- **Rate Limiting**: Maximum 2000 requests per IP per 5-minute window

### IAM Authentication
- All requests must be signed with AWS Signature Version 4 (SigV4)
- Callers must have the `execute-api:Invoke` permission for the API resource
- No API keys required - uses existing AWS identity

## 1. Create Classification Job API

### Request Format

The API accepts the same request format as the underlying Lambda function:

```json
{
  "name": "My Macie Classification Job",
  "jobType": "ONE_TIME",
  "s3JobDefinition": {
    "bucketDefinitions": [
      {
        "accountId": "AWS_ACCOUNT_ID",
        "buckets": ["REPLACE-BUCKET-NAME"]
      }
    ]
  },
  "tags": {
    "JobStatusEventBusArn": "arn:aws:events:AWS_REGION:AWS_ACCOUNT_ID:event-bus/REPLACE-WITH-MY-EVENT-BUS-NAME"
  }
}
```

### Required Fields

- **name**: Job name (1-500 characters)
- **jobType**: Either "ONE_TIME" or "SCHEDULED"
- **s3JobDefinition**: S3 bucket configuration
  - **bucketDefinitions**: Array of bucket definitions
    - **accountId**: 12-digit AWS account ID
    - **buckets**: Array of S3 bucket names
- **tags**: Job tags
  - **JobStatusEventBusArn**: EventBridge event bus ARN for status notifications

### Response Format

#### Success Response (200)
```json
{
  "success": true,
  "data": {
    "jobId": "job-12345678-1234-1234-1234-123456789012",
    "jobArn": "arn:aws:macie2:AWS_REGION:AWS_ACCOUNT_ID:classification-job/job-12345678-1234-1234-1234-123456789012",
    "requestId": "12345678-1234-1234-1234-123456789012"
  }
}
```

#### Error Responses

##### Validation Error (400)
```json
{
  "success": false,
  "error": {
    "type": "ValidationError",
    "message": "Invalid input: Event does not match MacieJobRequest schema",
    "details": { /* validation details */ },
    "requestId": "12345678-1234-1234-1234-123456789012"
  }
}
```

##### Rate Limited (429)
```json
{
  "message": "Too Many Requests"
}
```

##### Server Error (500)
```json
{
  "success": false,
  "error": {
    "type": "InternalServerError",
    "message": "An unexpected error occurred",
    "requestId": "12345678-1234-1234-1234-123456789012"
  }
}
```

## 2. Get Findings API

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `jobId` | string | Yes | The Macie classification job ID to retrieve findings for |
| `maxResults` | number | No | Maximum number of findings to return (1-50, default: 50) |
| `nextToken` | string | No | Token for pagination to get the next set of results |

### Request Examples

```bash
# Get first page of findings (up to 50 results)
GET /v1/get-findings?jobId=abc123def456

# Get specific number of results
GET /v1/get-findings?jobId=abc123def456&maxResults=25

# Get next page using pagination token
GET /v1/get-findings?jobId=abc123def456&maxResults=25&nextToken=eyJhbGciOiJIUzI1NiJ9...
```

### Response Format

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "jobId": "abc123def456",
    "findings": [
      {
        "id": "finding-id-1",
        "accountId": "AWS_ACCOUNT_ID",
        "archived": false,
        "category": "CLASSIFICATION",
        "classificationDetails": {
          "jobArn": "arn:aws:macie2:AWS_REGION:AWS_ACCOUNT_ID:classification-job/abc123def456",
          "jobId": "abc123def456",
          "result": {
            "status": {
              "code": "COMPLETE"
            },
            "sensitiveData": [
              {
                "category": "PII",
                "detections": [
                  {
                    "type": "SSN",
                    "count": 5
                  }
                ],
                "totalCount": 5
              }
            ]
          }
        },
        "count": 1,
        "createdAt": "2024-01-15T10:30:00Z",
        "description": "The object contains sensitive data",
        "resourcesAffected": {
          "s3Bucket": {
            "arn": "arn:aws:s3:::my-bucket",
            "name": "my-bucket"
          },
          "s3Object": {
            "bucketArn": "arn:aws:s3:::my-bucket",
            "key": "sensitive-file.txt",
            "size": 1024,
            "storageClass": "STANDARD"
          }
        },
        "severity": {
          "description": "High",
          "score": 3.0
        },
        "title": "Sensitive data found",
        "type": "SensitiveData:S3Object/Personal"
      }
    ],
    "totalFindings": 150,
    "maxResults": 50,
    "nextToken": "eyJhbGciOiJIUzI1NiJ9...",
    "requestId": "12345678-1234-1234-1234-123456789012"
  }
}
```

#### Error Response (400 Bad Request)

```json
{
  "success": false,
  "error": {
    "type": "Bad Request",
    "message": "Missing required parameter: jobId",
    "requestId": "12345678-1234-1234-1234-123456789012"
  }
}
```

#### Error Response (500 Internal Server Error)

```json
{
  "success": false,
  "error": {
    "type": "Macie API Error",
    "message": "Unable to retrieve findings from Macie service",
    "requestId": "12345678-1234-1234-1234-123456789012"
  }
}
```

### Pagination

The API supports pagination to handle large numbers of findings:

1. **First Request**: Call the endpoint with just `jobId` and optionally `maxResults`
2. **Subsequent Requests**: Use the `nextToken` from the previous response to get the next page
3. **End of Results**: When `nextToken` is not present in the response, you've reached the end

#### Pagination Example

```bash
# Step 1: Get first page
GET /v1/get-findings?jobId=abc123&maxResults=25

# Response includes nextToken: "token123"

# Step 2: Get next page
GET /v1/get-findings?jobId=abc123&maxResults=25&nextToken=token123

# Step 3: Continue until nextToken is not returned
```

## Usage Examples

### Using AWS CLI

Since the API uses IAM authentication (SigV4), you need to use tools that can properly sign the requests. Here are several working approaches:

#### Option 1: Using awscurl (Recommended)

First install awscurl:
```bash
pip install awscurl
```

##### Create Job
```bash
# Replace YOUR_API_ID with your actual API Gateway ID
# Replace AWS_REGION with your AWS region
# create a file create-job-request.json with all the parameters as shown in the  Request Format example of #1.Create Classification Job API 
# Note: Additional headers are required to bypass WAF Bot Control protection
awscurl --service execute-api \
  --region AWS_REGION \
  -X POST \
  -H "Content-Type: application/json" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" \
  -H "Accept: application/json, text/plain, */*" \
  -H "Accept-Language: en-US,en;q=0.9" \
  -d @create-job-request.json \
  "https://YOUR_API_ID.execute-api.AWS_REGION.amazonaws.com/v1/create-job"
```

##### Get Findings
```bash
# Note: Additional headers are required to bypass WAF Bot Control protection
awscurl --service execute-api \
  --region AWS_REGION \
  -X GET \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" \
  -H "Accept: application/json, text/plain, */*" \
  -H "Accept-Language: en-US,en;q=0.9" \
  "https://YOUR_API_ID.execute-api.AWS_REGION.amazonaws.com/v1/get-findings?jobId=YOUR_JOB_ID"
```

#### Option 2: Using aws-api-gateway-cli-test

First install the tool:
```bash
npm install -g aws-api-gateway-cli-test
```

##### Create Job
```bash
# Get your AWS credentials
export AWS_ACCESS_KEY_ID=$(aws configure get aws_access_key_id)
export AWS_SECRET_ACCESS_KEY=$(aws configure get aws_secret_access_key)

apig-test \
  --username $AWS_ACCESS_KEY_ID \
  --password $AWS_SECRET_ACCESS_KEY \
  --invoke-url https://YOUR_API_ID.execute-api.AWS_REGION.amazonaws.com/v1 \
  --method POST \
  --path /create-job \
  --body @create-job-request.json
```

##### Get Findings
```bash
apig-test \
  --username $AWS_ACCESS_KEY_ID \
  --password $AWS_SECRET_ACCESS_KEY \
  --invoke-url https://YOUR_API_ID.execute-api.AWS_REGION.amazonaws.com/v1 \
  --method GET \
  --path "/get-findings?jobId=YOUR_JOB_ID"
```

#### Option 3: Using curl with AWS SigV4 (Advanced)

Create a script to sign requests with AWS SigV4. Here's a bash script example:

```bash
#!/bin/bash
# save as: call-api.sh

API_ID="YOUR_API_ID"
REGION="AWS_REGION"
SERVICE="execute-api"
ENDPOINT="https://${API_ID}.execute-api.${REGION}.amazonaws.com/v1"

# Function to create job
create_job() {
    local request_file="$1"
    
    # Use aws-cli to sign and send the request
    aws --region $REGION \
        --output json \
        execute-api invoke \
        --rest-api-id $API_ID \
        --stage-name v1 \
        --method POST \
        --path /create-job \
        --body fileb://$request_file \
        response.json
    
    cat response.json
}

# Function to get findings
get_findings() {
    local job_id="$1"
    
    aws --region $REGION \
        --output json \
        execute-api invoke \
        --rest-api-id $API_ID \
        --stage-name v1 \
        --method GET \
        --path "/get-findings?jobId=$job_id" \
        response.json
    
    cat response.json
}

# Usage examples:
# ./call-api.sh create create-job-request.json
# ./call-api.sh get YOUR_JOB_ID

case "$1" in
    create)
        create_job "$2"
        ;;
    get)
        get_findings "$2"
        ;;
    *)
        echo "Usage: $0 {create|get} [file|job_id]"
        echo "  create: $0 create create-job-request.json"
        echo "  get:    $0 get YOUR_JOB_ID"
        exit 1
        ;;
esac
```

Make the script executable and use it:
```bash
chmod +x call-api.sh

# Create a job
./call-api.sh create create-job-request.json

# Get findings (replace with actual job ID from create response)
./call-api.sh get job-12345678-1234-1234-1234-123456789012
```

#### Option 4: Using AWS CLI with test-invoke-method (Testing Only)

**Note**: This only works for testing and requires additional setup:

```bash
# First, get the resource ID for your API
RESOURCE_ID=$(aws apigateway get-resources \
  --rest-api-id YOUR_API_ID \
  --query 'items[?pathPart==`create-job`].id' \
  --output text)

# Test invoke the method
aws apigateway test-invoke-method \
  --rest-api-id YOUR_API_ID \
  --resource-id $RESOURCE_ID \
  --http-method POST \
  --body file://create-job-request.json
```

#### Prerequisites

Before using any of these methods, ensure you have:

1. **AWS CLI configured** with appropriate credentials:
   ```bash
   aws configure
   ```

2. **Proper IAM permissions** for your user/role:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": "execute-api:Invoke",
         "Resource": "arn:aws:execute-api:REGION:ACCOUNT:API_ID/v1/*/*"
       }
     ]
   }
   ```

3. **Your API Gateway ID** (available in CDK stack outputs after deployment)

#### Complete Example Workflow

1. **Deploy your CDK stack** and note the API Gateway ID from outputs
2. **Create your request file** (create-job-request.json):
   ```json
   {
     "name": "My Test Job",
     "jobType": "ONE_TIME",
     "s3JobDefinition": {
       "bucketDefinitions": [
         {
           "accountId": "AWS_ACCOUNT_ID",
           "buckets": ["my-test-bucket"]
         }
       ]
     },
     "tags": {
       "JobStatusEventBusArn": "arn:aws:events:AWS_REGION:AWS_ACCOUNT_ID:event-bus/default"
     }
   }
   ```

3. **Create the job**:
   ```bash
   awscurl --service execute-api \
     --region AWS_REGION \
     -X POST \
     -H "Content-Type: application/json" \
     -d @create-job-request.json \
     "https://YOUR_API_ID.execute-api.AWS_REGION.amazonaws.com/v1/create-job"
   ```

4. **Get the job ID** from the response and use it to retrieve findings:
   ```bash
   awscurl --service execute-api \
     --region AWS_REGION \
     -X GET \
     "https://YOUR_API_ID.execute-api.AWS_REGION.amazonaws.com/v1/get-findings?jobId=YOUR_JOB_ID"
   ```

### Using AWS SDK for JavaScript/Node.js

#### Create Job
```javascript
import { APIGatewayClient, InvokeCommand } from '@aws-sdk/client-api-gateway';
import { SignatureV4 } from '@aws-sdk/signature-v4';

const client = new APIGatewayClient();

const request = {
  name: 'My Macie Classification Job',
  jobType: 'ONE_TIME',
  s3JobDefinition: {
    bucketDefinitions: [{
      accountId: 'AWS_ACCOUNT_ID',
      buckets: ['my-bucket-name']
    }]
  },
  tags: {
    JobStatusEventBusArn: 'arn:aws:events:AWS_REGION:AWS_ACCOUNT_ID:event-bus/my-event-bus'
  }
};

const response = await fetch('https://YOUR_API_ID.execute-api.AWS_REGION.amazonaws.com/v1/create-job', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // AWS SigV4 headers will be added automatically by AWS SDK
  },
  body: JSON.stringify(request)
});

const result = await response.json();
console.log(result);
```

#### Get Findings
```javascript
const findingsResponse = await fetch('https://YOUR_API_ID.execute-api.AWS_REGION.amazonaws.com/v1/get-findings?jobId=abc123def456&maxResults=25', {
  method: 'GET',
  headers: {
    // AWS SigV4 headers will be added automatically by AWS SDK
  }
});

const findings = await findingsResponse.json();
console.log(findings);
```

### Using Python with boto3

#### Create Job
```python
import boto3
import json
import requests
from botocore.auth import SigV4Auth
from botocore.awsrequest import AWSRequest

# Create the request
url = 'https://YOUR_API_ID.execute-api.AWS_REGION.amazonaws.com/v1/create-job'
data = {
    'name': 'My Macie Classification Job',
    'jobType': 'ONE_TIME',
    's3JobDefinition': {
        'bucketDefinitions': [{
            'accountId': 'AWS_ACCOUNT_ID',
            'buckets': ['my-bucket-name']
        }]
    },
    'tags': {
        'JobStatusEventBusArn': 'arn:aws:events:AWS_REGION:AWS_ACCOUNT_ID:event-bus/my-event-bus'
    }
}

# Sign the request
session = boto3.Session()
credentials = session.get_credentials()
request = AWSRequest(method='POST', url=url, data=json.dumps(data))
SigV4Auth(credentials, 'execute-api', 'AWS_REGION').add_auth(request)

# Send the request
response = requests.post(url, data=request.body, headers=dict(request.headers))
print(response.json())
```

#### Get Findings
```python
# Get findings
findings_url = 'https://YOUR_API_ID.execute-api.AWS_REGION.amazonaws.com/v1/get-findings?jobId=abc123def456'
findings_request = AWSRequest(method='GET', url=findings_url)
SigV4Auth(credentials, 'execute-api', 'AWS_REGION').add_auth(findings_request)

findings_response = requests.get(findings_url, headers=dict(findings_request.headers))
print(findings_response.json())
```

## IAM Policy Requirements

To call the APIs, users/roles need the following IAM policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "execute-api:Invoke",
      "Resource": [
        "arn:aws:execute-api:REGION:ACCOUNT:API_ID/v1/POST/create-job",
        "arn:aws:execute-api:REGION:ACCOUNT:API_ID/v1/GET/get-findings"
      ]
    }
  ]
}
```

Replace:
- `REGION`: Your AWS region (e.g., AWS_REGION)
- `ACCOUNT`: Your AWS account ID
- `API_ID`: Your API Gateway ID (available in stack outputs)

## Monitoring and Logging

### CloudWatch Logs
- **API Gateway Access Logs**: `/aws/apigateway/macie-api-access-logs`
- **API Gateway Execution Logs**: `/aws/apigateway/YOUR_API_ID`
- **Lambda Function Logs**: 
  - `/aws/lambda/SolutionsGuidanceMacieStack-CreateMacieJobFunction-*`
  - `/aws/lambda/SolutionsGuidanceMacieStack-GetMacieFindingsFunction-*`

### CloudWatch Metrics
- API Gateway metrics: Request count, latency, error rates
- WAF metrics: Blocked requests, rule matches
- Lambda metrics: Invocations, duration, errors

### WAF Logs
WAF logs are available in CloudWatch and can be used to monitor blocked requests and security events.

## Troubleshooting

### Common Issues

1. **403 Forbidden**: Check IAM permissions and SigV4 signing
2. **403 Forbidden with WAF Bot Control**: Add browser-like headers (see WAF troubleshooting below)
3. **400 Bad Request**: Validate request JSON against the schema (for create-job) or check query parameters (for get-findings)
4. **429 Too Many Requests**: Implement exponential backoff
5. **500 Internal Server Error**: Check Lambda function logs

### WAF Bot Control Troubleshooting

The API is protected by AWS WAF with Bot Control rules that may block command-line tools like `awscurl` or `curl`. If you receive a 403 Forbidden error, try these solutions:

#### Solution 1: Add Browser Headers (Recommended)
Include browser-like headers to bypass bot detection:

```bash
# For awscurl
awscurl --service execute-api \
  --region AWS_REGION \
  -X POST \
  -H "Content-Type: application/json" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" \
  -H "Accept: application/json, text/plain, */*" \
  -H "Accept-Language: en-US,en;q=0.9" \
  -d @create-job-request.json \
  "https://YOUR_API_ID.execute-api.AWS_REGION.amazonaws.com/v1/create-job"
```

#### Solution 2: Use SDK Instead of CLI Tools
SDKs are less likely to be flagged as bots:

```python
# Python example with proper headers
import boto3
import json
import requests
from botocore.auth import SigV4Auth
from botocore.awsrequest import AWSRequest

session = boto3.Session()
credentials = session.get_credentials()

headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'aws-sdk-python/1.0.0'
}

# This approach bypasses WAF bot detection
```

#### Solution 3: Check WAF Logs
If headers don't work, check WAF logs to see which rule is blocking:

```bash
# Check WAF metrics
aws cloudwatch get-metric-statistics \
  --namespace AWS/WAFV2 \
  --metric-name BlockedRequests \
  --dimensions Name=WebACL,Value=MacieApiWebACL Name=Region,Value=AWS_REGION \
  --start-time $(date -d '1 hour ago' -u +%Y-%m-%dT%H:%M:%S) \
  --end-time $(date -u +%Y-%m-%dT%H:%M:%S) \
  --period 300 \
  --statistics Sum \
  --region AWS_REGION
```

### Debug Steps

1. Check API Gateway access logs for request details
2. Review Lambda function logs for execution errors
3. Verify EventBridge event bus ARN in tags (for create-job)
4. Ensure S3 buckets exist and are accessible (for create-job)
5. Verify job ID exists and is valid (for get-findings)
6. Check Macie service status and permissions

## Migration from EventBridge

If you were previously relying on automatic findings retrieval via EventBridge events, you'll need to:

1. Update your application to call the GET /get-findings API endpoint when you need findings
2. Handle pagination if you expect large numbers of findings
3. Implement appropriate error handling and retry logic

The EventBridge integration for job status monitoring remains active, but no longer automatically triggers findings retrieval.

## Stack Outputs

After deploying the stack, you'll get these outputs:
- **MacieApiUrl**: The base URL of your API
- **MacieApiId**: The API Gateway ID for reference

Use these values to construct your API calls and IAM policies.
