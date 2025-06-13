"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_sns_1 = require("aws-cdk-lib/aws-sns");
const nag_rules_1 = require("../../nag-rules");
/**
 * SNS topics require SSL requests for publishing
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_sns_1.CfnTopic) {
        const topicKey = aws_cdk_lib_1.Stack.of(node).resolve(node.kmsMasterKeyId);
        if (topicKey === undefined) {
            const topicLogicalId = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, node.ref);
            const topicName = aws_cdk_lib_1.Stack.of(node).resolve(node.topicName);
            let found = false;
            for (const child of aws_cdk_lib_1.Stack.of(node).node.findAll()) {
                if (child instanceof aws_sns_1.CfnTopicPolicy) {
                    if (isMatchingCompliantPolicy(child, topicLogicalId, topicName)) {
                        found = true;
                        break;
                    }
                }
            }
            if (!found) {
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
 * Helper function to check whether the topic Policy requires SSL on the given topic.
 * @param node The CfnTopicPolicy to check.
 * @param topicLogicalId The Cfn Logical ID of the topic.
 * @param topicName The name of the topic.
 * @returns Whether the CfnTopicPolicy requires SSL on the given topic.
 */
function isMatchingCompliantPolicy(node, topicLogicalId, topicName) {
    let found = false;
    for (const topic of node.topics) {
        const resolvedTopic = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, topic);
        if (resolvedTopic === topicLogicalId ||
            (topicName !== undefined && resolvedTopic.endsWith(topicName))) {
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
 * Helper function to check whether the topic Policy applies to topic actions
 * @param node The CfnTopicPolicy to check
 * @param actions The action in the topic policy
 * @returns Whether the CfnTopicPolicy applies to topic actions
 */
function checkMatchingAction(actions) {
    if (Array.isArray(actions)) {
        for (const action of actions) {
            if (action.toLowerCase() === 'sns:publish') {
                return true;
            }
        }
    }
    else if (actions.toLowerCase() === 'sns:publish') {
        return true;
    }
    return false;
}
/**
 * Helper function to check whether the topic Policy applies to all principals
 * @param node The CfnTopicPolicy to check
 * @param principal The principals in the topic policy
 * @returns Whether the CfnTopicPolicy applies to all principals
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05TVG9waWNTU0xQdWJsaXNoT25seS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9zbnMvU05TVG9waWNTU0xQdWJsaXNoT25seS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7RUFHRTtBQUNGLCtCQUE2QjtBQUM3Qiw2Q0FBaUQ7QUFDakQsaURBQStEO0FBQy9ELCtDQUE4RDtBQUU5RDs7O0dBR0c7QUFDSCxrQkFBZSxNQUFNLENBQUMsY0FBYyxDQUNsQyxDQUFDLElBQWlCLEVBQXFCLEVBQUU7SUFDdkMsSUFBSSxJQUFJLFlBQVksa0JBQVEsRUFBRSxDQUFDO1FBQzdCLE1BQU0sUUFBUSxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDN0QsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDM0IsTUFBTSxjQUFjLEdBQUcsb0JBQVEsQ0FBQyw0QkFBNEIsQ0FDMUQsSUFBSSxFQUNKLElBQUksQ0FBQyxHQUFHLENBQ1QsQ0FBQztZQUNGLE1BQU0sU0FBUyxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDekQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ2xCLEtBQUssTUFBTSxLQUFLLElBQUksbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7Z0JBQ2xELElBQUksS0FBSyxZQUFZLHdCQUFjLEVBQUUsQ0FBQztvQkFDcEMsSUFBSSx5QkFBeUIsQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUM7d0JBQ2hFLEtBQUssR0FBRyxJQUFJLENBQUM7d0JBQ2IsTUFBTTtvQkFDUixDQUFDO2dCQUNILENB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QUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDO1FBQ2hDLEtBQUssTUFBTSxPQUFPLElBQUksWUFBWSxFQUFFLENBQUM7WUFDbkMsSUFBSSxPQUFPLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ3BCLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO1NBQU0sSUFBSSxZQUFZLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbkNvcHlyaWdodCBBbWF6b24uY29tLCBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiovXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ2ZuUmVzb3VyY2UsIFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ2ZuVG9waWMsIENmblRvcGljUG9saWN5IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLXNucyc7XG5pbXBvcnQgeyBOYWdSdWxlQ29tcGxpYW5jZSwgTmFnUnVsZXMgfSBmcm9tICcuLi8uLi9uYWctcnVsZXMnO1xuXG4vKipcbiAqIFNOUyB0b3BpY3MgcmVxdWlyZSBTU0wgcmVxdWVzdHMgZm9yIHB1Ymxpc2hpbmdcbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5SZXNvdXJjZSB0byBjaGVja1xuICovXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIChub2RlOiBDZm5SZXNvdXJjZSk6IE5hZ1J1bGVDb21wbGlhbmNlID0+IHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENmblRvcGljKSB7XG4gICAgICBjb25zdCB0b3BpY0tleSA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUobm9kZS5rbXNNYXN0ZXJLZXlJZCk7XG4gICAgICBpZiAodG9waWNLZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCB0b3BpY0xvZ2ljYWxJZCA9IE5hZ1J1bGVzLnJlc29sdmVSZXNvdXJjZUZyb21JbnRyaW5zaWMoXG4gICAgICAgICAgbm9kZSxcbiAgICAgICAgICBub2RlLnJlZlxuICAgICAgICApO1xuICAgICAgICBjb25zdCB0b3BpY05hbWUgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKG5vZGUudG9waWNOYW1lKTtcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgU3RhY2sub2Yobm9kZSkubm9kZS5maW5kQWxsKCkpIHtcbiAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBDZm5Ub3BpY1BvbGljeSkge1xuICAgICAgICAgICAgaWYgKGlzTWF0Y2hpbmdDb21wbGlhbnRQb2xpY3koY2hpbGQsIHRvcGljTG9naWNhbElkLCB0b3BpY05hbWUpKSB7XG4gICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9OX0NPTVBMSUFOVDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLkNPTVBMSUFOVDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PVF9BUFBMSUNBQkxFO1xuICAgIH1cbiAgfSxcbiAgJ25hbWUnLFxuICB7IHZhbHVlOiBwYXJzZShfX2ZpbGVuYW1lKS5uYW1lIH1cbik7XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGNoZWNrIHdoZXRoZXIgdGhlIHRvcGljIFBvbGljeSByZXF1aXJlcyBTU0wgb24gdGhlIGdpdmVuIHRvcGljLlxuICogQHBhcmFtIG5vZGUgVGhlIENmblRvcGljUG9saWN5IHRvIGNoZWNrLlxuICogQHBhcmFtIHRvcGljTG9naWNhbElkIFRoZSBDZm4gTG9naWNhbCBJRCBvZiB0aGUgdG9waWMuXG4gKiBAcGFyYW0gdG9waWNOYW1lIFRoZSBuYW1lIG9mIHRoZSB0b3BpYy5cbiAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIENmblRvcGljUG9saWN5IHJlcXVpcmVzIFNTTCBvbiB0aGUgZ2l2ZW4gdG9waWMuXG4gKi9cbmZ1bmN0aW9uIGlzTWF0Y2hpbmdDb21wbGlhbnRQb2xpY3koXG4gIG5vZGU6IENmblRvcGljUG9saWN5LFxuICB0b3BpY0xvZ2ljYWxJZDogc3RyaW5nLFxuICB0b3BpY05hbWU6IHN0cmluZyB8IHVuZGVmaW5lZFxuKTogYm9vbGVhbiB7XG4gIGxldCBmb3VuZCA9IGZhbHNlO1xuICBmb3IgKGNvbnN0IHRvcGljIG9mIG5vZGUudG9waWNzKSB7XG4gICAgY29uc3QgcmVzb2x2ZWRUb3BpYyA9IE5hZ1J1bGVzLnJlc29sdmVSZXNvdXJjZUZyb21JbnRyaW5zaWMobm9kZSwgdG9waWMpO1xuICAgIGlmIChcbiAgICAgIHJlc29sdmVkVG9waWMgPT09IHRvcGljTG9naWNhbElkIHx8XG4gICAgICAodG9waWNOYW1lICE9PSB1bmRlZmluZWQgJiYgKDxzdHJpbmc+cmVzb2x2ZWRUb3BpYykuZW5kc1dpdGgodG9waWNOYW1lKSlcbiAgICApIHtcbiAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBpZiAoIWZvdW5kKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IHJlc29sdmVkUG9saWN5RG9jdW1lbnQgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKG5vZGUucG9saWN5RG9jdW1lbnQpO1xuICBmb3IgKGNvbnN0IHN0YXRlbWVudCBvZiByZXNvbHZlZFBvbGljeURvY3VtZW50LlN0YXRlbWVudCkge1xuICAgIGNvbnN0IHJlc29sdmVkU3RhdGVtZW50ID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShzdGF0ZW1lbnQpO1xuICAgIGNvbnN0IHNlY3VyZVRyYW5zcG9ydCA9XG4gICAgICByZXNvbHZlZFN0YXRlbWVudD8uQ29uZGl0aW9uPy5Cb29sPy5bJ2F3czpTZWN1cmVUcmFuc3BvcnQnXTtcbiAgICBpZiAoXG4gICAgICByZXNvbHZlZFN0YXRlbWVudC5FZmZlY3QgPT09ICdEZW55JyAmJlxuICAgICAgY2hlY2tNYXRjaGluZ0FjdGlvbihyZXNvbHZlZFN0YXRlbWVudC5BY3Rpb24pID09PSB0cnVlICYmXG4gICAgICBjaGVja01hdGNoaW5nUHJpbmNpcGFsKHJlc29sdmVkU3RhdGVtZW50LlByaW5jaXBhbCkgPT09IHRydWUgJiZcbiAgICAgIChzZWN1cmVUcmFuc3BvcnQgPT09ICdmYWxzZScgfHwgc2VjdXJlVHJhbnNwb3J0ID09PSBmYWxzZSlcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGNoZWNrIHdoZXRoZXIgdGhlIHRvcGljIFBvbGljeSBhcHBsaWVzIHRvIHRvcGljIGFjdGlvbnNcbiAqIEBwYXJhbSBub2RlIFRoZSBDZm5Ub3BpY1BvbGljeSB0byBjaGVja1xuICogQHBhcmFtIGFjdGlvbnMgVGhlIGFjdGlvbiBpbiB0aGUgdG9waWMgcG9saWN5XG4gKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBDZm5Ub3BpY1BvbGljeSBhcHBsaWVzIHRvIHRvcGljIGFjdGlvbnNcbiAqL1xuZnVuY3Rpb24gY2hlY2tNYXRjaGluZ0FjdGlvbihhY3Rpb25zOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYWN0aW9ucykpIHtcbiAgICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBhY3Rpb25zKSB7XG4gICAgICBpZiAoYWN0aW9uLnRvTG93ZXJDYXNlKCkgPT09ICdzbnM6cHVibGlzaCcpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGFjdGlvbnMudG9Mb3dlckNhc2UoKSA9PT0gJ3NuczpwdWJsaXNoJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY2hlY2sgd2hldGhlciB0aGUgdG9waWMgUG9saWN5IGFwcGxpZXMgdG8gYWxsIHByaW5jaXBhbHNcbiAqIEBwYXJhbSBub2RlIFRoZSBDZm5Ub3BpY1BvbGljeSB0byBjaGVja1xuICogQHBhcmFtIHByaW5jaXBhbCBUaGUgcHJpbmNpcGFscyBpbiB0aGUgdG9waWMgcG9saWN5XG4gKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBDZm5Ub3BpY1BvbGljeSBhcHBsaWVzIHRvIGFsbCBwcmluY2lwYWxzXG4gKi9cbmZ1bmN0aW9uIGNoZWNrTWF0Y2hpbmdQcmluY2lwYWwocHJpbmNpcGFsczogYW55KTogYm9vbGVhbiB7XG4gIGlmIChwcmluY2lwYWxzID09PSAnKicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBjb25zdCBhd3NQcmluY2lwYWwgPSBwcmluY2lwYWxzLkFXUztcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXdzUHJpbmNpcGFsKSkge1xuICAgIGZvciAoY29uc3QgYWNjb3VudCBvZiBhd3NQcmluY2lwYWwpIHtcbiAgICAgIGlmIChhY2NvdW50ID09PSAnKicpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGF3c1ByaW5jaXBhbCA9PT0gJyonKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuIl19