"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const nag_rules_1 = require("../../nag-rules");
/**
 * Lambda functions are VPC enabled
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_lambda_1.CfnFunction) {
        const vpcConfig = aws_cdk_lib_1.Stack.of(node).resolve(node.vpcConfig);
        if (vpcConfig == undefined) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        else {
            const secgroups = aws_cdk_lib_1.Stack.of(node).resolve(vpcConfig.securityGroupIds);
            const subnets = aws_cdk_lib_1.Stack.of(node).resolve(vpcConfig.subnetIds);
            if (secgroups == undefined || secgroups.length == 0) {
                if (subnets == undefined || subnets.length == 0) {
                    return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
                }
            }
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFtYmRhSW5zaWRlVlBDLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3J1bGVzL2xhbWJkYS9MYW1iZGFJbnNpZGVWUEMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0VBR0U7QUFDRiwrQkFBNkI7QUFDN0IsNkNBQWlEO0FBQ2pELHVEQUFxRDtBQUNyRCwrQ0FBb0Q7QUFFcEQ7OztHQUdHO0FBQ0gsa0JBQWUsTUFBTSxDQUFDLGNBQWMsQ0FDbEMsQ0FBQyxJQUFpQixFQUFxQixFQUFFO0lBQ3ZDLElBQUksSUFBSSxZQUFZLHdCQUFXLEVBQUUsQ0FBQztRQUNoQyxNQUFNLFNBQVMsR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pELElBQUksU0FBUyxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQzNCLE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDO1FBQ3pDLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxTQUFTLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3JFLE1BQU0sT0FBTyxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUQsSUFBSSxTQUFTLElBQUksU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ3BELElBQUksT0FBTyxJQUFJLFNBQVMsSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUNoRCxPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztnQkFDekMsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyw2QkFBaUIsQ0FBQyxTQUFTLENBQUM7SUFDckMsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLDZCQUFpQixDQUFDLGNBQWMsQ0FBQztJQUMxQyxDQUFDO0FBQ0gsQ0FBQyxFQUNELE1BQU0sRUFDTixFQUFFLEtBQUssRUFBRSxJQUFBLFlBQUssRUFBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FDbEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5Db3B5cmlnaHQgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4qL1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IENmblJlc291cmNlLCBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENmbkZ1bmN0aW9uIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSc7XG5pbXBvcnQgeyBOYWdSdWxlQ29tcGxpYW5jZSB9IGZyb20gJy4uLy4uL25hZy1ydWxlcyc7XG5cbi8qKlxuICogTGFtYmRhIGZ1bmN0aW9ucyBhcmUgVlBDIGVuYWJsZWRcbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5SZXNvdXJjZSB0byBjaGVja1xuICovXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIChub2RlOiBDZm5SZXNvdXJjZSk6IE5hZ1J1bGVDb21wbGlhbmNlID0+IHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENmbkZ1bmN0aW9uKSB7XG4gICAgICBjb25zdCB2cGNDb25maWcgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKG5vZGUudnBjQ29uZmlnKTtcbiAgICAgIGlmICh2cGNDb25maWcgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgc2VjZ3JvdXBzID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZSh2cGNDb25maWcuc2VjdXJpdHlHcm91cElkcyk7XG4gICAgICAgIGNvbnN0IHN1Ym5ldHMgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKHZwY0NvbmZpZy5zdWJuZXRJZHMpO1xuICAgICAgICBpZiAoc2VjZ3JvdXBzID09IHVuZGVmaW5lZCB8fCBzZWNncm91cHMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICBpZiAoc3VibmV0cyA9PSB1bmRlZmluZWQgfHwgc3VibmV0cy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PTl9DT01QTElBTlQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuQ09NUExJQU5UO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9UX0FQUExJQ0FCTEU7XG4gICAgfVxuICB9LFxuICAnbmFtZScsXG4gIHsgdmFsdWU6IHBhcnNlKF9fZmlsZW5hbWUpLm5hbWUgfVxuKTtcbiJdfQ==