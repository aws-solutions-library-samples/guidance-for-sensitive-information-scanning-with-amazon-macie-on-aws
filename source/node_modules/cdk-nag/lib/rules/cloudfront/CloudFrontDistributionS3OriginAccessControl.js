"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_cloudfront_1 = require("aws-cdk-lib/aws-cloudfront");
const aws_s3_1 = require("aws-cdk-lib/aws-s3");
const nag_rules_1 = require("../../nag-rules");
/**
 * CloudFront distributions use an origin access control for S3 origins
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_cloudfront_1.CfnDistribution) {
        const distributionConfig = aws_cdk_lib_1.Stack.of(node).resolve(node.distributionConfig);
        if (distributionConfig.origins != undefined) {
            const origins = aws_cdk_lib_1.Stack.of(node).resolve(distributionConfig.origins);
            for (const origin of origins) {
                const resolvedOrigin = aws_cdk_lib_1.Stack.of(node).resolve(origin);
                const resolvedDomainName = aws_cdk_lib_1.Stack.of(node).resolve(resolvedOrigin.domainName);
                const originLogicalId = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, resolvedDomainName);
                for (const child of aws_cdk_lib_1.Stack.of(node).node.findAll()) {
                    if (child instanceof aws_s3_1.CfnBucket) {
                        const childLogicalId = nag_rules_1.NagRules.resolveResourceFromIntrinsic(child, child.ref);
                        if (originLogicalId === childLogicalId) {
                            const resolvedAccessControlId = aws_cdk_lib_1.Stack.of(node).resolve(resolvedOrigin.originAccessControlId);
                            const originAccessControlId = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, resolvedAccessControlId);
                            if (originAccessControlId == undefined) {
                                return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
                            }
                            if (originAccessControlId.replace(/\s/g, '').length == 0) {
                                return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
                            }
                        }
                    }
                }
            }
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xvdWRGcm9udERpc3RyaWJ1dGlvblMzT3JpZ2luQWNjZXNzQ29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9jbG91ZGZyb250L0Nsb3VkRnJvbnREaXN0cmlidXRpb25TM09yaWdpbkFjY2Vzc0NvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0VBR0U7QUFDRiwrQkFBNkI7QUFDN0IsNkNBQWlEO0FBQ2pELCtEQUE2RDtBQUM3RCwrQ0FBK0M7QUFDL0MsK0NBQThEO0FBRTlEOzs7R0FHRztBQUNILGtCQUFlLE1BQU0sQ0FBQyxjQUFjLENBQ2xDLENBQUMsSUFBaUIsRUFBcUIsRUFBRTtJQUN2QyxJQUFJLElBQUksWUFBWSxnQ0FBZSxFQUFFLENBQUM7UUFDcEMsTUFBTSxrQkFBa0IsR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQy9DLElBQUksQ0FBQyxrQkFBa0IsQ0FDeEIsQ0FBQztRQUNGLElBQUksa0JBQWtCLENBQUMsT0FBTyxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQzVDLE1BQU0sT0FBTyxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNuRSxLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRSxDQUFDO2dCQUM3QixNQUFNLGNBQWMsR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RELE1BQU0sa0JBQWtCLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUMvQyxjQUFjLENBQUMsVUFBVSxDQUMxQixDQUFDO2dCQUNGLE1BQU0sZUFBZSxHQUFHLG9CQUFRLENBQUMsNEJBQTRCLENBQzNELElBQUksRUFDSixrQkFBa0IsQ0FDbkIsQ0FBQztnQkFDRixLQUFLLE1BQU0sS0FBSyxJQUFJLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO29CQUNsRCxJQUFJLEtBQUssWUFBWSxrQkFBUyxFQUFFLENBQUM7d0JBQy9CLE1BQU0sY0FBYyxHQUFHLG9CQUFRLENBQUMsNEJBQTRCLENBQzFELEtBQUssRUFDTCxLQUFLLENBQUMsR0FBRyxDQUNWLENBQUM7d0JBQ0YsSUFBSSxlQUFlLEtBQUssY0FBYyxFQUFFLENBQUM7NEJBQ3ZDLE1BQU0sdUJBQXVCLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUNwRCxjQUFjLENBQUMscUJBQXFCLENBQ3JDLENBQUM7NEJBQ0YsTUFBTSxxQkFBcUIsR0FDekIsb0JBQVEsQ0FBQyw0QkFBNEIsQ0FDbkMsSUFBSSxFQUNKLHVCQUF1QixDQUN4QixDQUFDOzRCQUNKLElBQUkscUJBQXFCLElBQUksU0FBUyxFQUFFLENBQUM7Z0NBQ3ZDLE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDOzRCQUN6QyxDQUFDOzRCQUNELElBQUkscUJBQXFCLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUM7Z0NBQ3pELE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDOzRCQUN6QyxDQUFDO3dCQUNILENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLDZCQUFpQixDQUFDLFNBQVMsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsT0FBTyw2QkFBaUIsQ0FBQyxjQUFjLENBQUM7QUFDMUMsQ0FBQyxFQUNELE1BQU0sRUFDTixFQUFFLEtBQUssRUFBRSxJQUFBLFlBQUssRUFBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FDbEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5Db3B5cmlnaHQgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4qL1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IENmblJlc291cmNlLCBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENmbkRpc3RyaWJ1dGlvbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1jbG91ZGZyb250JztcbmltcG9ydCB7IENmbkJ1Y2tldCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1zMyc7XG5pbXBvcnQgeyBOYWdSdWxlQ29tcGxpYW5jZSwgTmFnUnVsZXMgfSBmcm9tICcuLi8uLi9uYWctcnVsZXMnO1xuXG4vKipcbiAqIENsb3VkRnJvbnQgZGlzdHJpYnV0aW9ucyB1c2UgYW4gb3JpZ2luIGFjY2VzcyBjb250cm9sIGZvciBTMyBvcmlnaW5zXG4gKiBAcGFyYW0gbm9kZSB0aGUgQ2ZuUmVzb3VyY2UgdG8gY2hlY2tcbiAqL1xuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmRlZmluZVByb3BlcnR5KFxuICAobm9kZTogQ2ZuUmVzb3VyY2UpOiBOYWdSdWxlQ29tcGxpYW5jZSA9PiB7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBDZm5EaXN0cmlidXRpb24pIHtcbiAgICAgIGNvbnN0IGRpc3RyaWJ1dGlvbkNvbmZpZyA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUoXG4gICAgICAgIG5vZGUuZGlzdHJpYnV0aW9uQ29uZmlnXG4gICAgICApO1xuICAgICAgaWYgKGRpc3RyaWJ1dGlvbkNvbmZpZy5vcmlnaW5zICE9IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBvcmlnaW5zID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShkaXN0cmlidXRpb25Db25maWcub3JpZ2lucyk7XG4gICAgICAgIGZvciAoY29uc3Qgb3JpZ2luIG9mIG9yaWdpbnMpIHtcbiAgICAgICAgICBjb25zdCByZXNvbHZlZE9yaWdpbiA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUob3JpZ2luKTtcbiAgICAgICAgICBjb25zdCByZXNvbHZlZERvbWFpbk5hbWUgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKFxuICAgICAgICAgICAgcmVzb2x2ZWRPcmlnaW4uZG9tYWluTmFtZVxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3Qgb3JpZ2luTG9naWNhbElkID0gTmFnUnVsZXMucmVzb2x2ZVJlc291cmNlRnJvbUludHJpbnNpYyhcbiAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICByZXNvbHZlZERvbWFpbk5hbWVcbiAgICAgICAgICApO1xuICAgICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgU3RhY2sub2Yobm9kZSkubm9kZS5maW5kQWxsKCkpIHtcbiAgICAgICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIENmbkJ1Y2tldCkge1xuICAgICAgICAgICAgICBjb25zdCBjaGlsZExvZ2ljYWxJZCA9IE5hZ1J1bGVzLnJlc29sdmVSZXNvdXJjZUZyb21JbnRyaW5zaWMoXG4gICAgICAgICAgICAgICAgY2hpbGQsXG4gICAgICAgICAgICAgICAgY2hpbGQucmVmXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmIChvcmlnaW5Mb2dpY2FsSWQgPT09IGNoaWxkTG9naWNhbElkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWRBY2Nlc3NDb250cm9sSWQgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKFxuICAgICAgICAgICAgICAgICAgcmVzb2x2ZWRPcmlnaW4ub3JpZ2luQWNjZXNzQ29udHJvbElkXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5BY2Nlc3NDb250cm9sSWQgPVxuICAgICAgICAgICAgICAgICAgTmFnUnVsZXMucmVzb2x2ZVJlc291cmNlRnJvbUludHJpbnNpYyhcbiAgICAgICAgICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZWRBY2Nlc3NDb250cm9sSWRcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaWYgKG9yaWdpbkFjY2Vzc0NvbnRyb2xJZCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAob3JpZ2luQWNjZXNzQ29udHJvbElkLnJlcGxhY2UoL1xccy9nLCAnJykubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLkNPTVBMSUFOVDtcbiAgICB9XG4gICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PVF9BUFBMSUNBQkxFO1xuICB9LFxuICAnbmFtZScsXG4gIHsgdmFsdWU6IHBhcnNlKF9fZmlsZW5hbWUpLm5hbWUgfVxuKTtcbiJdfQ==