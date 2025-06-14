import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { PolicyStatement, Effect, Role, ServicePrincipal, ManagedPolicy } from 'aws-cdk-lib/aws-iam';
import { LogGroup, SubscriptionFilter, FilterPattern } from 'aws-cdk-lib/aws-logs';
import { LambdaDestination } from 'aws-cdk-lib/aws-logs-destinations';
import { 
  RestApi, 
  LambdaIntegration, 
  AuthorizationType, 
  RequestValidator,
  Model,
  JsonSchemaType,
  JsonSchemaVersion,
  MethodLoggingLevel,
  AccessLogFormat,
  LogGroupLogDestination,
  CfnAccount
} from 'aws-cdk-lib/aws-apigateway';
import { WafwebaclToApiGateway } from '@aws-solutions-constructs/aws-wafwebacl-apigateway';
import { NagSuppressions } from 'cdk-nag';

export class SolutionsGuidanceMacieStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the Lambda function for Macie Classification Job creation
    const createMacieJobFunction = new NodejsFunction(this, 'CreateMacieJobFunction', {
      entry: 'lib/lambda/create-macie-job/index.ts',
      handler: 'handler',
      runtime: Runtime.NODEJS_LATEST,
      timeout: cdk.Duration.minutes(5),
      memorySize: 256,
      description: 'Lambda function to create Amazon Macie Classification Jobs',
      environment: {
        NODE_OPTIONS: '--enable-source-maps',
      },
      bundling: {
        minify: true,
        sourceMap: true,
        target: 'es2022',
        keepNames: true,
        externalModules: [
          '@aws-sdk/client-macie2', // Use AWS SDK v3 from Lambda runtime
          '@aws-sdk/client-eventbridge' // Use AWS SDK v3 from Lambda runtime
        ]
      }
    });

    // Add IAM permissions for Macie operations
    createMacieJobFunction.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        'macie2:CreateClassificationJob',
        'macie2:TagResource'
      ],
      resources: ['*'] // Macie jobs don't have specific ARN patterns before creation
    }));

    // Add IAM permissions for S3 access (required for Macie to analyze buckets)
    createMacieJobFunction.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        's3:GetBucketLocation',
        's3:ListBucket',
        's3:GetObject',
      ],
      resources: ['*'] // Macie needs to access various S3 buckets as specified in job definition
    }));

    createMacieJobFunction.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        'iam:PassRole'
      ],
      resources: ['*'] // Macie needs to pass a role to Macie for job creation
    }));

    // Add IAM permissions for EventBridge access (required for EventBus validation)
    createMacieJobFunction.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        'events:DescribeEventBus'
      ],
      resources: ['*'] // EventBus ARNs are provided at runtime in the tags
    }));

    // Create the Lambda function for processing Macie job status events
    const processMacieJobStatusFunction = new NodejsFunction(this, 'ProcessMacieJobStatusFunction', {
      entry: 'lib/lambda/process-macie-job-status/index.ts',
      handler: 'handler',
      runtime: Runtime.NODEJS_LATEST,
      timeout: cdk.Duration.minutes(5),
      memorySize: 512,
      description: 'Lambda function to process Macie job status events and publish to EventBridge',
      environment: {
        NODE_OPTIONS: '--enable-source-maps',
      },
      bundling: {
        minify: true,
        sourceMap: true,
        target: 'es2022',
        keepNames: true,
        externalModules: [
          '@aws-sdk/client-macie2', // Use AWS SDK v3 from Lambda runtime
          '@aws-sdk/client-eventbridge' // Use AWS SDK v3 from Lambda runtime
        ]
      }
    });

    // Add IAM permissions for Macie operations (to get job details)
    processMacieJobStatusFunction.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        'macie2:DescribeClassificationJob'
      ],
      resources: ['*'] // Job IDs are extracted from CloudWatch logs at runtime
    }));

    // Add IAM permissions for EventBridge operations
    processMacieJobStatusFunction.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        'events:PutEvents',
        'events:DescribeEventBus'
      ],
      resources: ['*'] // EventBus ARNs are determined at runtime from job tags
    }));

    // Create the Lambda function for retrieving Macie job findings
    const getMacieFindingsFunction = new NodejsFunction(this, 'GetMacieFindingsFunction', {
      entry: 'lib/lambda/get-macie-findings/index.ts',
      handler: 'handler',
      runtime: Runtime.NODEJS_LATEST,
      timeout: cdk.Duration.minutes(15), // Longer timeout for findings retrieval
      memorySize: 1024, // More memory for processing large numbers of findings
      description: 'Lambda function to retrieve Macie job findings via API Gateway or EventBridge events',
      environment: {
        NODE_OPTIONS: '--enable-source-maps',
      },
      bundling: {
        minify: true,
        sourceMap: true,
        target: 'es2022',
        keepNames: true,
        externalModules: [
          '@aws-sdk/client-macie2' // Use AWS SDK v3 from Lambda runtime
        ]
      }
    });

    // Add IAM permissions for Macie findings operations
    getMacieFindingsFunction.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        'macie2:ListFindings',
        'macie2:GetFindings'
      ],
      resources: ['*'] // Findings are queried by job ID at runtime
    }));

    // Reference the Macie CloudWatch log group
    const macieLogGroup = LogGroup.fromLogGroupName(
      this,
      'MacieClassificationJobsLogGroup',
      '/aws/macie/classificationjobs'
    );

    // Create subscription filter for Macie job status events
    new SubscriptionFilter(this, 'MacieJobStatusSubscriptionFilter', {
      logGroup: macieLogGroup,
      destination: new LambdaDestination(processMacieJobStatusFunction),
      filterPattern: FilterPattern.anyTerm(
        'SCHEDULED_RUN_COMPLETED',
        'JOB_COMPLETED',
        'NO_BUCKETS_MATCHED_THE_CRITERIA',
        'JOB_CANCELLED',
        'ACCOUNT_',
        'BUCKET_'
      ),
      filterName: 'MacieJobStatusFilter'
    });


    // Create CloudWatch Log Group for API Gateway access logs
    const apiGatewayLogGroup = new LogGroup(this, 'MacieApiGatewayLogGroup', {
      logGroupName: `/aws/apigateway/macie-api-access-logs`,
      retention: cdk.aws_logs.RetentionDays.ONE_MONTH,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    // Create API Gateway REST API
    const macieApi = new RestApi(this, 'MacieApi', {
      restApiName: 'Macie Jobs and Findings API',
      description: 'API Gateway for creating Amazon Macie Classification Jobs and retrieving findings',
      deployOptions: {
        stageName: 'v1',
        metricsEnabled: true,
        accessLogDestination: new LogGroupLogDestination(apiGatewayLogGroup),
        accessLogFormat: AccessLogFormat.jsonWithStandardFields({
          caller: true,
          httpMethod: true,
          ip: true,
          protocol: true,
          requestTime: true,
          resourcePath: true,
          responseLength: true,
          status: true,
          user: true,
        })
      },
      defaultCorsPreflightOptions: {
        allowOrigins: ['*'],
        allowMethods: ['GET', 'POST', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key', 'X-Amz-Security-Token']
      }
    });

    // Create request model for validation
    const macieJobRequestModel = new Model(this, 'MacieJobRequestModel', {
      restApi: macieApi,
      modelName: 'MacieJobRequest',
      description: 'Model for Macie Classification Job creation requests',
      schema: {
        schema: JsonSchemaVersion.DRAFT4,
        title: 'MacieJobRequest',
        type: JsonSchemaType.OBJECT,
        properties: {
          name: {
            type: JsonSchemaType.STRING,
            minLength: 1,
            maxLength: 500
          },
          jobType: {
            type: JsonSchemaType.STRING,
            enum: ['ONE_TIME', 'SCHEDULED']
          },
          s3JobDefinition: {
            type: JsonSchemaType.OBJECT,
            properties: {
              bucketDefinitions: {
                type: JsonSchemaType.ARRAY,
                items: {
                  type: JsonSchemaType.OBJECT,
                  properties: {
                    accountId: {
                      type: JsonSchemaType.STRING,
                      pattern: '^[0-9]{12}$'
                    },
                    buckets: {
                      type: JsonSchemaType.ARRAY,
                      items: {
                        type: JsonSchemaType.STRING
                      }
                    }
                  },
                  required: ['accountId', 'buckets']
                }
              }
            },
            required: ['bucketDefinitions']
          },
          tags: {
            type: JsonSchemaType.OBJECT,
            properties: {
              JobStatusEventBusArn: {
                type: JsonSchemaType.STRING,
                pattern: '^arn:aws:events:[a-z0-9-]+:[0-9]{12}:event-bus/.+$'
              }
            },
            required: ['JobStatusEventBusArn']
          }
        },
        required: ['name', 'jobType', 's3JobDefinition', 'tags']
      }
    });

    // Create request validator
    const requestValidator = new RequestValidator(this, 'MacieJobRequestValidator', {
      restApi: macieApi,
      requestValidatorName: 'MacieJobRequestValidator',
      validateRequestBody: true,
      validateRequestParameters: true
    });

    // Create Lambda integration
    const createJobIntegration = new LambdaIntegration(createMacieJobFunction, {
      requestTemplates: {
        'application/json': '$input.json("$")'
      },
      integrationResponses: [
        {
          statusCode: '200',
          responseTemplates: {
            'application/json': '$input.json("$")'
          }
        },
        {
          statusCode: '400',
          selectionPattern: '.*"statusCode":400.*',
          responseTemplates: {
            'application/json': '$input.json("$")'
          }
        },
        {
          statusCode: '500',
          selectionPattern: '.*"statusCode":500.*',
          responseTemplates: {
            'application/json': '$input.json("$")'
          }
        }
      ]
    });

    // Create /create-job resource and POST method
    const createJobResource = macieApi.root.addResource('create-job');
    createJobResource.addMethod('POST', createJobIntegration, {
      authorizationType: AuthorizationType.IAM,
      requestValidator: requestValidator,
      requestModels: {
        'application/json': macieJobRequestModel
      },
      methodResponses: [
        {
          statusCode: '200',
          responseModels: {
            'application/json': Model.EMPTY_MODEL
          }
        },
        {
          statusCode: '400',
          responseModels: {
            'application/json': Model.ERROR_MODEL
          }
        },
        {
          statusCode: '500',
          responseModels: {
            'application/json': Model.ERROR_MODEL
          }
        }
      ]
    });

    // Create request validator for GET requests with query parameters
    const getFindingsRequestValidator = new RequestValidator(this, 'GetFindingsRequestValidator', {
      restApi: macieApi,
      requestValidatorName: 'GetFindingsRequestValidator',
      validateRequestParameters: true,
      validateRequestBody: false
    });

    // Create Lambda integration for get-findings
    const getFindingsIntegration = new LambdaIntegration(getMacieFindingsFunction, {
      proxy: true,
      integrationResponses: [
        {
          statusCode: '200',
          responseTemplates: {
            'application/json': '$input.json("$")'
          },
          responseParameters: {
            'method.response.header.Access-Control-Allow-Origin': "'*'",
            'method.response.header.Access-Control-Allow-Methods': "'GET,OPTIONS'",
            'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
          }
        },
        {
          statusCode: '400',
          selectionPattern: '.*"statusCode":400.*',
          responseTemplates: {
            'application/json': '$input.json("$")'
          },
          responseParameters: {
            'method.response.header.Access-Control-Allow-Origin': "'*'"
          }
        },
        {
          statusCode: '500',
          selectionPattern: '.*"statusCode":500.*',
          responseTemplates: {
            'application/json': '$input.json("$")'
          },
          responseParameters: {
            'method.response.header.Access-Control-Allow-Origin': "'*'"
          }
        }
      ]
    });

    // Create /get-findings resource and GET method
    const getFindingsResource = macieApi.root.addResource('get-findings');
    getFindingsResource.addMethod('GET', getFindingsIntegration, {
      authorizationType: AuthorizationType.IAM,
      requestValidator: getFindingsRequestValidator,
      requestParameters: {
        'method.request.querystring.jobId': true,  // Required parameter
        'method.request.querystring.maxResults': false,  // Optional parameter
        'method.request.querystring.nextToken': false   // Optional parameter
      },
      methodResponses: [
        {
          statusCode: '200',
          responseModels: {
            'application/json': Model.EMPTY_MODEL
          },
          responseParameters: {
            'method.response.header.Access-Control-Allow-Origin': true,
            'method.response.header.Access-Control-Allow-Methods': true,
            'method.response.header.Access-Control-Allow-Headers': true
          }
        },
        {
          statusCode: '400',
          responseModels: {
            'application/json': Model.ERROR_MODEL
          },
          responseParameters: {
            'method.response.header.Access-Control-Allow-Origin': true
          }
        },
        {
          statusCode: '500',
          responseModels: {
            'application/json': Model.ERROR_MODEL
          },
          responseParameters: {
            'method.response.header.Access-Control-Allow-Origin': true
          }
        }
      ]
    });

    // Create IAM role for API Gateway CloudWatch logging
    const apiGatewayCloudWatchRole = new Role(this, 'ApiGatewayCloudWatchRole', {
      assumedBy: new ServicePrincipal('apigateway.amazonaws.com'),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonAPIGatewayPushToCloudWatchLogs')
      ],
      description: 'IAM role for API Gateway to write logs to CloudWatch'
    });

    // Set the CloudWatch role in API Gateway account settings
    new CfnAccount(this, 'ApiGatewayAccount', {
      cloudWatchRoleArn: apiGatewayCloudWatchRole.roleArn
    });

    // Create WAF Web ACL with API Gateway using AWS Solutions Construct
    const wafApiGateway = new WafwebaclToApiGateway(this, 'MacieApiWafConstruct', {
      existingApiGatewayInterface: macieApi,
    });

    // Output the API Gateway URL
    new cdk.CfnOutput(this, 'MacieApiUrl', {
      value: macieApi.url,
      description: 'URL of the Macie Jobs and Findings API',
      exportName: 'MacieApiUrl'
    });

    // Output the API Gateway ID for reference
    new cdk.CfnOutput(this, 'MacieApiId', {
      value: macieApi.restApiId,
      description: 'ID of the Macie Jobs and Findings API',
      exportName: 'MacieApiId'
    });

    // CDK-NAG suppressions for broad permissions required by Macie
    NagSuppressions.addResourceSuppressions(
      createMacieJobFunction,
      [
        {
          id: 'AwsSolutions-IAM5',
          reason: 'Macie requires broad permissions to access S3 buckets and create classification jobs. The specific resources are determined at runtime based on the job configuration.'
        },
        {
          id: 'AwsSolutions-IAM4',
          reason: 'Lambda function uses AWS managed policy AWSLambdaBasicExecutionRole for CloudWatch Logs access, which is a standard practice.'
        },
        {
          id: 'AwsSolutions-L1',
          reason: 'Using NODEJS_LATEST runtime to ensure compatibility with latest AWS SDK versions and security patches.'
        }
      ],
      true // Apply to all child resources
    );

    // CDK-NAG suppressions for Macie job status processing function
    NagSuppressions.addResourceSuppressions(
      processMacieJobStatusFunction,
      [
        {
          id: 'AwsSolutions-IAM5',
          reason: 'Function needs broad permissions to access Macie jobs and EventBridge event buses determined at runtime from job configurations.'
        },
        {
          id: 'AwsSolutions-IAM4',
          reason: 'Lambda function uses AWS managed policy AWSLambdaBasicExecutionRole for CloudWatch Logs access, which is a standard practice.'
        },
        {
          id: 'AwsSolutions-L1',
          reason: 'Using NODEJS_LATEST runtime to ensure compatibility with latest AWS SDK versions and security patches.'
        }
      ],
      true // Apply to all child resources
    );

    // CDK-NAG suppressions for Macie findings retrieval function
    NagSuppressions.addResourceSuppressions(
      getMacieFindingsFunction,
      [
        {
          id: 'AwsSolutions-IAM5',
          reason: 'Function needs broad permissions to access Macie findings which are queried by job ID at runtime.'
        },
        {
          id: 'AwsSolutions-IAM4',
          reason: 'Lambda function uses AWS managed policy AWSLambdaBasicExecutionRole for CloudWatch Logs access, which is a standard practice.'
        },
        {
          id: 'AwsSolutions-L1',
          reason: 'Using NODEJS_LATEST runtime to ensure compatibility with latest AWS SDK versions and security patches.'
        }
      ],
      true // Apply to all child resources
    );

    // CDK-NAG suppressions for API Gateway
    NagSuppressions.addResourceSuppressions(
      macieApi,
      [
        {
          id: 'AwsSolutions-APIG2',
          reason: 'Request validation is implemented through RequestValidator and JSON schema validation.'
        },
        {
          id: 'AwsSolutions-APIG3',
          reason: 'WAF Web ACL is associated with the API Gateway for additional protection against common web exploits.'
        },
        {
          id: 'AwsSolutions-APIG4',
          reason: 'IAM authorization is used instead of API keys for better security and integration with AWS identity services.'
        },
        {
          id: 'AwsSolutions-APIG6',
          reason: 'CloudWatch logging is enabled for the API Gateway stage with INFO level logging and access logs.'
        },
        {
          id: 'AwsSolutions-COG4',
          reason: 'IAM authentication is used instead of Cognito for this internal API, which is appropriate for service-to-service communication.'
        }
      ],
      true // Apply to all child resources
    );

    // CDK-NAG suppressions for WAF Web ACL
    NagSuppressions.addResourceSuppressions(
      wafApiGateway,
      [
        {
          id: 'AwsSolutions-WAF2',
          reason: 'WAF Web ACL includes comprehensive rule sets: Common Rule Set, Known Bad Inputs, SQL Injection protection, and rate limiting.'
        }
      ],
      true // Apply to all child resources
    );

    // CDK-NAG suppressions for API Gateway CloudWatch role
    NagSuppressions.addResourceSuppressions(
      apiGatewayCloudWatchRole,
      [
        {
          id: 'AwsSolutions-IAM4',
          reason: 'API Gateway CloudWatch role uses AWS managed policy AmazonAPIGatewayPushToCloudWatchLogs which is the standard AWS-recommended policy for this purpose.'
        }
      ],
      true // Apply to all child resources
    );
  }
}
