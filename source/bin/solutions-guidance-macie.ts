#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Aspects } from 'aws-cdk-lib';
import { AwsSolutionsChecks } from 'cdk-nag';
import { SolutionsGuidanceMacieStack } from '../lib/solutions-guidance-macie-stack';

const app = new cdk.App();
new SolutionsGuidanceMacieStack(app, 'SolutionsGuidanceMacieStack', {
  description: 'Guidance for sensitive information scanning with Amazon Macie (SO9109)'
});

// Add CDK Nag AWS Solutions checks
Aspects.of(app).add(new AwsSolutionsChecks());
