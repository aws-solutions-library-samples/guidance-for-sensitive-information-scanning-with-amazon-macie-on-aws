"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_sqs_1 = require("aws-cdk-lib/aws-sqs");
const nag_rules_1 = require("../../nag-rules");
/**
 * SQS queues require SSL requests
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_sqs_1.CfnQueue) {
        const queueLogicalId = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, node.ref);
        const queueName = aws_cdk_lib_1.Stack.of(node).resolve(node.queueName);
        let found = false;
        for (const child of aws_cdk_lib_1.Stack.of(node).node.findAll()) {
            if (child instanceof aws_sqs_1.CfnQueuePolicy) {
                if (isMatchingCompliantPolicy(child, queueLogicalId, queueName)) {
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
 * Helper function to check whether the queue Policy requires SSL on the given queue.
 * @param node The CfnQueuePolicy to check.
 * @param queueLogicalId The Cfn Logical ID of the queue.
 * @param queueName The name of the queue.
 * @returns Whether the CfnQueuePolicy requires SSL on the given queue.
 */
function isMatchingCompliantPolicy(node, queueLogicalId, queueName) {
    let found = false;
    for (const queue of node.queues) {
        const resolvedQueue = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, queue);
        if (resolvedQueue === queueLogicalId ||
            (queueName !== undefined && resolvedQueue.endsWith(queueName))) {
            found = true;
            break;
        }
    }
    if (!found) {
        return false;
    }
    const resolvedPolicyDocument = aws_cdk_lib_1.Stack.of(node).resolve(node.policyDocument);
    for (const statement of resolvedPolicyDocument.Statement) {
        const resolvedStatement = aws_cdk_lib_1.Stack.of(node).resolve(statement);
        const secureTransport = resolvedStatement?.Condition?.Bool?.['aws:SecureTransport'];
        if (resolvedStatement.Effect === 'Deny' &&
            checkMatchingAction(resolvedStatement.Action) === true &&
            checkMatchingPrincipal(resolvedStatement.Principal) === true &&
            (secureTransport === 'false' || secureTransport === false)) {
            return true;
        }
    }
    return false;
}
/**
 * Helper function to check whether the queue Policy applies to queue actions
 * @param node The CfnQueuePolicy to check
 * @param actions The action in the queue policy
 * @returns Whether the CfnQueuePolicy applies to queue actions
 */
function checkMatchingAction(actions) {
    if (Array.isArray(actions)) {
        for (const action of actions) {
            if (action === '*' || action.toLowerCase() === 'sqs:*') {
                return true;
            }
        }
    }
    else if (actions === '*' || actions.toLowerCase() === 'sqs:*') {
        return true;
    }
    return false;
}
/**
 * Helper function to check whether the queue Policy applies to all principals
 * @param node The CfnQueuePolicy to check
 * @param principal The principals in the queue policy
 * @returns Whether the CfnQueuePolicy applies to all principals
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1FTUXVldWVTU0xSZXF1ZXN0c09ubHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvc3FzL1NRU1F1ZXVlU1NMUmVxdWVzdHNPbmx5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7OztFQUdFO0FBQ0YsK0JBQTZCO0FBQzdCLDZDQUFpRDtBQUNqRCxpREFBK0Q7QUFDL0QsK0NBQThEO0FBRTlEOzs7R0FHRztBQUNILGtCQUFlLE1BQU0sQ0FBQyxjQUFjLENBQ2xDLENBQUMsSUFBaUIsRUFBcUIsRUFBRTtJQUN2QyxJQUFJLElBQUksWUFBWSxrQkFBUSxFQUFFLENBQUM7UUFDN0IsTUFBTSxjQUFjLEdBQUcsb0JBQVEsQ0FBQyw0QkFBNEIsQ0FDMUQsSUFBSSxFQUNKLElBQUksQ0FBQyxHQUFHLENBQ1QsQ0FBQztRQUNGLE1BQU0sU0FBUyxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLEtBQUssTUFBTSxLQUFLLElBQUksbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7WUFDbEQsSUFBSSxLQUFLLFlBQVksd0JBQWMsRUFBRSxDQUFDO2dCQUNwQyxJQUFJLHlCQUF5QixDQUFDLEtBQUssRUFBRSxjQUFjLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQztvQkFDaEUsS0FBSyxHQUFHLElBQUksQ0FBQztvQkFDYixNQUFNO2dCQUNSLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUNELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNYLE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDO1FBQ3pDLENBQUM7UUFDRCxPQUFPLDZCQUFpQixDQUFDLFNBQVMsQ0FBQztJQUNyQyxDQUFD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LEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ3BCLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO1NBQU0sSUFBSSxZQUFZLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbkNvcHlyaWdodCBBbWF6b24uY29tLCBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiovXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ2ZuUmVzb3VyY2UsIFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ2ZuUXVldWUsIENmblF1ZXVlUG9saWN5IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLXNxcyc7XG5pbXBvcnQgeyBOYWdSdWxlQ29tcGxpYW5jZSwgTmFnUnVsZXMgfSBmcm9tICcuLi8uLi9uYWctcnVsZXMnO1xuXG4vKipcbiAqIFNRUyBxdWV1ZXMgcmVxdWlyZSBTU0wgcmVxdWVzdHNcbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5SZXNvdXJjZSB0byBjaGVja1xuICovXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIChub2RlOiBDZm5SZXNvdXJjZSk6IE5hZ1J1bGVDb21wbGlhbmNlID0+IHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENmblF1ZXVlKSB7XG4gICAgICBjb25zdCBxdWV1ZUxvZ2ljYWxJZCA9IE5hZ1J1bGVzLnJlc29sdmVSZXNvdXJjZUZyb21JbnRyaW5zaWMoXG4gICAgICAgIG5vZGUsXG4gICAgICAgIG5vZGUucmVmXG4gICAgICApO1xuICAgICAgY29uc3QgcXVldWVOYW1lID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShub2RlLnF1ZXVlTmFtZSk7XG4gICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgU3RhY2sub2Yobm9kZSkubm9kZS5maW5kQWxsKCkpIHtcbiAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgQ2ZuUXVldWVQb2xpY3kpIHtcbiAgICAgICAgICBpZiAoaXNNYXRjaGluZ0NvbXBsaWFudFBvbGljeShjaGlsZCwgcXVldWVMb2dpY2FsSWQsIHF1ZXVlTmFtZSkpIHtcbiAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9OX0NPTVBMSUFOVDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5DT01QTElBTlQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT1RfQVBQTElDQUJMRTtcbiAgICB9XG4gIH0sXG4gICduYW1lJyxcbiAgeyB2YWx1ZTogcGFyc2UoX19maWxlbmFtZSkubmFtZSB9XG4pO1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBjaGVjayB3aGV0aGVyIHRoZSBxdWV1ZSBQb2xpY3kgcmVxdWlyZXMgU1NMIG9uIHRoZSBnaXZlbiBxdWV1ZS5cbiAqIEBwYXJhbSBub2RlIFRoZSBDZm5RdWV1ZVBvbGljeSB0byBjaGVjay5cbiAqIEBwYXJhbSBxdWV1ZUxvZ2ljYWxJZCBUaGUgQ2ZuIExvZ2ljYWwgSUQgb2YgdGhlIHF1ZXVlLlxuICogQHBhcmFtIHF1ZXVlTmFtZSBUaGUgbmFtZSBvZiB0aGUgcXVldWUuXG4gKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBDZm5RdWV1ZVBvbGljeSByZXF1aXJlcyBTU0wgb24gdGhlIGdpdmVuIHF1ZXVlLlxuICovXG5mdW5jdGlvbiBpc01hdGNoaW5nQ29tcGxpYW50UG9saWN5KFxuICBub2RlOiBDZm5RdWV1ZVBvbGljeSxcbiAgcXVldWVMb2dpY2FsSWQ6IHN0cmluZyxcbiAgcXVldWVOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWRcbik6IGJvb2xlYW4ge1xuICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgZm9yIChjb25zdCBxdWV1ZSBvZiBub2RlLnF1ZXVlcykge1xuICAgIGNvbnN0IHJlc29sdmVkUXVldWUgPSBOYWdSdWxlcy5yZXNvbHZlUmVzb3VyY2VGcm9tSW50cmluc2ljKG5vZGUsIHF1ZXVlKTtcbiAgICBpZiAoXG4gICAgICByZXNvbHZlZFF1ZXVlID09PSBxdWV1ZUxvZ2ljYWxJZCB8fFxuICAgICAgKHF1ZXVlTmFtZSAhPT0gdW5kZWZpbmVkICYmICg8c3RyaW5nPnJlc29sdmVkUXVldWUpLmVuZHNXaXRoKHF1ZXVlTmFtZSkpXG4gICAgKSB7XG4gICAgICBmb3VuZCA9IHRydWU7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgaWYgKCFmb3VuZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCByZXNvbHZlZFBvbGljeURvY3VtZW50ID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShub2RlLnBvbGljeURvY3VtZW50KTtcbiAgZm9yIChjb25zdCBzdGF0ZW1lbnQgb2YgcmVzb2x2ZWRQb2xpY3lEb2N1bWVudC5TdGF0ZW1lbnQpIHtcbiAgICBjb25zdCByZXNvbHZlZFN0YXRlbWVudCA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUoc3RhdGVtZW50KTtcbiAgICBjb25zdCBzZWN1cmVUcmFuc3BvcnQgPVxuICAgICAgcmVzb2x2ZWRTdGF0ZW1lbnQ/LkNvbmRpdGlvbj8uQm9vbD8uWydhd3M6U2VjdXJlVHJhbnNwb3J0J107XG4gICAgaWYgKFxuICAgICAgcmVzb2x2ZWRTdGF0ZW1lbnQuRWZmZWN0ID09PSAnRGVueScgJiZcbiAgICAgIGNoZWNrTWF0Y2hpbmdBY3Rpb24ocmVzb2x2ZWRTdGF0ZW1lbnQuQWN0aW9uKSA9PT0gdHJ1ZSAmJlxuICAgICAgY2hlY2tNYXRjaGluZ1ByaW5jaXBhbChyZXNvbHZlZFN0YXRlbWVudC5QcmluY2lwYWwpID09PSB0cnVlICYmXG4gICAgICAoc2VjdXJlVHJhbnNwb3J0ID09PSAnZmFsc2UnIHx8IHNlY3VyZVRyYW5zcG9ydCA9PT0gZmFsc2UpXG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBjaGVjayB3aGV0aGVyIHRoZSBxdWV1ZSBQb2xpY3kgYXBwbGllcyB0byBxdWV1ZSBhY3Rpb25zXG4gKiBAcGFyYW0gbm9kZSBUaGUgQ2ZuUXVldWVQb2xpY3kgdG8gY2hlY2tcbiAqIEBwYXJhbSBhY3Rpb25zIFRoZSBhY3Rpb24gaW4gdGhlIHF1ZXVlIHBvbGljeVxuICogQHJldHVybnMgV2hldGhlciB0aGUgQ2ZuUXVldWVQb2xpY3kgYXBwbGllcyB0byBxdWV1ZSBhY3Rpb25zXG4gKi9cbmZ1bmN0aW9uIGNoZWNrTWF0Y2hpbmdBY3Rpb24oYWN0aW9uczogYW55KTogYm9vbGVhbiB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFjdGlvbnMpKSB7XG4gICAgZm9yIChjb25zdCBhY3Rpb24gb2YgYWN0aW9ucykge1xuICAgICAgaWYgKGFjdGlvbiA9PT0gJyonIHx8IGFjdGlvbi50b0xvd2VyQ2FzZSgpID09PSAnc3FzOionKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChhY3Rpb25zID09PSAnKicgfHwgYWN0aW9ucy50b0xvd2VyQ2FzZSgpID09PSAnc3FzOionKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBjaGVjayB3aGV0aGVyIHRoZSBxdWV1ZSBQb2xpY3kgYXBwbGllcyB0byBhbGwgcHJpbmNpcGFsc1xuICogQHBhcmFtIG5vZGUgVGhlIENmblF1ZXVlUG9saWN5IHRvIGNoZWNrXG4gKiBAcGFyYW0gcHJpbmNpcGFsIFRoZSBwcmluY2lwYWxzIGluIHRoZSBxdWV1ZSBwb2xpY3lcbiAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIENmblF1ZXVlUG9saWN5IGFwcGxpZXMgdG8gYWxsIHByaW5jaXBhbHNcbiAqL1xuZnVuY3Rpb24gY2hlY2tNYXRjaGluZ1ByaW5jaXBhbChwcmluY2lwYWxzOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKHByaW5jaXBhbHMgPT09ICcqJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGNvbnN0IGF3c1ByaW5jaXBhbCA9IHByaW5jaXBhbHMuQVdTO1xuICBpZiAoQXJyYXkuaXNBcnJheShhd3NQcmluY2lwYWwpKSB7XG4gICAgZm9yIChjb25zdCBhY2NvdW50IG9mIGF3c1ByaW5jaXBhbCkge1xuICAgICAgaWYgKGFjY291bnQgPT09ICcqJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoYXdzUHJpbmNpcGFsID09PSAnKicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4iXX0=