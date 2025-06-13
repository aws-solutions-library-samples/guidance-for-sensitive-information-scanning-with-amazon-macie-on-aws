"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_ec2_1 = require("aws-cdk-lib/aws-ec2");
const nag_rules_1 = require("../../nag-rules");
/**
 * VPCs have their default security group closed
 * VPCs created via CloudFormation will not have their default security group closed.
 * The L2 VPC Construct provides a way to remmediate this via a custom resource.
 * @see https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html#DefaultSecurityGroup
 * @see https://github.com/aws/aws-cdk/pull/25297
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_ec2_1.CfnVPC) {
        const parent = node.node.scope;
        if (parent) {
            const restrictSgCR = parent.node.tryFindChild('RestrictDefaultSecurityGroupCustomResource');
            if (restrictSgCR &&
                restrictSgCR.node.defaultChild.cfnResourceType ==
                    'Custom::VpcRestrictDefaultSG') {
                return nag_rules_1.NagRuleCompliance.COMPLIANT;
            }
            else {
                return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
            }
        }
        else {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlBDRGVmYXVsdFNlY3VyaXR5R3JvdXBDbG9zZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvdnBjL1ZQQ0RlZmF1bHRTZWN1cml0eUdyb3VwQ2xvc2VkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7OztFQUdFO0FBQ0YsK0JBQTZCO0FBRTdCLGlEQUE2QztBQUM3QywrQ0FBb0Q7QUFFcEQ7Ozs7Ozs7R0FPRztBQUNILGtCQUFlLE1BQU0sQ0FBQyxjQUFjLENBQ2xDLENBQUMsSUFBaUIsRUFBcUIsRUFBRTtJQUN2QyxJQUFJLElBQUksWUFBWSxnQkFBTSxFQUFFLENBQUM7UUFDM0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDL0IsSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUNYLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUMzQyw0Q0FBNEMsQ0FDM0IsQ0FBQztZQUNwQixJQUNFLFlBQVk7Z0JBQ1gsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUE0QixDQUFDLGVBQWU7b0JBQzdELDhCQUE4QixFQUNoQyxDQUFDO2dCQUNELE9BQU8sNkJBQWlCLENBQUMsU0FBUyxDQUFDO1lBQ3JDLENBQUM7aUJBQU0sQ0FBQztnQkFDTixPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztZQUN6QyxDQUFDO1FBQ0gsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztRQUN6QyxDQUFDO0lBQ0gsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLDZCQUFpQixDQUFDLGNBQWMsQ0FBQztJQUMxQyxDQUFDO0FBQ0gsQ0FBQyxFQUNELE1BQU0sRUFDTixFQUFFLEtBQUssRUFBRSxJQUFBLFlBQUssRUFBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FDbEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5Db3B5cmlnaHQgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4qL1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IENmblJlc291cmNlLCBDdXN0b21SZXNvdXJjZSB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENmblZQQyB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1lYzInO1xuaW1wb3J0IHsgTmFnUnVsZUNvbXBsaWFuY2UgfSBmcm9tICcuLi8uLi9uYWctcnVsZXMnO1xuXG4vKipcbiAqIFZQQ3MgaGF2ZSB0aGVpciBkZWZhdWx0IHNlY3VyaXR5IGdyb3VwIGNsb3NlZFxuICogVlBDcyBjcmVhdGVkIHZpYSBDbG91ZEZvcm1hdGlvbiB3aWxsIG5vdCBoYXZlIHRoZWlyIGRlZmF1bHQgc2VjdXJpdHkgZ3JvdXAgY2xvc2VkLlxuICogVGhlIEwyIFZQQyBDb25zdHJ1Y3QgcHJvdmlkZXMgYSB3YXkgdG8gcmVtbWVkaWF0ZSB0aGlzIHZpYSBhIGN1c3RvbSByZXNvdXJjZS5cbiAqIEBzZWUgaHR0cHM6Ly9kb2NzLmF3cy5hbWF6b24uY29tL3ZwYy9sYXRlc3QvdXNlcmd1aWRlL1ZQQ19TZWN1cml0eUdyb3Vwcy5odG1sI0RlZmF1bHRTZWN1cml0eUdyb3VwXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hd3MvYXdzLWNkay9wdWxsLzI1Mjk3XG4gKiBAcGFyYW0gbm9kZSB0aGUgQ2ZuUmVzb3VyY2UgdG8gY2hlY2tcbiAqL1xuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmRlZmluZVByb3BlcnR5KFxuICAobm9kZTogQ2ZuUmVzb3VyY2UpOiBOYWdSdWxlQ29tcGxpYW5jZSA9PiB7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBDZm5WUEMpIHtcbiAgICAgIGNvbnN0IHBhcmVudCA9IG5vZGUubm9kZS5zY29wZTtcbiAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgY29uc3QgcmVzdHJpY3RTZ0NSID0gcGFyZW50Lm5vZGUudHJ5RmluZENoaWxkKFxuICAgICAgICAgICdSZXN0cmljdERlZmF1bHRTZWN1cml0eUdyb3VwQ3VzdG9tUmVzb3VyY2UnXG4gICAgICAgICkgYXMgQ3VzdG9tUmVzb3VyY2U7XG4gICAgICAgIGlmIChcbiAgICAgICAgICByZXN0cmljdFNnQ1IgJiZcbiAgICAgICAgICAocmVzdHJpY3RTZ0NSLm5vZGUuZGVmYXVsdENoaWxkIGFzIENmblJlc291cmNlKS5jZm5SZXNvdXJjZVR5cGUgPT1cbiAgICAgICAgICAgICdDdXN0b206OlZwY1Jlc3RyaWN0RGVmYXVsdFNHJ1xuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuQ09NUExJQU5UO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9OX0NPTVBMSUFOVDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PVF9BUFBMSUNBQkxFO1xuICAgIH1cbiAgfSxcbiAgJ25hbWUnLFxuICB7IHZhbHVlOiBwYXJzZShfX2ZpbGVuYW1lKS5uYW1lIH1cbik7XG4iXX0=