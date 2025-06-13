# Guidance for Sensitive Information Scanning with Amazon Macie on AWS

This sample code demonstrates how customer applications can scan artifacts for Personally Identifiable Information (PII), financial information or credentials, and other sensitive information with Amazon Macie.


## Table of Contents

1. [Overview](#overview-required)
    - [Cost](#cost)
2. [Prerequisites](#prerequisites-required)
    - [Operating System](#operating-system-required)
3. [Deployment Steps](#deployment-steps-required)
4. [Deployment Validation](#deployment-validation-required)
5. [Running the Guidance](#running-the-guidance-required)
6. [Next Steps](#next-steps-required)
7. [Cleanup](#cleanup-required)


## Overview 

This solution provides organizations with an automated, enterprise-grade solution for discovering and protecting sensitive data across their AWS environment. While Amazon Macie offers powerful built-in capabilities for sensitive data discovery, organizations often need a more integrated, automated, and customizable approach to manage their data security at scale.

This solution enables security teams and developers to:

*Automate routine sensitive data discovery across multiple S3 buckets
*Create custom scanning rules and workflows based on organizational requirements
*Receive real-time notifications about sensitive data findings
*Maintain detailed audit trails for compliance purposes
*Integrate sensitive data scanning into existing security workflows
*The architecture leverages serverless AWS services to provide a scalable, cost-effective solution that can be deployed without managing infrastructure. It orchestrates Amazon Macie scans through Lambda functions, manages findings through EventBridge rules, and provides comprehensive monitoring through CloudWatch, all while maintaining security through temporary credentials and KMS encryption.

This guidance demonstrates how organizations can implement automated sensitive data discovery with granular control over scanning parameters, notification workflows, and response actions. It provides developers and security teams with the building blocks needed to create a robust sensitive data management system that meets their specific security and compliance requirements.

## Architecture Diagram

![Architecture Diagram](assets/images/sensitive-information-scanning-solutions-guidance.png)

### Cost ( required )

You are responsible for the cost of the AWS services used while running this Guidance. As of June,2025, the cost for running this Guidance with the default settings in the US East (N. Virginia) AWS Region is approximately $515.44 per month for processing 500 GB of data stored in S3

We recommend creating a [Budget](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html) through [AWS Cost Explorer](https://aws.amazon.com/aws-cost-management/aws-cost-explorer/) to help manage costs. Prices are subject to change. For full details, refer to the pricing webpage for each AWS service used in this Guidance._

### Sample Cost Table ( required )

**Note : Once you have created a sample cost table using AWS Pricing Calculator, copy the cost breakdown to below table and upload a PDF of the cost estimation on BuilderSpace. Do not add the link to the pricing calculator in the ReadMe.**

The following table provides a sample cost breakdown for deploying this Guidance with the default parameters in the US East (N. Virginia) Region for one month.

| AWS service  | Dimensions | Cost [USD] |
| ----------- | ------------ | ------------ |
|Amazon Macie| Data scanned: 500 GB per month | $499 |
|Amazon API Gateway | 100,000 REST API calls per month  | $ 0.35  |
|AWS Lambda| 10 custom metrics with detailed monitoring| $3.00 |
| Amazon CloudWatch | 1,000 active users per month without advanced security feature | $ 0.00 |
| Amazon S3 | 500 GB of data scanned per month stored in S3  | $ 11.50 |
| Amazon EventBridge | 100,000 events per month | $0.10 |
                                                |$515. 44|


## Prerequisites (required)

1. Enable Amazon Macie on your account. See [Getting Started](https://docs.aws.amazon.com/macie/latest/user/getting-started.html) with Macie and follow all steps until Step 5. This ensures Macie is configured correctly and the Macie CloudWatch log group is created prior to deploying our stack
2. A recent/LTS version of (node.js)[https://nodejs.org/en] installed on your laptop/PC from which you will be deploying this solution
3. An AWS account, and credentials for that account with sufficient permissions to deploy the sample code. See (Onboarding to AWS)[https://aws.amazon.com/getting-started/onboarding-to-aws] if you are new to AWS and need to create an account
4. An (Amazon EventBridge)[https://aws.amazon.com/eventbridge/] EventBus ARN where the Macie job completion event will be sent and a rule/subscription to listen for that event. You can use the default EventBus for this or create a new one. See (lib/lambda/process-macie-job-status/README.md) [https://github.com/aws-solutions-library-samples/guidance-for-training-an-aws-deepracer-model-using-amazon-sagemaker.git/main/lib/lambda/process-macie-job-status/README.md] for event details. Create an Event rule to receive this event and use your application as the Target. You can also use CloudWatch logs as a target for this rule for testing. The Event pattern you can use for this rule is:

{
  "source": ["macie.job.status"]
}

5. An Amazon S3 bucket containing the objects that you want to scan
6. Your application that invokes the API to kick-off the Amazon Macie Classification job. See API_USAGE.md for sample applications including command line tools that you can use for this

### Operating System (required)

Supported in Windows, Mac and Linux environments


### aws cdk bootstrap (if sample code has aws-cdk)

This Guidance uses aws-cdk. If you are using aws-cdk for first time, please follow the getting started guide to install AWS CDK and bootstrap your environment https://docs.aws.amazon.com/cdk/v2/guide/getting-started.html


## Deployment Steps (required)

1. Clone the repo using command ```git clone git@github.com:aws-solutions-library-samples/guidance-for-sensitive-information-scanning-on-aws.git```
2. cd to the repo folder ```cd guidance-for-sensitive-information-scanning-on-aws```
3. Run the command to bootstrap CDK environment ```npx cdk bootstrap```
4. Run the command to deploy the CDK environment ```npx cdk deploy```


## Deployment Validation  (required)


* Open CloudFormation console and verify the status of the template with the name starting with SolutionsGuidanceMacieStack.
* Once the deployment is successful, you should see 3 outputs in Console - MacieApiUrl, MacieApiId and MacieApiEndpointXXXX


## Running the Guidance (required)

* You can use the provided Lambda functions to Create the Macie Job, process the findings and retrieve the findings through the API Gateway with the help of available endpoints 
* Run the Create Macie Lambda function by following the instructions in the (READ.MD)[https://gitlab.aws.dev/aws-wwso-prototyping/solutions-guidance-macie/-/blob/main/lib/lambda/create-macie-job/README.md] file 
* Wait for the job completion and verify the process macie job status function was executed by following the steps outlined in [https://gitlab.aws.dev/aws-wwso-prototyping/solutions-guidance-macie/-/tree/main/lib/lambda/process-macie-job-status]
* Run the (get-macie-findings Lambda) [https://gitlab.aws.dev/aws-wwso-prototyping/solutions-guidance-macie/-/tree/main/lib/lambda/get-macie-findings] to retrieve the results 


## Next Steps (required)

This project includes API Gateway endpoints for creating Macie classification jobs and retrieving findings:


POST /create-job: Create new Macie classification jobs

GET /get-findings: Retrieve findings from completed jobs with pagination support

Both endpoints are secured with AWS WAF and require IAM authentication. For detailed API documentation including request/response formats, authentication, and usage examples, see API_USAGE.md.


## Cleanup (required)

Run ```npx cdk destroy``` to remove the stack that you deployed. Note that any Amazon S3 objects created by Amazon Macie will have to be manually cleaned up.


## Notices (optional)

Include a legal disclaimer

**Example:**
*Customers are responsible for making their own independent assessment of the information in this Guidance. This Guidance: (a) is for informational purposes only, (b) represents AWS current product offerings and practices, which are subject to change without notice, and (c) does not create any commitments or assurances from AWS and its affiliates, suppliers or licensors. AWS products or services are provided “as is” without warranties, representations, or conditions of any kind, whether express or implied. AWS responsibilities and liabilities to its customers are controlled by AWS agreements, and this Guidance is not part of, nor does it modify, any agreement between AWS and its customers.*


## Authors (optional)

Name of code contributors
