"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_rds_1 = require("aws-cdk-lib/aws-rds");
const nag_rules_1 = require("../../nag-rules");
/**
 * RDS Aurora MySQL/PostgresSQL clusters have IAM Database Authentication enabled
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_rds_1.CfnDBCluster) {
        if (!node.engine)
            return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
        if (node.engine.toLowerCase().includes('aurora')) {
            if (node.enableIamDatabaseAuthentication == undefined) {
                return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
            }
            const iamAuth = nag_rules_1.NagRules.resolveIfPrimitive(node, node.enableIamDatabaseAuthentication);
            if (iamAuth == false) {
                return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
            }
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXVyb3JhTXlTUUxQb3N0Z3Jlc0lBTUF1dGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvcmRzL0F1cm9yYU15U1FMUG9zdGdyZXNJQU1BdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7OztFQUdFO0FBQ0YsK0JBQTZCO0FBRTdCLGlEQUFtRDtBQUNuRCwrQ0FBOEQ7QUFFOUQ7OztHQUdHO0FBQ0gsa0JBQWUsTUFBTSxDQUFDLGNBQWMsQ0FDbEMsQ0FBQyxJQUFpQixFQUFxQixFQUFFO0lBQ3ZDLElBQUksSUFBSSxZQUFZLHNCQUFZLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07WUFBRSxPQUFPLDZCQUFpQixDQUFDLGNBQWMsQ0FBQztRQUMxRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7WUFDakQsSUFBSSxJQUFJLENBQUMsK0JBQStCLElBQUksU0FBUyxFQUFFLENBQUM7Z0JBQ3RELE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDO1lBQ3pDLENBQUM7WUFDRCxNQUFNLE9BQU8sR0FBRyxvQkFBUSxDQUFDLGtCQUFrQixDQUN6QyxJQUFJLEVBQ0osSUFBSSxDQUFDLCtCQUErQixDQUNyQyxDQUFDO1lBQ0YsSUFBSSxPQUFPLElBQUksS0FBSyxFQUFFLENBQUM7Z0JBQ3JCLE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDO1lBQ3pDLENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyw2QkFBaUIsQ0FBQyxTQUFTLENBQUM7SUFDckMsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLDZCQUFpQixDQUFDLGNBQWMsQ0FBQztJQUMxQyxDQUFDO0FBQ0gsQ0FBQyxFQUNELE1BQU0sRUFDTixFQUFFLEtBQUssRUFBRSxJQUFBLFlBQUssRUFBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FDbEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5Db3B5cmlnaHQgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4qL1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IENmblJlc291cmNlIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ2ZuREJDbHVzdGVyIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLXJkcyc7XG5pbXBvcnQgeyBOYWdSdWxlQ29tcGxpYW5jZSwgTmFnUnVsZXMgfSBmcm9tICcuLi8uLi9uYWctcnVsZXMnO1xuXG4vKipcbiAqIFJEUyBBdXJvcmEgTXlTUUwvUG9zdGdyZXNTUUwgY2x1c3RlcnMgaGF2ZSBJQU0gRGF0YWJhc2UgQXV0aGVudGljYXRpb24gZW5hYmxlZFxuICogQHBhcmFtIG5vZGUgdGhlIENmblJlc291cmNlIHRvIGNoZWNrXG4gKi9cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShcbiAgKG5vZGU6IENmblJlc291cmNlKTogTmFnUnVsZUNvbXBsaWFuY2UgPT4ge1xuICAgIGlmIChub2RlIGluc3RhbmNlb2YgQ2ZuREJDbHVzdGVyKSB7XG4gICAgICBpZiAoIW5vZGUuZW5naW5lKSByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9UX0FQUExJQ0FCTEU7XG4gICAgICBpZiAobm9kZS5lbmdpbmUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnYXVyb3JhJykpIHtcbiAgICAgICAgaWYgKG5vZGUuZW5hYmxlSWFtRGF0YWJhc2VBdXRoZW50aWNhdGlvbiA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9OX0NPTVBMSUFOVDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpYW1BdXRoID0gTmFnUnVsZXMucmVzb2x2ZUlmUHJpbWl0aXZlKFxuICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgbm9kZS5lbmFibGVJYW1EYXRhYmFzZUF1dGhlbnRpY2F0aW9uXG4gICAgICAgICk7XG4gICAgICAgIGlmIChpYW1BdXRoID09IGZhbHNlKSB7XG4gICAgICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PTl9DT01QTElBTlQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5DT01QTElBTlQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT1RfQVBQTElDQUJMRTtcbiAgICB9XG4gIH0sXG4gICduYW1lJyxcbiAgeyB2YWx1ZTogcGFyc2UoX19maWxlbmFtZSkubmFtZSB9XG4pO1xuIl19