"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_ec2_1 = require("aws-cdk-lib/aws-ec2");
const nag_rules_1 = require("../../nag-rules");
/**
 * VPCs have Flow Logs enabled
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_ec2_1.CfnVPC) {
        const vpcLogicalId = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, node.ref);
        let found = false;
        for (const child of aws_cdk_lib_1.Stack.of(node).node.findAll()) {
            if (child instanceof aws_ec2_1.CfnFlowLog) {
                if (isMatchingCompliantFlowLog(child, vpcLogicalId)) {
                    found = true;
                    break;
                }
            }
        }
        if (!found) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
/**
 * Helper function to check whether a given Flow Log is compliant and associated with the given VPC
 * @param node the CfnFlowLog to check
 * returns whether the CfnFlowLog is compliant
 */
function isMatchingCompliantFlowLog(node, vpcLogicalId) {
    const resourceLogicalId = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, node.resourceId);
    if (node.resourceType === 'VPC' && resourceLogicalId === vpcLogicalId) {
        return true;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlBDRmxvd0xvZ3NFbmFibGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3J1bGVzL3ZwYy9WUENGbG93TG9nc0VuYWJsZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0VBR0U7QUFDRiwrQkFBNkI7QUFDN0IsNkNBQWlEO0FBQ2pELGlEQUF5RDtBQUN6RCwrQ0FBOEQ7QUFFOUQ7OztHQUdHO0FBQ0gsa0JBQWUsTUFBTSxDQUFDLGNBQWMsQ0FDbEMsQ0FBQyxJQUFpQixFQUFxQixFQUFFO0lBQ3ZDLElBQUksSUFBSSxZQUFZLGdCQUFNLEVBQUUsQ0FBQztRQUMzQixNQUFNLFlBQVksR0FBRyxvQkFBUSxDQUFDLDRCQUE0QixDQUN4RCxJQUFJLEVBQ0osSUFBSSxDQUFDLEdBQUcsQ0FDVCxDQUFDO1FBQ0YsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLEtBQUssTUFBTSxLQUFLLElBQUksbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7WUFDbEQsSUFBSSxLQUFLLFlBQVksb0JBQVUsRUFBRSxDQUFDO2dCQUNoQyxJQUFJLDBCQUEwQixDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsRUFBRSxDQUFDO29CQUNwRCxLQUFLLEdBQUcsSUFBSSxDQUFDO29CQUNiLE1BQU07Z0JBQ1IsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ1gsT0FBTyw2QkFBaUIsQ0FBQyxhQUFhLENBQUM7UUFDekMsQ0FBQztRQUNELE9BQU8sNkJBQWlCLENBQUMsU0FBUyxDQUFDO0lBQ3JDLENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTyw2QkFBaUIsQ0FBQyxjQUFjLENBQUM7SUFDMUMsQ0FBQztBQUNILENBQUMsRUFDRCxNQUFNLEVBQ04sRUFBRSxLQUFLLEVBQUUsSUFBQSxZQUFLLEVBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQ2xDLENBQUM7QUFFRjs7OztHQUlHO0FBQ0gsU0FBUywwQkFBMEIsQ0FDakMsSUFBZ0IsRUFDaEIsWUFBb0I7SUFFcEIsTUFBTSxpQkFBaUIsR0FBRyxvQkFBUSxDQUFDLDRCQUE0QixDQUM3RCxJQUFJLEVBQ0osSUFBSSxDQUFDLFVBQVUsQ0FDaEIsQ0FBQztJQUNGLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxLQUFLLElBQUksaUJBQWlCLEtBQUssWUFBWSxFQUFFLENBQUM7UUFDdEUsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbkNvcHlyaWdodCBBbWF6b24uY29tLCBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiovXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ2ZuUmVzb3VyY2UsIFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ2ZuVlBDLCBDZm5GbG93TG9nIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWVjMic7XG5pbXBvcnQgeyBOYWdSdWxlQ29tcGxpYW5jZSwgTmFnUnVsZXMgfSBmcm9tICcuLi8uLi9uYWctcnVsZXMnO1xuXG4vKipcbiAqIFZQQ3MgaGF2ZSBGbG93IExvZ3MgZW5hYmxlZFxuICogQHBhcmFtIG5vZGUgdGhlIENmblJlc291cmNlIHRvIGNoZWNrXG4gKi9cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShcbiAgKG5vZGU6IENmblJlc291cmNlKTogTmFnUnVsZUNvbXBsaWFuY2UgPT4ge1xuICAgIGlmIChub2RlIGluc3RhbmNlb2YgQ2ZuVlBDKSB7XG4gICAgICBjb25zdCB2cGNMb2dpY2FsSWQgPSBOYWdSdWxlcy5yZXNvbHZlUmVzb3VyY2VGcm9tSW50cmluc2ljKFxuICAgICAgICBub2RlLFxuICAgICAgICBub2RlLnJlZlxuICAgICAgKTtcbiAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBTdGFjay5vZihub2RlKS5ub2RlLmZpbmRBbGwoKSkge1xuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBDZm5GbG93TG9nKSB7XG4gICAgICAgICAgaWYgKGlzTWF0Y2hpbmdDb21wbGlhbnRGbG93TG9nKGNoaWxkLCB2cGNMb2dpY2FsSWQpKSB7XG4gICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PTl9DT01QTElBTlQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuQ09NUExJQU5UO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9UX0FQUExJQ0FCTEU7XG4gICAgfVxuICB9LFxuICAnbmFtZScsXG4gIHsgdmFsdWU6IHBhcnNlKF9fZmlsZW5hbWUpLm5hbWUgfVxuKTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY2hlY2sgd2hldGhlciBhIGdpdmVuIEZsb3cgTG9nIGlzIGNvbXBsaWFudCBhbmQgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBWUENcbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5GbG93TG9nIHRvIGNoZWNrXG4gKiByZXR1cm5zIHdoZXRoZXIgdGhlIENmbkZsb3dMb2cgaXMgY29tcGxpYW50XG4gKi9cbmZ1bmN0aW9uIGlzTWF0Y2hpbmdDb21wbGlhbnRGbG93TG9nKFxuICBub2RlOiBDZm5GbG93TG9nLFxuICB2cGNMb2dpY2FsSWQ6IHN0cmluZ1xuKTogYm9vbGVhbiB7XG4gIGNvbnN0IHJlc291cmNlTG9naWNhbElkID0gTmFnUnVsZXMucmVzb2x2ZVJlc291cmNlRnJvbUludHJpbnNpYyhcbiAgICBub2RlLFxuICAgIG5vZGUucmVzb3VyY2VJZFxuICApO1xuICBpZiAobm9kZS5yZXNvdXJjZVR5cGUgPT09ICdWUEMnICYmIHJlc291cmNlTG9naWNhbElkID09PSB2cGNMb2dpY2FsSWQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4iXX0=