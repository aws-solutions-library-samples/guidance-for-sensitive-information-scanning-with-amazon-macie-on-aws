"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const nag_rules_1 = require("../../nag-rules");
/**
 * API Gateway stages have logging enabled
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_apigateway_1.CfnStage) {
        if (node.methodSettings == undefined) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        const methodSettings = aws_cdk_lib_1.Stack.of(node).resolve(node.methodSettings);
        let found = false;
        for (const setting of methodSettings) {
            const resolvedSetting = aws_cdk_lib_1.Stack.of(node).resolve(setting);
            if (resolvedSetting?.httpMethod == '*' &&
                resolvedSetting?.resourcePath == '/*' &&
                (resolvedSetting?.loggingLevel == aws_apigateway_1.MethodLoggingLevel.ERROR ||
                    resolvedSetting?.loggingLevel == aws_apigateway_1.MethodLoggingLevel.INFO)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQVBJR1dFeGVjdXRpb25Mb2dnaW5nRW5hYmxlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9hcGlndy9BUElHV0V4ZWN1dGlvbkxvZ2dpbmdFbmFibGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7OztFQUdFO0FBQ0YsK0JBQTZCO0FBQzdCLDZDQUFpRDtBQUNqRCwrREFBMEU7QUFDMUUsK0NBQW9EO0FBRXBEOzs7R0FHRztBQUNILGtCQUFlLE1BQU0sQ0FBQyxjQUFjLENBQ2xDLENBQUMsSUFBaUIsRUFBcUIsRUFBRTtJQUN2QyxJQUFJLElBQUksWUFBWSx5QkFBUSxFQUFFLENBQUM7UUFDN0IsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQ3JDLE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDO1FBQ3pDLENBQUM7UUFDRCxNQUFNLGNBQWMsR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ25FLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNsQixLQUFLLE1BQU0sT0FBTyxJQUFJLGNBQWMsRUFBRSxDQUFDO1lBQ3JDLE1BQU0sZUFBZSxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4RCxJQUNFLGVBQWUsRUFBRSxVQUFVLElBQUksR0FBRztnQkFDbEMsZUFBZSxFQUFFLFlBQVksSUFBSSxJQUFJO2dCQUNyQyxDQUFDLGVBQWUsRUFBRSxZQUFZLElBQUksbUNBQWtCLENBQUMsS0FBSztvQkFDeEQsZUFBZSxFQUFFLFlBQVksSUFBSSxtQ0FBa0IsQ0FBQyxJQUFJLENBQUMsRUFDM0QsQ0FBQztnQkFDRCxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUNiLE1BQU07WUFDUixDQUFDO1FBQ0gsQ0FBQztRQUNELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNYLE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDO1FBQ3pDLENBQUM7UUFDRCxPQUFPLDZCQUFpQixDQUFDLFNBQVMsQ0FBQztJQUNyQyxDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sNkJBQWlCLENBQUMsY0FBYyxDQUFDO0lBQzFDLENBQUM7QUFDSCxDQUFDLEVBQ0QsTUFBTSxFQUNOLEVBQUUsS0FBSyxFQUFFLElBQUEsWUFBSyxFQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUNsQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbkNvcHlyaWdodCBBbWF6b24uY29tLCBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiovXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ2ZuUmVzb3VyY2UsIFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ2ZuU3RhZ2UsIE1ldGhvZExvZ2dpbmdMZXZlbCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5JztcbmltcG9ydCB7IE5hZ1J1bGVDb21wbGlhbmNlIH0gZnJvbSAnLi4vLi4vbmFnLXJ1bGVzJztcblxuLyoqXG4gKiBBUEkgR2F0ZXdheSBzdGFnZXMgaGF2ZSBsb2dnaW5nIGVuYWJsZWRcbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5SZXNvdXJjZSB0byBjaGVja1xuICovXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIChub2RlOiBDZm5SZXNvdXJjZSk6IE5hZ1J1bGVDb21wbGlhbmNlID0+IHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENmblN0YWdlKSB7XG4gICAgICBpZiAobm9kZS5tZXRob2RTZXR0aW5ncyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PTl9DT01QTElBTlQ7XG4gICAgICB9XG4gICAgICBjb25zdCBtZXRob2RTZXR0aW5ncyA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUobm9kZS5tZXRob2RTZXR0aW5ncyk7XG4gICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgIGZvciAoY29uc3Qgc2V0dGluZyBvZiBtZXRob2RTZXR0aW5ncykge1xuICAgICAgICBjb25zdCByZXNvbHZlZFNldHRpbmcgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKHNldHRpbmcpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgcmVzb2x2ZWRTZXR0aW5nPy5odHRwTWV0aG9kID09ICcqJyAmJlxuICAgICAgICAgIHJlc29sdmVkU2V0dGluZz8ucmVzb3VyY2VQYXRoID09ICcvKicgJiZcbiAgICAgICAgICAocmVzb2x2ZWRTZXR0aW5nPy5sb2dnaW5nTGV2ZWwgPT0gTWV0aG9kTG9nZ2luZ0xldmVsLkVSUk9SIHx8XG4gICAgICAgICAgICByZXNvbHZlZFNldHRpbmc/LmxvZ2dpbmdMZXZlbCA9PSBNZXRob2RMb2dnaW5nTGV2ZWwuSU5GTylcbiAgICAgICAgKSB7XG4gICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLkNPTVBMSUFOVDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PVF9BUFBMSUNBQkxFO1xuICAgIH1cbiAgfSxcbiAgJ25hbWUnLFxuICB7IHZhbHVlOiBwYXJzZShfX2ZpbGVuYW1lKS5uYW1lIH1cbik7XG4iXX0=