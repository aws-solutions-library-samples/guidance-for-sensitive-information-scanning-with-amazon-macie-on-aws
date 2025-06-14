"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_events_1 = require("aws-cdk-lib/aws-events");
const nag_rules_1 = require("../../nag-rules");
/**
 * EventBridge event bus policies do not allow for open access
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_events_1.CfnEventBusPolicy) {
        if (aws_cdk_lib_1.Stack.of(node).resolve(node.principal) === '*') {
            const condition = aws_cdk_lib_1.Stack.of(node).resolve(node.condition);
            if (condition === undefined ||
                condition.key === undefined ||
                condition.type === undefined ||
                condition.value === undefined) {
                return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
            }
        }
        const resolvedStatement = aws_cdk_lib_1.Stack.of(node).resolve(node.statement);
        if (resolvedStatement !== undefined) {
            const condition = aws_cdk_lib_1.Stack.of(node).resolve(resolvedStatement?.Condition);
            if (resolvedStatement?.Effect === 'Allow' &&
                checkMatchingPrincipal(resolvedStatement?.Principal) === true &&
                (condition === undefined || JSON.stringify(condition) === '{}')) {
                return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
            }
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
/**
 * Helper function to check whether the event bus policy applies to all principals
 * @param node The CfnEventBusPolicy to check
 * @param principal The principals in the event bus policy
 * @returns Whether the CfnEventBusPolicy applies to all principals
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRCdXNPcGVuQWNjZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3J1bGVzL2V2ZW50YnJpZGdlL0V2ZW50QnVzT3BlbkFjY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7RUFHRTtBQUNGLCtCQUE2QjtBQUM3Qiw2Q0FBaUQ7QUFDakQsdURBQTJEO0FBQzNELCtDQUFvRDtBQUVwRDs7O0dBR0c7QUFDSCxrQkFBZSxNQUFNLENBQUMsY0FBYyxDQUNsQyxDQUFDLElBQWlCLEVBQXFCLEVBQUU7SUFDdkMsSUFBSSxJQUFJLFlBQVksOEJBQWlCLEVBQUUsQ0FBQztRQUN0QyxJQUFJLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDbkQsTUFBTSxTQUFTLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN6RCxJQUNFLFNBQVMsS0FBSyxTQUFTO2dCQUN2QixTQUFTLENBQUMsR0FBRyxLQUFLLFNBQVM7Z0JBQzNCLFNBQVMsQ0FBQyxJQUFJLEtBQUssU0FBUztnQkFDNUIsU0FBUyxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQzdCLENBQUM7Z0JBQ0QsT0FBTyw2QkFBaUIsQ0FBQyxhQUFhLENBQUM7WUFDekMsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLGlCQUFpQixHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakUsSUFBSSxpQkFBaUIsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUNwQyxNQUFNLFNBQVMsR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdkUsSUFDRSxpQkFBaUIsRUFBRSxNQUFNLEtBQUssT0FBTztnQkFDckMsc0JBQXNCLENBQUMsaUJBQWlCLEVBQUUsU0FBUyxDQUFDLEtBQUssSUFBSTtnQkFDN0QsQ0FBQyxTQUFTLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQy9ELENBQUM7Z0JBQ0QsT0FBTyw2QkFBaUIsQ0FBQyxhQUFhLENBQUM7WUFDekMsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLDZCQUFpQixDQUFDLFNBQVMsQ0FBQztJQUNyQyxDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sNkJBQWlCLENBQUMsY0FBYyxDQUFDO0lBQzFDLENBQUM7QUFDSCxDQUFDLEVBQ0QsTUFBTSxFQUNOLEVBQUUsS0FBSyxFQUFFLElBQUEsWUFBSyxFQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUNsQyxDQUFDO0FBRUY7Ozs7O0dBS0c7QUFDSCxTQUFTLHNCQUFzQixDQUFDLFVBQWU7SUFDN0MsSUFBSSxVQUFVLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQztJQUNwQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQztRQUNoQyxLQUFLLE1BQU0sT0FBTyxJQUFJLFlBQVksRUFBRSxDQUFDO1lBQ25DLElBQUksT0FBTyxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNwQixPQUFPLElBQUksQ0FBQztZQUNkLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztTQUFNLElBQUksWUFBWSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5Db3B5cmlnaHQgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4qL1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IENmblJlc291cmNlLCBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENmbkV2ZW50QnVzUG9saWN5IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWV2ZW50cyc7XG5pbXBvcnQgeyBOYWdSdWxlQ29tcGxpYW5jZSB9IGZyb20gJy4uLy4uL25hZy1ydWxlcyc7XG5cbi8qKlxuICogRXZlbnRCcmlkZ2UgZXZlbnQgYnVzIHBvbGljaWVzIGRvIG5vdCBhbGxvdyBmb3Igb3BlbiBhY2Nlc3NcbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5SZXNvdXJjZSB0byBjaGVja1xuICovXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIChub2RlOiBDZm5SZXNvdXJjZSk6IE5hZ1J1bGVDb21wbGlhbmNlID0+IHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENmbkV2ZW50QnVzUG9saWN5KSB7XG4gICAgICBpZiAoU3RhY2sub2Yobm9kZSkucmVzb2x2ZShub2RlLnByaW5jaXBhbCkgPT09ICcqJykge1xuICAgICAgICBjb25zdCBjb25kaXRpb24gPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKG5vZGUuY29uZGl0aW9uKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNvbmRpdGlvbiA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgY29uZGl0aW9uLmtleSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgY29uZGl0aW9uLnR5cGUgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIGNvbmRpdGlvbi52YWx1ZSA9PT0gdW5kZWZpbmVkXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCByZXNvbHZlZFN0YXRlbWVudCA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUobm9kZS5zdGF0ZW1lbnQpO1xuICAgICAgaWYgKHJlc29sdmVkU3RhdGVtZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgY29uZGl0aW9uID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShyZXNvbHZlZFN0YXRlbWVudD8uQ29uZGl0aW9uKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHJlc29sdmVkU3RhdGVtZW50Py5FZmZlY3QgPT09ICdBbGxvdycgJiZcbiAgICAgICAgICBjaGVja01hdGNoaW5nUHJpbmNpcGFsKHJlc29sdmVkU3RhdGVtZW50Py5QcmluY2lwYWwpID09PSB0cnVlICYmXG4gICAgICAgICAgKGNvbmRpdGlvbiA9PT0gdW5kZWZpbmVkIHx8IEpTT04uc3RyaW5naWZ5KGNvbmRpdGlvbikgPT09ICd7fScpXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuQ09NUExJQU5UO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9UX0FQUExJQ0FCTEU7XG4gICAgfVxuICB9LFxuICAnbmFtZScsXG4gIHsgdmFsdWU6IHBhcnNlKF9fZmlsZW5hbWUpLm5hbWUgfVxuKTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY2hlY2sgd2hldGhlciB0aGUgZXZlbnQgYnVzIHBvbGljeSBhcHBsaWVzIHRvIGFsbCBwcmluY2lwYWxzXG4gKiBAcGFyYW0gbm9kZSBUaGUgQ2ZuRXZlbnRCdXNQb2xpY3kgdG8gY2hlY2tcbiAqIEBwYXJhbSBwcmluY2lwYWwgVGhlIHByaW5jaXBhbHMgaW4gdGhlIGV2ZW50IGJ1cyBwb2xpY3lcbiAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIENmbkV2ZW50QnVzUG9saWN5IGFwcGxpZXMgdG8gYWxsIHByaW5jaXBhbHNcbiAqL1xuZnVuY3Rpb24gY2hlY2tNYXRjaGluZ1ByaW5jaXBhbChwcmluY2lwYWxzOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKHByaW5jaXBhbHMgPT09ICcqJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGNvbnN0IGF3c1ByaW5jaXBhbCA9IHByaW5jaXBhbHMuQVdTO1xuICBpZiAoQXJyYXkuaXNBcnJheShhd3NQcmluY2lwYWwpKSB7XG4gICAgZm9yIChjb25zdCBhY2NvdW50IG9mIGF3c1ByaW5jaXBhbCkge1xuICAgICAgaWYgKGFjY291bnQgPT09ICcqJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoYXdzUHJpbmNpcGFsID09PSAnKicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4iXX0=