"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_lex_1 = require("aws-cdk-lib/aws-lex");
const aws_logs_1 = require("aws-cdk-lib/aws-logs");
const nag_rules_1 = require("../../nag-rules");
/**
 * Lex Bot conversation logs are encrypted with KMS keys
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_lex_1.CfnBotAlias || node instanceof aws_lex_1.CfnBot) {
        const settingLocation = node instanceof aws_lex_1.CfnBotAlias
            ? node
            : aws_cdk_lib_1.Stack.of(node).resolve(node.testBotAliasSettings);
        const conversationLogSettings = aws_cdk_lib_1.Stack.of(node).resolve(settingLocation?.conversationLogSettings);
        if (conversationLogSettings !== undefined) {
            const audioLogSettings = aws_cdk_lib_1.Stack.of(node).resolve(conversationLogSettings.audioLogSettings) ??
                [];
            for (const log of audioLogSettings) {
                const resolvedLog = aws_cdk_lib_1.Stack.of(node).resolve(log);
                if (aws_cdk_lib_1.Stack.of(node).resolve(resolvedLog.enabled) === true) {
                    const resolvedDestination = aws_cdk_lib_1.Stack.of(node).resolve(resolvedLog.destination);
                    const s3Bucket = aws_cdk_lib_1.Stack.of(node).resolve(resolvedDestination.s3Bucket);
                    const kmsKeyArn = aws_cdk_lib_1.Stack.of(node).resolve(s3Bucket.kmsKeyArn);
                    if (kmsKeyArn === undefined) {
                        return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
                    }
                }
            }
            const textLogSettings = aws_cdk_lib_1.Stack.of(node).resolve(conversationLogSettings.textLogSettings) ?? [];
            for (const log of textLogSettings) {
                const resolvedLog = aws_cdk_lib_1.Stack.of(node).resolve(log);
                if (aws_cdk_lib_1.Stack.of(node).resolve(resolvedLog.enabled) === true) {
                    const resolvedDestination = aws_cdk_lib_1.Stack.of(node).resolve(resolvedLog.destination);
                    const cloudwatch = aws_cdk_lib_1.Stack.of(node).resolve(resolvedDestination.cloudWatch);
                    const logGroupLogicalId = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, cloudwatch.cloudWatchLogGroupArn);
                    let found = false;
                    for (const child of aws_cdk_lib_1.Stack.of(node).node.findAll()) {
                        if (child instanceof aws_logs_1.CfnLogGroup) {
                            if (logGroupLogicalId ===
                                nag_rules_1.NagRules.resolveResourceFromIntrinsic(child, child.logicalId)) {
                                found = true;
                                if (child.kmsKeyId === undefined) {
                                    return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
                                }
                                break;
                            }
                        }
                    }
                    if (!found) {
                        throw Error(`Unable to find the CloudWatch Log group "${JSON.stringify(logGroupLogicalId)}" used in one of Text Log Destinations in the CDK Application. Therefore the rule could not be validated.`);
                    }
                }
            }
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGV4Qm90QWxpYXNFbmNyeXB0ZWRDb252ZXJzYXRpb25Mb2dzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3J1bGVzL2xleC9MZXhCb3RBbGlhc0VuY3J5cHRlZENvbnZlcnNhdGlvbkxvZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0VBR0U7QUFDRiwrQkFBNkI7QUFDN0IsNkNBQWlEO0FBQ2pELGlEQUEwRDtBQUMxRCxtREFBbUQ7QUFDbkQsK0NBQThEO0FBRTlEOzs7R0FHRztBQUNILGtCQUFlLE1BQU0sQ0FBQyxjQUFjLENBQ2xDLENBQUMsSUFBaUIsRUFBcUIsRUFBRTtJQUN2QyxJQUFJLElBQUksWUFBWSxxQkFBVyxJQUFJLElBQUksWUFBWSxnQkFBTSxFQUFFLENBQUM7UUFDMUQsTUFBTSxlQUFlLEdBQ25CLElBQUksWUFBWSxxQkFBVztZQUN6QixDQUFDLENBQUMsSUFBSTtZQUNOLENBQUMsQ0FBQyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDeEQsTUFBTSx1QkFBdUIsR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQ3BELGVBQWUsRUFBRSx1QkFBdUIsQ0FDekMsQ0FBQztRQUNGLElBQUksdUJBQXVCLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDMUMsTUFBTSxnQkFBZ0IsR0FDcEIsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLGdCQUFnQixDQUFDO2dCQUNoRSxFQUFFLENBQUM7WUFDTCxLQUFLLE1BQU0sR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7Z0JBQ25DLE1BQU0sV0FBVyxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztn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QUssRUFBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FDbEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5Db3B5cmlnaHQgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4qL1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IENmblJlc291cmNlLCBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENmbkJvdCwgQ2ZuQm90QWxpYXMgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGV4JztcbmltcG9ydCB7IENmbkxvZ0dyb3VwIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWxvZ3MnO1xuaW1wb3J0IHsgTmFnUnVsZUNvbXBsaWFuY2UsIE5hZ1J1bGVzIH0gZnJvbSAnLi4vLi4vbmFnLXJ1bGVzJztcblxuLyoqXG4gKiBMZXggQm90IGNvbnZlcnNhdGlvbiBsb2dzIGFyZSBlbmNyeXB0ZWQgd2l0aCBLTVMga2V5c1xuICogQHBhcmFtIG5vZGUgdGhlIENmblJlc291cmNlIHRvIGNoZWNrXG4gKi9cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShcbiAgKG5vZGU6IENmblJlc291cmNlKTogTmFnUnVsZUNvbXBsaWFuY2UgPT4ge1xuICAgIGlmIChub2RlIGluc3RhbmNlb2YgQ2ZuQm90QWxpYXMgfHwgbm9kZSBpbnN0YW5jZW9mIENmbkJvdCkge1xuICAgICAgY29uc3Qgc2V0dGluZ0xvY2F0aW9uID1cbiAgICAgICAgbm9kZSBpbnN0YW5jZW9mIENmbkJvdEFsaWFzXG4gICAgICAgICAgPyBub2RlXG4gICAgICAgICAgOiBTdGFjay5vZihub2RlKS5yZXNvbHZlKG5vZGUudGVzdEJvdEFsaWFzU2V0dGluZ3MpO1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uTG9nU2V0dGluZ3MgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKFxuICAgICAgICBzZXR0aW5nTG9jYXRpb24/LmNvbnZlcnNhdGlvbkxvZ1NldHRpbmdzXG4gICAgICApO1xuICAgICAgaWYgKGNvbnZlcnNhdGlvbkxvZ1NldHRpbmdzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgYXVkaW9Mb2dTZXR0aW5ncyA9XG4gICAgICAgICAgU3RhY2sub2Yobm9kZSkucmVzb2x2ZShjb252ZXJzYXRpb25Mb2dTZXR0aW5ncy5hdWRpb0xvZ1NldHRpbmdzKSA/P1xuICAgICAgICAgIFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGxvZyBvZiBhdWRpb0xvZ1NldHRpbmdzKSB7XG4gICAgICAgICAgY29uc3QgcmVzb2x2ZWRMb2cgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKGxvZyk7XG4gICAgICAgICAgaWYgKFN0YWNrLm9mKG5vZGUpLnJlc29sdmUocmVzb2x2ZWRMb2cuZW5hYmxlZCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkRGVzdGluYXRpb24gPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKFxuICAgICAgICAgICAgICByZXNvbHZlZExvZy5kZXN0aW5hdGlvblxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IHMzQnVja2V0ID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShcbiAgICAgICAgICAgICAgcmVzb2x2ZWREZXN0aW5hdGlvbi5zM0J1Y2tldFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IGttc0tleUFybiA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUoczNCdWNrZXQua21zS2V5QXJuKTtcbiAgICAgICAgICAgIGlmIChrbXNLZXlBcm4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9OX0NPTVBMSUFOVDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGV4dExvZ1NldHRpbmdzID1cbiAgICAgICAgICBTdGFjay5vZihub2RlKS5yZXNvbHZlKGNvbnZlcnNhdGlvbkxvZ1NldHRpbmdzLnRleHRMb2dTZXR0aW5ncykgPz8gW107XG4gICAgICAgIGZvciAoY29uc3QgbG9nIG9mIHRleHRMb2dTZXR0aW5ncykge1xuICAgICAgICAgIGNvbnN0IHJlc29sdmVkTG9nID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShsb2cpO1xuICAgICAgICAgIGlmIChTdGFjay5vZihub2RlKS5yZXNvbHZlKHJlc29sdmVkTG9nLmVuYWJsZWQpID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCByZXNvbHZlZERlc3RpbmF0aW9uID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShcbiAgICAgICAgICAgICAgcmVzb2x2ZWRMb2cuZGVzdGluYXRpb25cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBjbG91ZHdhdGNoID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShcbiAgICAgICAgICAgICAgcmVzb2x2ZWREZXN0aW5hdGlvbi5jbG91ZFdhdGNoXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgbG9nR3JvdXBMb2dpY2FsSWQgPSBOYWdSdWxlcy5yZXNvbHZlUmVzb3VyY2VGcm9tSW50cmluc2ljKFxuICAgICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgICBjbG91ZHdhdGNoLmNsb3VkV2F0Y2hMb2dHcm91cEFyblxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBTdGFjay5vZihub2RlKS5ub2RlLmZpbmRBbGwoKSkge1xuICAgICAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBDZm5Mb2dHcm91cCkge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgIGxvZ0dyb3VwTG9naWNhbElkID09PVxuICAgICAgICAgICAgICAgICAgTmFnUnVsZXMucmVzb2x2ZVJlc291cmNlRnJvbUludHJpbnNpYyhjaGlsZCwgY2hpbGQubG9naWNhbElkKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkLmttc0tleUlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PTl9DT01QTElBTlQ7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYFVuYWJsZSB0byBmaW5kIHRoZSBDbG91ZFdhdGNoIExvZyBncm91cCBcIiR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgICBsb2dHcm91cExvZ2ljYWxJZFxuICAgICAgICAgICAgICAgICl9XCIgdXNlZCBpbiBvbmUgb2YgVGV4dCBMb2cgRGVzdGluYXRpb25zIGluIHRoZSBDREsgQXBwbGljYXRpb24uIFRoZXJlZm9yZSB0aGUgcnVsZSBjb3VsZCBub3QgYmUgdmFsaWRhdGVkLmBcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5DT01QTElBTlQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT1RfQVBQTElDQUJMRTtcbiAgICB9XG4gIH0sXG4gICduYW1lJyxcbiAgeyB2YWx1ZTogcGFyc2UoX19maWxlbmFtZSkubmFtZSB9XG4pO1xuIl19