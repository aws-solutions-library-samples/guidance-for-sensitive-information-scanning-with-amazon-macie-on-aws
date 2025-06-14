"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_mediastore_1 = require("aws-cdk-lib/aws-mediastore");
const nag_rules_1 = require("../../nag-rules");
/**
 * Media Store containers require requests to use SSL
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_mediastore_1.CfnContainer) {
        const policy = aws_cdk_lib_1.Stack.of(node).resolve(node.policy);
        if (policy === undefined) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        const parsedPolicy = JSON.parse(policy);
        let found = false;
        for (const statement of parsedPolicy?.Statement) {
            const resolvedStatement = aws_cdk_lib_1.Stack.of(node).resolve(statement);
            const secureTransport = resolvedStatement?.Condition?.Bool?.['aws:SecureTransport'];
            if (resolvedStatement.Effect === 'Deny' &&
                checkMatchingAction(resolvedStatement.Action) === true &&
                checkMatchingPrincipal(resolvedStatement.Principal) === true &&
                (secureTransport === 'false' || secureTransport === false)) {
                found = true;
                break;
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
 * Helper function to check whether the Bucket Policy applies to all actions
 * @param node The policy statement to check
 * @param actions The action in the bucket policy
 * @returns Whether the policy statement applies to all actions
 */
function checkMatchingAction(actions) {
    if (Array.isArray(actions)) {
        for (const action of actions) {
            if (action === '*' || action.toLowerCase() === 'mediastore:*') {
                return true;
            }
        }
    }
    else if (actions === '*' || actions.toLowerCase() === 'mediastore:*') {
        return true;
    }
    return false;
}
/**
 * Helper function to check whether the Bucket Policy applies to all principals
 * @param node The policy statement to check
 * @param principal The principals in the bucket policy
 * @returns Whether the policy statement applies to all principals
 */
function checkMatchingPrincipal(principals) {
    if (principals === '*') {
        return true;
    }
    const awsPrincipal = principals.AWS;
    if (Array.isArray(awsPrincipal)) {
        for (const account of awsPrincipal) {
            if (account === '*') {
                return true;
            }
        }
    }
    else if (awsPrincipal === '*') {
        return true;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVkaWFTdG9yZUNvbnRhaW5lclNTTFJlcXVlc3RzT25seS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9tZWRpYXN0b3JlL01lZGlhU3RvcmVDb250YWluZXJTU0xSZXF1ZXN0c09ubHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0VBR0U7QUFDRiwrQkFBNkI7QUFDN0IsNkNBQWlEO0FBQ2pELCtEQUEwRDtBQUMxRCwrQ0FBb0Q7QUFFcEQ7OztHQUdHO0FBQ0gsa0JBQWUsTUFBTSxDQUFDLGNBQWMsQ0FDbEMsQ0FBQyxJQUFpQixFQUFxQixFQUFFO0lBQ3ZDLElBQUksSUFBSSxZQUFZLDZCQUFZLEVBQUUsQ0FBQztRQUNqQyxNQUFNLE1BQU0sR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25ELElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3pCLE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDO1FBQ3pDLENBQUM7UUFDRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNsQixLQUFLLE1BQU0sU0FBUyxJQUFJLFlBQVksRUFBRSxTQUFTLEVBQUUsQ0FBQztZQUNoRCxNQUFNLGlCQUFpQixHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM1RCxNQUFNLGVBQWUsR0FDbkIsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDOUQsSUFDRSxpQkFBaUIsQ0FBQyxNQUFNLEtBQUssTUFBTTtnQkFDbkMsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSTtnQkFDdEQsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSTtnQkFDNUQsQ0FBQyxlQUFlLEtBQUssT0FBTyxJQUFJLGVBQWUsS0FBSyxLQUFLLENBQUMsRUFDMUQsQ0FBQztnQkFDRCxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUNiLE1BQU07WUFDUixDQUFDO1FBQ0gsQ0FBQztRQUNELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNYLE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDO1FBQ3pDLENBQUM7UUFDRCxPQUFPLDZCQUFpQixDQUFDLFNBQVMsQ0FBQztJQUNyQyxDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sNkJBQWlCLENBQUMsY0FBYyxDQUFDO0lBQzFDLENBQUM7QUFDSCxDQUFDLEVBQ0QsTUFBTSxFQUNOLEVBQUUsS0FBSyxFQUFFLElBQUEsWUFBSyxFQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUNsQyxDQUFDO0FBRUY7Ozs7O0dBS0c7QUFDSCxTQUFTLG1CQUFtQixDQUFDLE9BQVk7SUFDdkMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDM0IsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUM3QixJQUFJLE1BQU0sS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLGNBQWMsRUFBRSxDQUFDO2dCQUM5RCxPQUFPLElBQUksQ0FBQztZQUNkLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztTQUFNLElBQUksT0FBTyxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssY0FBYyxFQUFFLENBQUM7UUFDdkUsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFTLHNCQUFzQixDQUFDLFVBQWU7SUFDN0MsSUFBSSxVQUFVLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQztJQUNwQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQztRQUNoQyxLQUFLLE1BQU0sT0FBTyxJQUFJLFlBQVksRUFBRSxDQUFDO1lBQ25DLElBQUksT0FBTyxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNwQixPQUFPLElBQUksQ0FBQztZQUNkLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztTQUFNLElBQUksWUFBWSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5Db3B5cmlnaHQgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4qL1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IENmblJlc291cmNlLCBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENmbkNvbnRhaW5lciB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1tZWRpYXN0b3JlJztcbmltcG9ydCB7IE5hZ1J1bGVDb21wbGlhbmNlIH0gZnJvbSAnLi4vLi4vbmFnLXJ1bGVzJztcblxuLyoqXG4gKiBNZWRpYSBTdG9yZSBjb250YWluZXJzIHJlcXVpcmUgcmVxdWVzdHMgdG8gdXNlIFNTTFxuICogQHBhcmFtIG5vZGUgdGhlIENmblJlc291cmNlIHRvIGNoZWNrXG4gKi9cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShcbiAgKG5vZGU6IENmblJlc291cmNlKTogTmFnUnVsZUNvbXBsaWFuY2UgPT4ge1xuICAgIGlmIChub2RlIGluc3RhbmNlb2YgQ2ZuQ29udGFpbmVyKSB7XG4gICAgICBjb25zdCBwb2xpY3kgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKG5vZGUucG9saWN5KTtcbiAgICAgIGlmIChwb2xpY3kgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9OX0NPTVBMSUFOVDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHBhcnNlZFBvbGljeSA9IEpTT04ucGFyc2UocG9saWN5KTtcbiAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgZm9yIChjb25zdCBzdGF0ZW1lbnQgb2YgcGFyc2VkUG9saWN5Py5TdGF0ZW1lbnQpIHtcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRTdGF0ZW1lbnQgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKHN0YXRlbWVudCk7XG4gICAgICAgIGNvbnN0IHNlY3VyZVRyYW5zcG9ydCA9XG4gICAgICAgICAgcmVzb2x2ZWRTdGF0ZW1lbnQ/LkNvbmRpdGlvbj8uQm9vbD8uWydhd3M6U2VjdXJlVHJhbnNwb3J0J107XG4gICAgICAgIGlmIChcbiAgICAgICAgICByZXNvbHZlZFN0YXRlbWVudC5FZmZlY3QgPT09ICdEZW55JyAmJlxuICAgICAgICAgIGNoZWNrTWF0Y2hpbmdBY3Rpb24ocmVzb2x2ZWRTdGF0ZW1lbnQuQWN0aW9uKSA9PT0gdHJ1ZSAmJlxuICAgICAgICAgIGNoZWNrTWF0Y2hpbmdQcmluY2lwYWwocmVzb2x2ZWRTdGF0ZW1lbnQuUHJpbmNpcGFsKSA9PT0gdHJ1ZSAmJlxuICAgICAgICAgIChzZWN1cmVUcmFuc3BvcnQgPT09ICdmYWxzZScgfHwgc2VjdXJlVHJhbnNwb3J0ID09PSBmYWxzZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLkNPTVBMSUFOVDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PVF9BUFBMSUNBQkxFO1xuICAgIH1cbiAgfSxcbiAgJ25hbWUnLFxuICB7IHZhbHVlOiBwYXJzZShfX2ZpbGVuYW1lKS5uYW1lIH1cbik7XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGNoZWNrIHdoZXRoZXIgdGhlIEJ1Y2tldCBQb2xpY3kgYXBwbGllcyB0byBhbGwgYWN0aW9uc1xuICogQHBhcmFtIG5vZGUgVGhlIHBvbGljeSBzdGF0ZW1lbnQgdG8gY2hlY2tcbiAqIEBwYXJhbSBhY3Rpb25zIFRoZSBhY3Rpb24gaW4gdGhlIGJ1Y2tldCBwb2xpY3lcbiAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIHBvbGljeSBzdGF0ZW1lbnQgYXBwbGllcyB0byBhbGwgYWN0aW9uc1xuICovXG5mdW5jdGlvbiBjaGVja01hdGNoaW5nQWN0aW9uKGFjdGlvbnM6IGFueSk6IGJvb2xlYW4ge1xuICBpZiAoQXJyYXkuaXNBcnJheShhY3Rpb25zKSkge1xuICAgIGZvciAoY29uc3QgYWN0aW9uIG9mIGFjdGlvbnMpIHtcbiAgICAgIGlmIChhY3Rpb24gPT09ICcqJyB8fCBhY3Rpb24udG9Mb3dlckNhc2UoKSA9PT0gJ21lZGlhc3RvcmU6KicpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGFjdGlvbnMgPT09ICcqJyB8fCBhY3Rpb25zLnRvTG93ZXJDYXNlKCkgPT09ICdtZWRpYXN0b3JlOionKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBjaGVjayB3aGV0aGVyIHRoZSBCdWNrZXQgUG9saWN5IGFwcGxpZXMgdG8gYWxsIHByaW5jaXBhbHNcbiAqIEBwYXJhbSBub2RlIFRoZSBwb2xpY3kgc3RhdGVtZW50IHRvIGNoZWNrXG4gKiBAcGFyYW0gcHJpbmNpcGFsIFRoZSBwcmluY2lwYWxzIGluIHRoZSBidWNrZXQgcG9saWN5XG4gKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBwb2xpY3kgc3RhdGVtZW50IGFwcGxpZXMgdG8gYWxsIHByaW5jaXBhbHNcbiAqL1xuZnVuY3Rpb24gY2hlY2tNYXRjaGluZ1ByaW5jaXBhbChwcmluY2lwYWxzOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKHByaW5jaXBhbHMgPT09ICcqJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGNvbnN0IGF3c1ByaW5jaXBhbCA9IHByaW5jaXBhbHMuQVdTO1xuICBpZiAoQXJyYXkuaXNBcnJheShhd3NQcmluY2lwYWwpKSB7XG4gICAgZm9yIChjb25zdCBhY2NvdW50IG9mIGF3c1ByaW5jaXBhbCkge1xuICAgICAgaWYgKGFjY291bnQgPT09ICcqJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoYXdzUHJpbmNpcGFsID09PSAnKicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4iXX0=