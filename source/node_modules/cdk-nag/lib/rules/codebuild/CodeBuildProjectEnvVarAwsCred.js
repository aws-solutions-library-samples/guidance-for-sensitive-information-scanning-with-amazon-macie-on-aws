"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_codebuild_1 = require("aws-cdk-lib/aws-codebuild");
const nag_rules_1 = require("../../nag-rules");
/**
 * CodeBuild projects do not store AWS credentials as plaintext environment variables
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_codebuild_1.CfnProject) {
        //Check for the presence of OAUTH
        const environment = aws_cdk_lib_1.Stack.of(node).resolve(node.environment);
        const environmentVars = aws_cdk_lib_1.Stack.of(node).resolve(environment.environmentVariables);
        if (environmentVars != undefined) {
            //For each envvar, check if its a sensitive credential being stored
            for (const envVar of environmentVars) {
                const resolvedEnvVar = aws_cdk_lib_1.Stack.of(node).resolve(envVar);
                const name = nag_rules_1.NagRules.resolveIfPrimitive(node, resolvedEnvVar.name);
                const type = nag_rules_1.NagRules.resolveIfPrimitive(node, resolvedEnvVar.type);
                if (name == 'AWS_ACCESS_KEY_ID' || name == 'AWS_SECRET_ACCESS_KEY') {
                    //is this credential being stored as plaintext?
                    if (type == undefined || type == 'PLAINTEXT') {
                        return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
                    }
                }
            }
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29kZUJ1aWxkUHJvamVjdEVudlZhckF3c0NyZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvY29kZWJ1aWxkL0NvZGVCdWlsZFByb2plY3RFbnZWYXJBd3NDcmVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7OztFQUdFO0FBQ0YsK0JBQTZCO0FBQzdCLDZDQUFpRDtBQUNqRCw2REFBdUQ7QUFDdkQsK0NBQThEO0FBRTlEOzs7R0FHRztBQUNILGtCQUFlLE1BQU0sQ0FBQyxjQUFjLENBQ2xDLENBQUMsSUFBaUIsRUFBcUIsRUFBRTtJQUN2QyxJQUFJLElBQUksWUFBWSwwQkFBVSxFQUFFLENBQUM7UUFDL0IsaUNBQWlDO1FBQ2pDLE1BQU0sV0FBVyxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0QsTUFBTSxlQUFlLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUM1QyxXQUFXLENBQUMsb0JBQW9CLENBQ2pDLENBQUM7UUFDRixJQUFJLGVBQWUsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUNqQyxtRUFBbUU7WUFDbkUsS0FBSyxNQUFNLE1BQU0sSUFBSSxlQUFlLEVBQUUsQ0FBQztnQkFDckMsTUFBTSxjQUFjLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0RCxNQUFNLElBQUksR0FBRyxvQkFBUSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BFLE1BQU0sSUFBSSxHQUFHLG9CQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEUsSUFBSSxJQUFJLElBQUksbUJBQW1CLElBQUksSUFBSSxJQUFJLHVCQUF1QixFQUFFLENBQUM7b0JBQ25FLCtDQUErQztvQkFDL0MsSUFBSSxJQUFJLElBQUksU0FBUyxJQUFJLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQzt3QkFDN0MsT0FBTyw2QkFBaUIsQ0FBQyxhQUFhLENBQUM7b0JBQ3pDLENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyw2QkFBaUIsQ0FBQyxTQUFTLENBQUM7SUFDckMsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLDZCQUFpQixDQUFDLGNBQWMsQ0FBQztJQUMxQyxDQUFDO0FBQ0gsQ0FBQyxFQUNELE1BQU0sRUFDTixFQUFFLEtBQUssRUFBRSxJQUFBLFlBQUssRUFBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FDbEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5Db3B5cmlnaHQgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4qL1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IENmblJlc291cmNlLCBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENmblByb2plY3QgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtY29kZWJ1aWxkJztcbmltcG9ydCB7IE5hZ1J1bGVDb21wbGlhbmNlLCBOYWdSdWxlcyB9IGZyb20gJy4uLy4uL25hZy1ydWxlcyc7XG5cbi8qKlxuICogQ29kZUJ1aWxkIHByb2plY3RzIGRvIG5vdCBzdG9yZSBBV1MgY3JlZGVudGlhbHMgYXMgcGxhaW50ZXh0IGVudmlyb25tZW50IHZhcmlhYmxlc1xuICogQHBhcmFtIG5vZGUgdGhlIENmblJlc291cmNlIHRvIGNoZWNrXG4gKi9cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShcbiAgKG5vZGU6IENmblJlc291cmNlKTogTmFnUnVsZUNvbXBsaWFuY2UgPT4ge1xuICAgIGlmIChub2RlIGluc3RhbmNlb2YgQ2ZuUHJvamVjdCkge1xuICAgICAgLy9DaGVjayBmb3IgdGhlIHByZXNlbmNlIG9mIE9BVVRIXG4gICAgICBjb25zdCBlbnZpcm9ubWVudCA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUobm9kZS5lbnZpcm9ubWVudCk7XG4gICAgICBjb25zdCBlbnZpcm9ubWVudFZhcnMgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKFxuICAgICAgICBlbnZpcm9ubWVudC5lbnZpcm9ubWVudFZhcmlhYmxlc1xuICAgICAgKTtcbiAgICAgIGlmIChlbnZpcm9ubWVudFZhcnMgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vRm9yIGVhY2ggZW52dmFyLCBjaGVjayBpZiBpdHMgYSBzZW5zaXRpdmUgY3JlZGVudGlhbCBiZWluZyBzdG9yZWRcbiAgICAgICAgZm9yIChjb25zdCBlbnZWYXIgb2YgZW52aXJvbm1lbnRWYXJzKSB7XG4gICAgICAgICAgY29uc3QgcmVzb2x2ZWRFbnZWYXIgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKGVudlZhcik7XG4gICAgICAgICAgY29uc3QgbmFtZSA9IE5hZ1J1bGVzLnJlc29sdmVJZlByaW1pdGl2ZShub2RlLCByZXNvbHZlZEVudlZhci5uYW1lKTtcbiAgICAgICAgICBjb25zdCB0eXBlID0gTmFnUnVsZXMucmVzb2x2ZUlmUHJpbWl0aXZlKG5vZGUsIHJlc29sdmVkRW52VmFyLnR5cGUpO1xuICAgICAgICAgIGlmIChuYW1lID09ICdBV1NfQUNDRVNTX0tFWV9JRCcgfHwgbmFtZSA9PSAnQVdTX1NFQ1JFVF9BQ0NFU1NfS0VZJykge1xuICAgICAgICAgICAgLy9pcyB0aGlzIGNyZWRlbnRpYWwgYmVpbmcgc3RvcmVkIGFzIHBsYWludGV4dD9cbiAgICAgICAgICAgIGlmICh0eXBlID09IHVuZGVmaW5lZCB8fCB0eXBlID09ICdQTEFJTlRFWFQnKSB7XG4gICAgICAgICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLkNPTVBMSUFOVDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PVF9BUFBMSUNBQkxFO1xuICAgIH1cbiAgfSxcbiAgJ25hbWUnLFxuICB7IHZhbHVlOiBwYXJzZShfX2ZpbGVuYW1lKS5uYW1lIH1cbik7XG4iXX0=