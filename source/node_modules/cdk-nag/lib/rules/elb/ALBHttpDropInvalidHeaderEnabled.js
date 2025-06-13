"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_elasticloadbalancingv2_1 = require("aws-cdk-lib/aws-elasticloadbalancingv2");
const nag_rules_1 = require("../../nag-rules");
/**
 * Application Load Balancers are enabled to drop invalid headers
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_elasticloadbalancingv2_1.CfnLoadBalancer) {
        const type = nag_rules_1.NagRules.resolveIfPrimitive(node, node.type);
        if (type == undefined || type == 'application') {
            const attributes = aws_cdk_lib_1.Stack.of(node).resolve(node.loadBalancerAttributes);
            if (attributes != undefined) {
                const reg = /"routing\.http\.drop_invalid_header_fields\.enabled","value":"true"/gm;
                if (JSON.stringify(attributes).search(reg) == -1) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQUxCSHR0cERyb3BJbnZhbGlkSGVhZGVyRW5hYmxlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9lbGIvQUxCSHR0cERyb3BJbnZhbGlkSGVhZGVyRW5hYmxlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7RUFHRTtBQUNGLCtCQUE2QjtBQUM3Qiw2Q0FBaUQ7QUFDakQsdUZBQXlFO0FBQ3pFLCtDQUE4RDtBQUU5RDs7O0dBR0c7QUFDSCxrQkFBZSxNQUFNLENBQUMsY0FBYyxDQUNsQyxDQUFDLElBQWlCLEVBQXFCLEVBQUU7SUFDdkMsSUFBSSxJQUFJLFlBQVksNENBQWUsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sSUFBSSxHQUFHLG9CQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxRCxJQUFJLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLGFBQWEsRUFBRSxDQUFDO1lBQy9DLE1BQU0sVUFBVSxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUN2RSxJQUFJLFVBQVUsSUFBSSxTQUFTLEVBQUUsQ0FBQztnQkFDNUIsTUFBTSxHQUFHLEdBQ1AsdUVBQXVFLENBQUM7Z0JBQzFFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDakQsT0FBTyw2QkFBaUIsQ0FBQyxhQUFhLENBQUM7Z0JBQ3pDLENBQUM7WUFDSCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sT0FBTyw2QkFBaUIsQ0FBQyxhQUFhLENBQUM7WUFDekMsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLDZCQUFpQixDQUFDLFNBQVMsQ0FBQztJQUNyQyxDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sNkJBQWlCLENBQUMsY0FBYyxDQUFDO0lBQzFDLENBQUM7QUFDSCxDQUFDLEVBQ0QsTUFBTSxFQUNOLEVBQUUsS0FBSyxFQUFFLElBQUEsWUFBSyxFQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUNsQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbkNvcHlyaWdodCBBbWF6b24uY29tLCBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiovXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ2ZuUmVzb3VyY2UsIFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ2ZuTG9hZEJhbGFuY2VyIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWVsYXN0aWNsb2FkYmFsYW5jaW5ndjInO1xuaW1wb3J0IHsgTmFnUnVsZUNvbXBsaWFuY2UsIE5hZ1J1bGVzIH0gZnJvbSAnLi4vLi4vbmFnLXJ1bGVzJztcblxuLyoqXG4gKiBBcHBsaWNhdGlvbiBMb2FkIEJhbGFuY2VycyBhcmUgZW5hYmxlZCB0byBkcm9wIGludmFsaWQgaGVhZGVyc1xuICogQHBhcmFtIG5vZGUgdGhlIENmblJlc291cmNlIHRvIGNoZWNrXG4gKi9cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShcbiAgKG5vZGU6IENmblJlc291cmNlKTogTmFnUnVsZUNvbXBsaWFuY2UgPT4ge1xuICAgIGlmIChub2RlIGluc3RhbmNlb2YgQ2ZuTG9hZEJhbGFuY2VyKSB7XG4gICAgICBjb25zdCB0eXBlID0gTmFnUnVsZXMucmVzb2x2ZUlmUHJpbWl0aXZlKG5vZGUsIG5vZGUudHlwZSk7XG4gICAgICBpZiAodHlwZSA9PSB1bmRlZmluZWQgfHwgdHlwZSA9PSAnYXBwbGljYXRpb24nKSB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKG5vZGUubG9hZEJhbGFuY2VyQXR0cmlidXRlcyk7XG4gICAgICAgIGlmIChhdHRyaWJ1dGVzICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnN0IHJlZyA9XG4gICAgICAgICAgICAvXCJyb3V0aW5nXFwuaHR0cFxcLmRyb3BfaW52YWxpZF9oZWFkZXJfZmllbGRzXFwuZW5hYmxlZFwiLFwidmFsdWVcIjpcInRydWVcIi9nbTtcbiAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkoYXR0cmlidXRlcykuc2VhcmNoKHJlZykgPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9OX0NPTVBMSUFOVDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLkNPTVBMSUFOVDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PVF9BUFBMSUNBQkxFO1xuICAgIH1cbiAgfSxcbiAgJ25hbWUnLFxuICB7IHZhbHVlOiBwYXJzZShfX2ZpbGVuYW1lKS5uYW1lIH1cbik7XG4iXX0=