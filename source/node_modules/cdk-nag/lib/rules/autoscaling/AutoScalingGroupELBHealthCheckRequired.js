"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_autoscaling_1 = require("aws-cdk-lib/aws-autoscaling");
const nag_rules_1 = require("../../nag-rules");
/**
 * Auto Scaling groups which are associated with load balancers utilize ELB health checks
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_autoscaling_1.CfnAutoScalingGroup) {
        const classicLBs = aws_cdk_lib_1.Stack.of(node).resolve(node.loadBalancerNames);
        const otherLBs = aws_cdk_lib_1.Stack.of(node).resolve(node.targetGroupArns);
        if ((otherLBs != undefined && otherLBs.length > 0) ||
            (classicLBs != undefined && classicLBs.length > 0)) {
            const healthCheckType = nag_rules_1.NagRules.resolveIfPrimitive(node, node.healthCheckType);
            if (healthCheckType != undefined) {
                if (healthCheckType != 'ELB') {
                    return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
                }
            }
            else {
                return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
            }
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0b1NjYWxpbmdHcm91cEVMQkhlYWx0aENoZWNrUmVxdWlyZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvYXV0b3NjYWxpbmcvQXV0b1NjYWxpbmdHcm91cEVMQkhlYWx0aENoZWNrUmVxdWlyZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0VBR0U7QUFDRiwrQkFBNkI7QUFDN0IsNkNBQWlEO0FBQ2pELGlFQUFrRTtBQUNsRSwrQ0FBOEQ7QUFDOUQ7OztHQUdHO0FBQ0gsa0JBQWUsTUFBTSxDQUFDLGNBQWMsQ0FDbEMsQ0FBQyxJQUFpQixFQUFxQixFQUFFO0lBQ3ZDLElBQUksSUFBSSxZQUFZLHFDQUFtQixFQUFFLENBQUM7UUFDeEMsTUFBTSxVQUFVLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sUUFBUSxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDOUQsSUFDRSxDQUFDLFFBQVEsSUFBSSxTQUFTLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDOUMsQ0FBQyxVQUFVLElBQUksU0FBUyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQ2xELENBQUM7WUFDRCxNQUFNLGVBQWUsR0FBRyxvQkFBUSxDQUFDLGtCQUFrQixDQUNqRCxJQUFJLEVBQ0osSUFBSSxDQUFDLGVBQWUsQ0FDckIsQ0FBQztZQUNGLElBQUksZUFBZSxJQUFJLFNBQVMsRUFBRSxDQUFDO2dCQUNqQyxJQUFJLGVBQWUsSUFBSSxLQUFLLEVBQUUsQ0FBQztvQkFDN0IsT0FBTyw2QkFBaUIsQ0FBQyxhQUFhLENBQUM7Z0JBQ3pDLENBQUM7WUFDSCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sT0FBTyw2QkFBaUIsQ0FBQyxhQUFhLENBQUM7WUFDekMsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLDZCQUFpQixDQUFDLFNBQVMsQ0FBQztJQUNyQyxDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sNkJBQWlCLENBQUMsY0FBYyxDQUFDO0lBQzFDLENBQUM7QUFDSCxDQUFDLEVBQ0QsTUFBTSxFQUNOLEVBQUUsS0FBSyxFQUFFLElBQUEsWUFBSyxFQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUNsQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbkNvcHlyaWdodCBBbWF6b24uY29tLCBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiovXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ2ZuUmVzb3VyY2UsIFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ2ZuQXV0b1NjYWxpbmdHcm91cCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1hdXRvc2NhbGluZyc7XG5pbXBvcnQgeyBOYWdSdWxlQ29tcGxpYW5jZSwgTmFnUnVsZXMgfSBmcm9tICcuLi8uLi9uYWctcnVsZXMnO1xuLyoqXG4gKiBBdXRvIFNjYWxpbmcgZ3JvdXBzIHdoaWNoIGFyZSBhc3NvY2lhdGVkIHdpdGggbG9hZCBiYWxhbmNlcnMgdXRpbGl6ZSBFTEIgaGVhbHRoIGNoZWNrc1xuICogQHBhcmFtIG5vZGUgdGhlIENmblJlc291cmNlIHRvIGNoZWNrXG4gKi9cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShcbiAgKG5vZGU6IENmblJlc291cmNlKTogTmFnUnVsZUNvbXBsaWFuY2UgPT4ge1xuICAgIGlmIChub2RlIGluc3RhbmNlb2YgQ2ZuQXV0b1NjYWxpbmdHcm91cCkge1xuICAgICAgY29uc3QgY2xhc3NpY0xCcyA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUobm9kZS5sb2FkQmFsYW5jZXJOYW1lcyk7XG4gICAgICBjb25zdCBvdGhlckxCcyA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUobm9kZS50YXJnZXRHcm91cEFybnMpO1xuICAgICAgaWYgKFxuICAgICAgICAob3RoZXJMQnMgIT0gdW5kZWZpbmVkICYmIG90aGVyTEJzLmxlbmd0aCA+IDApIHx8XG4gICAgICAgIChjbGFzc2ljTEJzICE9IHVuZGVmaW5lZCAmJiBjbGFzc2ljTEJzLmxlbmd0aCA+IDApXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgaGVhbHRoQ2hlY2tUeXBlID0gTmFnUnVsZXMucmVzb2x2ZUlmUHJpbWl0aXZlKFxuICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgbm9kZS5oZWFsdGhDaGVja1R5cGVcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGhlYWx0aENoZWNrVHlwZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoaGVhbHRoQ2hlY2tUeXBlICE9ICdFTEInKSB7XG4gICAgICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9OX0NPTVBMSUFOVDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PTl9DT01QTElBTlQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5DT01QTElBTlQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT1RfQVBQTElDQUJMRTtcbiAgICB9XG4gIH0sXG4gICduYW1lJyxcbiAgeyB2YWx1ZTogcGFyc2UoX19maWxlbmFtZSkubmFtZSB9XG4pO1xuIl19