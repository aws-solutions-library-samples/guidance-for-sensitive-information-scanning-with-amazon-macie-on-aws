"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waf = exports.vpc = exports.timestream = exports.stepfunctions = exports.sqs = exports.sns = exports.secretsmanager = exports.sagemaker = exports.s3 = exports.redshift = exports.rds = exports.quicksight = exports.opensearch = exports.neptune = exports.msk = exports.mediastore = exports.lex = exports.lambda = exports.kms = exports.kinesis = exports.iam = exports.glue = exports.eventbridge = exports.emr = exports.elb = exports.elasticbeanstalk = exports.elasticache = exports.efs = exports.eks = exports.ecs = exports.ecr = exports.ec2 = exports.dynamodb = exports.documentdb = exports.dms = exports.cognito = exports.codebuild = exports.cloudwatch = exports.cloudtrail = exports.cloudfront = exports.cloud9 = exports.autoscaling = exports.appsync = exports.apigw = void 0;
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
exports.apigw = require("./apigw");
exports.appsync = require("./appsync");
exports.autoscaling = require("./autoscaling");
exports.cloud9 = require("./cloud9");
exports.cloudfront = require("./cloudfront");
exports.cloudtrail = require("./cloudtrail");
exports.cloudwatch = require("./cloudwatch");
exports.codebuild = require("./codebuild");
exports.cognito = require("./cognito");
exports.dms = require("./dms");
exports.documentdb = require("./documentdb");
exports.dynamodb = require("./dynamodb");
exports.ec2 = require("./ec2");
exports.ecr = require("./ecr");
exports.ecs = require("./ecs");
exports.eks = require("./eks");
exports.efs = require("./efs");
exports.elasticache = require("./elasticache");
exports.elasticbeanstalk = require("./elasticbeanstalk");
exports.elb = require("./elb");
exports.emr = require("./emr");
exports.eventbridge = require("./eventbridge");
exports.glue = require("./glue");
exports.iam = require("./iam");
exports.kinesis = require("./kinesis");
exports.kms = require("./kms");
exports.lambda = require("./lambda");
exports.lex = require("./lex");
exports.mediastore = require("./mediastore");
exports.msk = require("./msk");
exports.neptune = require("./neptune");
exports.opensearch = require("./opensearch");
exports.quicksight = require("./quicksight");
exports.rds = require("./rds");
exports.redshift = require("./redshift");
exports.s3 = require("./s3");
exports.sagemaker = require("./sagemaker");
exports.secretsmanager = require("./secretsmanager");
exports.sns = require("./sns");
exports.sqs = require("./sqs");
exports.stepfunctions = require("./stepfunctions");
exports.timestream = require("./timestream");
exports.vpc = require("./vpc");
exports.waf = require("./waf");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcnVsZXMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7OztFQUdFO0FBQ0YsbUNBQWlDO0FBQ2pDLHVDQUFxQztBQUNyQywrQ0FBNkM7QUFDN0MscUNBQW1DO0FBQ25DLDZDQUEyQztBQUMzQyw2Q0FBMkM7QUFDM0MsNkNBQTJDO0FBQzNDLDJDQUF5QztBQUN6Qyx1Q0FBcUM7QUFDckMsK0JBQTZCO0FBQzdCLDZDQUEyQztBQUMzQyx5Q0FBdUM7QUFDdkMsK0JBQTZCO0FBQzdCLCtCQUE2QjtBQUM3QiwrQkFBNkI7QUFDN0IsK0JBQTZCO0FBQzdCLCtCQUE2QjtBQUM3QiwrQ0FBNkM7QUFDN0MseURBQXVEO0FBQ3ZELCtCQUE2QjtBQUM3QiwrQkFBNkI7QUFDN0IsK0NBQTZDO0FBQzdDLGlDQUErQjtBQUMvQiwrQkFBNkI7QUFDN0IsdUNBQXFDO0FBQ3JDLCtCQUE2QjtBQUM3QixxQ0FBbUM7QUFDbkMsK0JBQTZCO0FBQzdCLDZDQUEyQztBQUMzQywrQkFBNkI7QUFDN0IsdUNBQXFDO0FBQ3JDLDZDQUEyQztBQUMzQyw2Q0FBMkM7QUFDM0MsK0JBQTZCO0FBQzdCLHlDQUF1QztBQUN2Qyw2QkFBMkI7QUFDM0IsMkNBQXlDO0FBQ3pDLHFEQUFtRDtBQUNuRCwrQkFBNkI7QUFDN0IsK0JBQTZCO0FBQzdCLG1EQUFpRDtBQUNqRCw2Q0FBMkM7QUFDM0MsK0JBQTZCO0FBQzdCLCtCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5Db3B5cmlnaHQgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4qL1xuZXhwb3J0ICogYXMgYXBpZ3cgZnJvbSAnLi9hcGlndyc7XG5leHBvcnQgKiBhcyBhcHBzeW5jIGZyb20gJy4vYXBwc3luYyc7XG5leHBvcnQgKiBhcyBhdXRvc2NhbGluZyBmcm9tICcuL2F1dG9zY2FsaW5nJztcbmV4cG9ydCAqIGFzIGNsb3VkOSBmcm9tICcuL2Nsb3VkOSc7XG5leHBvcnQgKiBhcyBjbG91ZGZyb250IGZyb20gJy4vY2xvdWRmcm9udCc7XG5leHBvcnQgKiBhcyBjbG91ZHRyYWlsIGZyb20gJy4vY2xvdWR0cmFpbCc7XG5leHBvcnQgKiBhcyBjbG91ZHdhdGNoIGZyb20gJy4vY2xvdWR3YXRjaCc7XG5leHBvcnQgKiBhcyBjb2RlYnVpbGQgZnJvbSAnLi9jb2RlYnVpbGQnO1xuZXhwb3J0ICogYXMgY29nbml0byBmcm9tICcuL2NvZ25pdG8nO1xuZXhwb3J0ICogYXMgZG1zIGZyb20gJy4vZG1zJztcbmV4cG9ydCAqIGFzIGRvY3VtZW50ZGIgZnJvbSAnLi9kb2N1bWVudGRiJztcbmV4cG9ydCAqIGFzIGR5bmFtb2RiIGZyb20gJy4vZHluYW1vZGInO1xuZXhwb3J0ICogYXMgZWMyIGZyb20gJy4vZWMyJztcbmV4cG9ydCAqIGFzIGVjciBmcm9tICcuL2Vjcic7XG5leHBvcnQgKiBhcyBlY3MgZnJvbSAnLi9lY3MnO1xuZXhwb3J0ICogYXMgZWtzIGZyb20gJy4vZWtzJztcbmV4cG9ydCAqIGFzIGVmcyBmcm9tICcuL2Vmcyc7XG5leHBvcnQgKiBhcyBlbGFzdGljYWNoZSBmcm9tICcuL2VsYXN0aWNhY2hlJztcbmV4cG9ydCAqIGFzIGVsYXN0aWNiZWFuc3RhbGsgZnJvbSAnLi9lbGFzdGljYmVhbnN0YWxrJztcbmV4cG9ydCAqIGFzIGVsYiBmcm9tICcuL2VsYic7XG5leHBvcnQgKiBhcyBlbXIgZnJvbSAnLi9lbXInO1xuZXhwb3J0ICogYXMgZXZlbnRicmlkZ2UgZnJvbSAnLi9ldmVudGJyaWRnZSc7XG5leHBvcnQgKiBhcyBnbHVlIGZyb20gJy4vZ2x1ZSc7XG5leHBvcnQgKiBhcyBpYW0gZnJvbSAnLi9pYW0nO1xuZXhwb3J0ICogYXMga2luZXNpcyBmcm9tICcuL2tpbmVzaXMnO1xuZXhwb3J0ICogYXMga21zIGZyb20gJy4va21zJztcbmV4cG9ydCAqIGFzIGxhbWJkYSBmcm9tICcuL2xhbWJkYSc7XG5leHBvcnQgKiBhcyBsZXggZnJvbSAnLi9sZXgnO1xuZXhwb3J0ICogYXMgbWVkaWFzdG9yZSBmcm9tICcuL21lZGlhc3RvcmUnO1xuZXhwb3J0ICogYXMgbXNrIGZyb20gJy4vbXNrJztcbmV4cG9ydCAqIGFzIG5lcHR1bmUgZnJvbSAnLi9uZXB0dW5lJztcbmV4cG9ydCAqIGFzIG9wZW5zZWFyY2ggZnJvbSAnLi9vcGVuc2VhcmNoJztcbmV4cG9ydCAqIGFzIHF1aWNrc2lnaHQgZnJvbSAnLi9xdWlja3NpZ2h0JztcbmV4cG9ydCAqIGFzIHJkcyBmcm9tICcuL3Jkcyc7XG5leHBvcnQgKiBhcyByZWRzaGlmdCBmcm9tICcuL3JlZHNoaWZ0JztcbmV4cG9ydCAqIGFzIHMzIGZyb20gJy4vczMnO1xuZXhwb3J0ICogYXMgc2FnZW1ha2VyIGZyb20gJy4vc2FnZW1ha2VyJztcbmV4cG9ydCAqIGFzIHNlY3JldHNtYW5hZ2VyIGZyb20gJy4vc2VjcmV0c21hbmFnZXInO1xuZXhwb3J0ICogYXMgc25zIGZyb20gJy4vc25zJztcbmV4cG9ydCAqIGFzIHNxcyBmcm9tICcuL3Nxcyc7XG5leHBvcnQgKiBhcyBzdGVwZnVuY3Rpb25zIGZyb20gJy4vc3RlcGZ1bmN0aW9ucyc7XG5leHBvcnQgKiBhcyB0aW1lc3RyZWFtIGZyb20gJy4vdGltZXN0cmVhbSc7XG5leHBvcnQgKiBhcyB2cGMgZnJvbSAnLi92cGMnO1xuZXhwb3J0ICogYXMgd2FmIGZyb20gJy4vd2FmJztcbiJdfQ==