"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
const nag_rules_1 = require("../../nag-rules");
/**
 * IAM policies do not grant admin access, meaning the policy allows a principal to perform all actions on all resources
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_iam_1.CfnPolicy || node instanceof aws_iam_1.CfnManagedPolicy) {
        if (checkDocument(node, node.policyDocument)) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else if (node instanceof aws_iam_1.CfnGroup || node instanceof aws_iam_1.CfnRole) {
        if (node.policies != undefined && checkDocument(node, node.policies)) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
/**
 * Helper function for parsing through the policy document
 * @param node the CfnResource to Check
 * @param policyDoc the JSON policy document
 * @returns boolean
 */
function checkDocument(node, policyDoc) {
    const resolvedDoc = aws_cdk_lib_1.Stack.of(node).resolve(policyDoc);
    const reg = /"Action":\[?(.*,)?"\*"(,.*)?\]?,"Effect":"Allow","Resource":\[?(.*,)?"(?:arn(?::.*(?::)?)?)?\*"(,.*)?\]?/gm;
    if (JSON.stringify(resolvedDoc).search(reg) != -1) {
        return true;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSUFNUG9saWN5Tm9TdGF0ZW1lbnRzV2l0aEFkbWluQWNjZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3J1bGVzL2lhbS9JQU1Qb2xpY3lOb1N0YXRlbWVudHNXaXRoQWRtaW5BY2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0VBR0U7QUFDRiwrQkFBNkI7QUFDN0IsNkNBQWlEO0FBQ2pELGlEQU02QjtBQUM3QiwrQ0FBb0Q7QUFFcEQ7OztHQUdHO0FBQ0gsa0JBQWUsTUFBTSxDQUFDLGNBQWMsQ0FDbEMsQ0FBQyxJQUFpQixFQUFxQixFQUFFO0lBQ3ZDLElBQUksSUFBSSxZQUFZLG1CQUFTLElBQUksSUFBSSxZQUFZLDBCQUFnQixFQUFFLENBQUM7UUFDbEUsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDO1lBQzdDLE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDO1FBQ3pDLENBQUM7UUFDRCxPQUFPLDZCQUFpQixDQUFDLFNBQVMsQ0FBQztJQUNyQyxDQUFDO1NBQU0sSUFBSSxJQUFJLFlBQVksa0JBQVEsSUFBSSxJQUFJLFlBQVksaUJBQU8sRUFBRSxDQUFDO1FBQy9ELElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxTQUFTLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztZQUNyRSxPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsT0FBTyw2QkFBaUIsQ0FBQyxTQUFTLENBQUM7SUFDckMsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLDZCQUFpQixDQUFDLGNBQWMsQ0FBQztJQUMxQyxDQUFDO0FBQ0gsQ0FBQyxFQUNELE1BQU0sRUFDTixFQUFFLEtBQUssRUFBRSxJQUFBLFlBQUssRUFBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FDbEMsQ0FBQztBQUVGOzs7OztHQUtHO0FBQ0gsU0FBUyxhQUFhLENBQUMsSUFBaUIsRUFBRSxTQUFjO0lBQ3RELE1BQU0sV0FBVyxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQW1CLENBQUM7SUFDeEUsTUFBTSxHQUFHLEdBQ1AsNEdBQTRHLENBQUM7SUFDL0csSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2xELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5Db3B5cmlnaHQgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4qL1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IENmblJlc291cmNlLCBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7XG4gIENmblBvbGljeSxcbiAgQ2ZuTWFuYWdlZFBvbGljeSxcbiAgUG9saWN5RG9jdW1lbnQsXG4gIENmbkdyb3VwLFxuICBDZm5Sb2xlLFxufSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcbmltcG9ydCB7IE5hZ1J1bGVDb21wbGlhbmNlIH0gZnJvbSAnLi4vLi4vbmFnLXJ1bGVzJztcblxuLyoqXG4gKiBJQU0gcG9saWNpZXMgZG8gbm90IGdyYW50IGFkbWluIGFjY2VzcywgbWVhbmluZyB0aGUgcG9saWN5IGFsbG93cyBhIHByaW5jaXBhbCB0byBwZXJmb3JtIGFsbCBhY3Rpb25zIG9uIGFsbCByZXNvdXJjZXNcbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5SZXNvdXJjZSB0byBjaGVja1xuICovXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIChub2RlOiBDZm5SZXNvdXJjZSk6IE5hZ1J1bGVDb21wbGlhbmNlID0+IHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENmblBvbGljeSB8fCBub2RlIGluc3RhbmNlb2YgQ2ZuTWFuYWdlZFBvbGljeSkge1xuICAgICAgaWYgKGNoZWNrRG9jdW1lbnQobm9kZSwgbm9kZS5wb2xpY3lEb2N1bWVudCkpIHtcbiAgICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PTl9DT01QTElBTlQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuQ09NUExJQU5UO1xuICAgIH0gZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIENmbkdyb3VwIHx8IG5vZGUgaW5zdGFuY2VvZiBDZm5Sb2xlKSB7XG4gICAgICBpZiAobm9kZS5wb2xpY2llcyAhPSB1bmRlZmluZWQgJiYgY2hlY2tEb2N1bWVudChub2RlLCBub2RlLnBvbGljaWVzKSkge1xuICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9OX0NPTVBMSUFOVDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5DT01QTElBTlQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT1RfQVBQTElDQUJMRTtcbiAgICB9XG4gIH0sXG4gICduYW1lJyxcbiAgeyB2YWx1ZTogcGFyc2UoX19maWxlbmFtZSkubmFtZSB9XG4pO1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiBmb3IgcGFyc2luZyB0aHJvdWdoIHRoZSBwb2xpY3kgZG9jdW1lbnRcbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5SZXNvdXJjZSB0byBDaGVja1xuICogQHBhcmFtIHBvbGljeURvYyB0aGUgSlNPTiBwb2xpY3kgZG9jdW1lbnRcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuZnVuY3Rpb24gY2hlY2tEb2N1bWVudChub2RlOiBDZm5SZXNvdXJjZSwgcG9saWN5RG9jOiBhbnkpOiBib29sZWFuIHtcbiAgY29uc3QgcmVzb2x2ZWREb2MgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKHBvbGljeURvYykgYXMgUG9saWN5RG9jdW1lbnQ7XG4gIGNvbnN0IHJlZyA9XG4gICAgL1wiQWN0aW9uXCI6XFxbPyguKiwpP1wiXFwqXCIoLC4qKT9cXF0/LFwiRWZmZWN0XCI6XCJBbGxvd1wiLFwiUmVzb3VyY2VcIjpcXFs/KC4qLCk/XCIoPzphcm4oPzo6LiooPzo6KT8pPyk/XFwqXCIoLC4qKT9cXF0/L2dtO1xuICBpZiAoSlNPTi5zdHJpbmdpZnkocmVzb2x2ZWREb2MpLnNlYXJjaChyZWcpICE9IC0xKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuIl19