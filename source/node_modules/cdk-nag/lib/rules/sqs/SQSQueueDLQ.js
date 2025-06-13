"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const aws_sqs_1 = require("aws-cdk-lib/aws-sqs");
const nag_rules_1 = require("../../nag-rules");
const flatten_cfn_reference_1 = require("../../utils/flatten-cfn-reference");
/**
 * SQS queues have a dead-letter queue enabled if they are not used as a dead-letter queue
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_sqs_1.CfnQueue) {
        const redrivePolicy = aws_cdk_lib_1.Stack.of(node).resolve(node.redrivePolicy);
        if (redrivePolicy === undefined) {
            const queueLogicalId = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, node.ref);
            const queueName = aws_cdk_lib_1.Stack.of(node).resolve(node.queueName);
            let found = false;
            for (const child of aws_cdk_lib_1.Stack.of(node).node.findAll()) {
                if (child instanceof aws_sqs_1.CfnQueue) {
                    if (isMatchingQueue(child, queueLogicalId, queueName)) {
                        found = true;
                        break;
                    }
                }
                else if (child instanceof aws_lambda_1.CfnFunction) {
                    if (isMatchingLambdaFunction(child, queueLogicalId, queueName)) {
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
 * Helper function to check whether a given SQS Queue uses the target SQS queue as a DLQ
 * @param node the CfnQueue to check
 * @param queueLogicalId the Cfn Logical ID of the target queue
 * @param queueName the name of the target queue
 * returns whether the CfnQueue uses the target SQS queue as a DLQ
 */
function isMatchingQueue(node, queueLogicalId, queueName) {
    const redrivePolicy = aws_cdk_lib_1.Stack.of(node).resolve(node.redrivePolicy);
    const deadLetterTargetArn = (0, flatten_cfn_reference_1.flattenCfnReference)(redrivePolicy?.deadLetterTargetArn ?? '');
    if (new RegExp(`${queueLogicalId}(?![\\w])`).test(deadLetterTargetArn) ||
        (queueName !== undefined &&
            new RegExp(`:${queueName}(?![\\w\\-_\\.])`).test(deadLetterTargetArn))) {
        return true;
    }
    return false;
}
/**
 * Helper function to check whether a given Lambda Function uses the target SQS queue as a DLQ
 * @param node the CfnFunction to check
 * @param queueLogicalId the Cfn Logical ID of the target queue
 * @param queueName the name of the target queue
 * returns whether the CfnFunction uses the target SQS queue as a DLQ
 */
function isMatchingLambdaFunction(node, queueLogicalId, queueName) {
    const deadLetterConfig = aws_cdk_lib_1.Stack.of(node).resolve(node.deadLetterConfig);
    const targetArn = (0, flatten_cfn_reference_1.flattenCfnReference)(aws_cdk_lib_1.Stack.of(node).resolve(deadLetterConfig?.targetArn) ?? '');
    if (new RegExp(`${queueLogicalId}(?![\\w])`).test(targetArn) ||
        (queueName !== undefined &&
            new RegExp(`:${queueName}(?![\\w\\-_\\.])`).test(targetArn))) {
        return true;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1FTUXVldWVETFEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvc3FzL1NRU1F1ZXVlRExRLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7OztFQUdFO0FBQ0YsK0JBQTZCO0FBQzdCLDZDQUFpRDtBQUNqRCx1REFBcUQ7QUFDckQsaURBQStDO0FBQy9DLCtDQUE4RDtBQUM5RCw2RUFBd0U7QUFFeEU7OztHQUdHO0FBQ0gsa0JBQWUsTUFBTSxDQUFDLGNBQWMsQ0FDbEMsQ0FBQyxJQUFpQixFQUFxQixFQUFFO0lBQ3ZDLElBQUksSUFBSSxZQUFZLGtCQUFRLEVBQUUsQ0FBQztRQUM3QixNQUFNLGFBQWEsR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pFLElBQUksYUFBYSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ2hDLE1BQU0sY0FBYyxHQUFHLG9CQUFRLENBQUMsNEJBQTRCLENBQzFELElBQUksRUFDSixJQUFJLENBQUMsR0FBRyxDQUNULENBQUM7WUFDRixNQUFNLFNBQVMsR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3pELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNsQixLQUFLLE1BQU0sS0FBSyxJQUFJLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO2dCQUNsRCxJQUFJLEtBQUssWUFBWSxrQkFBUSxFQUFFLENBQUM7b0JBQzlCLElBQUksZUFBZSxDQUFDLEtBQUssRUFBRSxjQUFjLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQzt3QkFDdEQsS0FBSyxHQUFHLElBQUksQ0FBQzt3QkFDYixNQUFNO29CQUNSLENBQUM7Z0JBQ0gsQ0FBQztxQkFBTSxJQUFJLEtBQUssWUFBWSx3QkFBVyxFQUFFLENBQUM7b0JBQ3hDLElBQUksd0JBQXdCLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDO3dCQUMvRCxLQUFLLEdBQUcsSUFBSSxDQUFDO3dCQUNiLE1BQU07b0JBQ1IsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQztZQUNELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDWCxPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztZQUN6QyxDQUFDO1FBQ0gsQ0FBQztRQUNELE9BQU8sNkJBQWlCLENBQUMsU0FBUyxDQUFDO0lBQ3JDLENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTyw2QkFBaUIsQ0FBQyxjQUFjLENBQUM7SUFDMUMsQ0FBQztBQUNILENBQUMsRUFDRCxNQUFNLEVBQ04sRUFBRSxLQUFLLEVBQUUsSUFBQSxZQUFLLEVBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQ2xDLENBQUM7QUFFRjs7Ozs7O0dBTUc7QUFDSCxTQUFTLGVBQWUsQ0FDdEIsSUFBYyxFQUNkLGNBQXNCLEVBQ3RCLFNBQTZCO0lBRTdCLE1BQU0sYUFBYSxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDakUsTUFBTSxtQkFBbUIsR0FBRyxJQUFBLDJDQUFtQixFQUM3QyxhQUFhLEVBQUUsbUJBQW1CLElBQUksRUFBRSxDQUN6QyxDQUFDO0lBQ0YsSUFDRSxJQUFJLE1BQU0sQ0FBQyxHQUFHLGNBQWMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQ2xFLENBQUMsU0FBUyxLQUFLLFNBQVM7WUFDdEIsSUFBSSxNQUFNLENBQUMsSUFBSSxTQUFTLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsRUFDeEUsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVEOzs7Ozs7R0FNRztBQUNILFNBQVMsd0JBQXdCLENBQy9CLElBQWlCLEVBQ2pCLGNBQXNCLEVBQ3RCLFNBQTZCO0lBRTdCLE1BQU0sZ0JBQWdCLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3ZFLE1BQU0sU0FBUyxHQUFHLElBQUEsMkNBQW1CLEVBQ25DLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQzFELENBQUM7SUFDRixJQUNFLElBQUksTUFBTSxDQUFDLEdBQUcsY0FBYyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hELENBQUMsU0FBUyxLQUFLLFNBQVM7WUFDdEIsSUFBSSxNQUFNLENBQUMsSUFBSSxTQUFTLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQzlELENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuQ29weXJpZ2h0IEFtYXpvbi5jb20sIEluYy4gb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5TUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuKi9cbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDZm5SZXNvdXJjZSwgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDZm5GdW5jdGlvbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnO1xuaW1wb3J0IHsgQ2ZuUXVldWUgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc3FzJztcbmltcG9ydCB7IE5hZ1J1bGVDb21wbGlhbmNlLCBOYWdSdWxlcyB9IGZyb20gJy4uLy4uL25hZy1ydWxlcyc7XG5pbXBvcnQgeyBmbGF0dGVuQ2ZuUmVmZXJlbmNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvZmxhdHRlbi1jZm4tcmVmZXJlbmNlJztcblxuLyoqXG4gKiBTUVMgcXVldWVzIGhhdmUgYSBkZWFkLWxldHRlciBxdWV1ZSBlbmFibGVkIGlmIHRoZXkgYXJlIG5vdCB1c2VkIGFzIGEgZGVhZC1sZXR0ZXIgcXVldWVcbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5SZXNvdXJjZSB0byBjaGVja1xuICovXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIChub2RlOiBDZm5SZXNvdXJjZSk6IE5hZ1J1bGVDb21wbGlhbmNlID0+IHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENmblF1ZXVlKSB7XG4gICAgICBjb25zdCByZWRyaXZlUG9saWN5ID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShub2RlLnJlZHJpdmVQb2xpY3kpO1xuICAgICAgaWYgKHJlZHJpdmVQb2xpY3kgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBxdWV1ZUxvZ2ljYWxJZCA9IE5hZ1J1bGVzLnJlc29sdmVSZXNvdXJjZUZyb21JbnRyaW5zaWMoXG4gICAgICAgICAgbm9kZSxcbiAgICAgICAgICBub2RlLnJlZlxuICAgICAgICApO1xuICAgICAgICBjb25zdCBxdWV1ZU5hbWUgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKG5vZGUucXVldWVOYW1lKTtcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgU3RhY2sub2Yobm9kZSkubm9kZS5maW5kQWxsKCkpIHtcbiAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBDZm5RdWV1ZSkge1xuICAgICAgICAgICAgaWYgKGlzTWF0Y2hpbmdRdWV1ZShjaGlsZCwgcXVldWVMb2dpY2FsSWQsIHF1ZXVlTmFtZSkpIHtcbiAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGNoaWxkIGluc3RhbmNlb2YgQ2ZuRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChpc01hdGNoaW5nTGFtYmRhRnVuY3Rpb24oY2hpbGQsIHF1ZXVlTG9naWNhbElkLCBxdWV1ZU5hbWUpKSB7XG4gICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9OX0NPTVBMSUFOVDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLkNPTVBMSUFOVDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PVF9BUFBMSUNBQkxFO1xuICAgIH1cbiAgfSxcbiAgJ25hbWUnLFxuICB7IHZhbHVlOiBwYXJzZShfX2ZpbGVuYW1lKS5uYW1lIH1cbik7XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGNoZWNrIHdoZXRoZXIgYSBnaXZlbiBTUVMgUXVldWUgdXNlcyB0aGUgdGFyZ2V0IFNRUyBxdWV1ZSBhcyBhIERMUVxuICogQHBhcmFtIG5vZGUgdGhlIENmblF1ZXVlIHRvIGNoZWNrXG4gKiBAcGFyYW0gcXVldWVMb2dpY2FsSWQgdGhlIENmbiBMb2dpY2FsIElEIG9mIHRoZSB0YXJnZXQgcXVldWVcbiAqIEBwYXJhbSBxdWV1ZU5hbWUgdGhlIG5hbWUgb2YgdGhlIHRhcmdldCBxdWV1ZVxuICogcmV0dXJucyB3aGV0aGVyIHRoZSBDZm5RdWV1ZSB1c2VzIHRoZSB0YXJnZXQgU1FTIHF1ZXVlIGFzIGEgRExRXG4gKi9cbmZ1bmN0aW9uIGlzTWF0Y2hpbmdRdWV1ZShcbiAgbm9kZTogQ2ZuUXVldWUsXG4gIHF1ZXVlTG9naWNhbElkOiBzdHJpbmcsXG4gIHF1ZXVlTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkXG4pOiBib29sZWFuIHtcbiAgY29uc3QgcmVkcml2ZVBvbGljeSA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUobm9kZS5yZWRyaXZlUG9saWN5KTtcbiAgY29uc3QgZGVhZExldHRlclRhcmdldEFybiA9IGZsYXR0ZW5DZm5SZWZlcmVuY2UoXG4gICAgcmVkcml2ZVBvbGljeT8uZGVhZExldHRlclRhcmdldEFybiA/PyAnJ1xuICApO1xuICBpZiAoXG4gICAgbmV3IFJlZ0V4cChgJHtxdWV1ZUxvZ2ljYWxJZH0oPyFbXFxcXHddKWApLnRlc3QoZGVhZExldHRlclRhcmdldEFybikgfHxcbiAgICAocXVldWVOYW1lICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIG5ldyBSZWdFeHAoYDoke3F1ZXVlTmFtZX0oPyFbXFxcXHdcXFxcLV9cXFxcLl0pYCkudGVzdChkZWFkTGV0dGVyVGFyZ2V0QXJuKSlcbiAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBjaGVjayB3aGV0aGVyIGEgZ2l2ZW4gTGFtYmRhIEZ1bmN0aW9uIHVzZXMgdGhlIHRhcmdldCBTUVMgcXVldWUgYXMgYSBETFFcbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5GdW5jdGlvbiB0byBjaGVja1xuICogQHBhcmFtIHF1ZXVlTG9naWNhbElkIHRoZSBDZm4gTG9naWNhbCBJRCBvZiB0aGUgdGFyZ2V0IHF1ZXVlXG4gKiBAcGFyYW0gcXVldWVOYW1lIHRoZSBuYW1lIG9mIHRoZSB0YXJnZXQgcXVldWVcbiAqIHJldHVybnMgd2hldGhlciB0aGUgQ2ZuRnVuY3Rpb24gdXNlcyB0aGUgdGFyZ2V0IFNRUyBxdWV1ZSBhcyBhIERMUVxuICovXG5mdW5jdGlvbiBpc01hdGNoaW5nTGFtYmRhRnVuY3Rpb24oXG4gIG5vZGU6IENmbkZ1bmN0aW9uLFxuICBxdWV1ZUxvZ2ljYWxJZDogc3RyaW5nLFxuICBxdWV1ZU5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZFxuKTogYm9vbGVhbiB7XG4gIGNvbnN0IGRlYWRMZXR0ZXJDb25maWcgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKG5vZGUuZGVhZExldHRlckNvbmZpZyk7XG4gIGNvbnN0IHRhcmdldEFybiA9IGZsYXR0ZW5DZm5SZWZlcmVuY2UoXG4gICAgU3RhY2sub2Yobm9kZSkucmVzb2x2ZShkZWFkTGV0dGVyQ29uZmlnPy50YXJnZXRBcm4pID8/ICcnXG4gICk7XG4gIGlmIChcbiAgICBuZXcgUmVnRXhwKGAke3F1ZXVlTG9naWNhbElkfSg/IVtcXFxcd10pYCkudGVzdCh0YXJnZXRBcm4pIHx8XG4gICAgKHF1ZXVlTmFtZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBuZXcgUmVnRXhwKGA6JHtxdWV1ZU5hbWV9KD8hW1xcXFx3XFxcXC1fXFxcXC5dKWApLnRlc3QodGFyZ2V0QXJuKSlcbiAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuIl19