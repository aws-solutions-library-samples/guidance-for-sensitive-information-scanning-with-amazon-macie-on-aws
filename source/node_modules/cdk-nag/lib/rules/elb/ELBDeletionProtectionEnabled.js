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
 * ALBs, NLBs, and GLBs have deletion protection enabled
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_elasticloadbalancingv2_1.CfnLoadBalancer) {
        const attributes = aws_cdk_lib_1.Stack.of(node).resolve(node.loadBalancerAttributes);
        if (attributes != undefined) {
            var deletionProtectionEnabled = false;
            for (const attr of attributes) {
                const resolvedAttr = aws_cdk_lib_1.Stack.of(node).resolve(attr);
                if (resolvedAttr.key != undefined &&
                    resolvedAttr.key == 'deletion_protection.enabled') {
                    if (resolvedAttr.value == 'true') {
                        deletionProtectionEnabled = true;
                    }
                }
            }
            if (!deletionProtectionEnabled) {
                return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
            }
        }
        else {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRUxCRGVsZXRpb25Qcm90ZWN0aW9uRW5hYmxlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9lbGIvRUxCRGVsZXRpb25Qcm90ZWN0aW9uRW5hYmxlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7RUFHRTtBQUNGLCtCQUE2QjtBQUM3Qiw2Q0FBaUQ7QUFDakQsdUZBQXlFO0FBQ3pFLCtDQUFvRDtBQUVwRDs7O0dBR0c7QUFDSCxrQkFBZSxNQUFNLENBQUMsY0FBYyxDQUNsQyxDQUFDLElBQWlCLEVBQXFCLEVBQUU7SUFDdkMsSUFBSSxJQUFJLFlBQVksNENBQWUsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sVUFBVSxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUN2RSxJQUFJLFVBQVUsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUM1QixJQUFJLHlCQUF5QixHQUFHLEtBQUssQ0FBQztZQUN0QyxLQUFLLE1BQU0sSUFBSSxJQUFJLFVBQVUsRUFBRSxDQUFDO2dCQUM5QixNQUFNLFlBQVksR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xELElBQ0UsWUFBWSxDQUFDLEdBQUcsSUFBSSxTQUFTO29CQUM3QixZQUFZLENBQUMsR0FBRyxJQUFJLDZCQUE2QixFQUNqRCxDQUFDO29CQUNELElBQUksWUFBWSxDQUFDLEtBQUssSUFBSSxNQUFNLEVBQUUsQ0FBQzt3QkFDakMseUJBQXlCLEdBQUcsSUFBSSxDQUFDO29CQUNuQyxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1lBQ0QsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7Z0JBQy9CLE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDO1lBQ3pDLENBQUM7UUFDSCxDQUFDO2FBQU0sQ0FBQztZQUNOLE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDO1FBQ3pDLENBQUM7UUFDRCxPQUFPLDZCQUFpQixDQUFDLFNBQVMsQ0FBQztJQUNyQyxDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sNkJBQWlCLENBQUMsY0FBYyxDQUFDO0lBQzFDLENBQUM7QUFDSCxDQUFDLEVBQ0QsTUFBTSxFQUNOLEVBQUUsS0FBSyxFQUFFLElBQUEsWUFBSyxFQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUNsQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbkNvcHlyaWdodCBBbWF6b24uY29tLCBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiovXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ2ZuUmVzb3VyY2UsIFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ2ZuTG9hZEJhbGFuY2VyIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWVsYXN0aWNsb2FkYmFsYW5jaW5ndjInO1xuaW1wb3J0IHsgTmFnUnVsZUNvbXBsaWFuY2UgfSBmcm9tICcuLi8uLi9uYWctcnVsZXMnO1xuXG4vKipcbiAqIEFMQnMsIE5MQnMsIGFuZCBHTEJzIGhhdmUgZGVsZXRpb24gcHJvdGVjdGlvbiBlbmFibGVkXG4gKiBAcGFyYW0gbm9kZSB0aGUgQ2ZuUmVzb3VyY2UgdG8gY2hlY2tcbiAqL1xuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmRlZmluZVByb3BlcnR5KFxuICAobm9kZTogQ2ZuUmVzb3VyY2UpOiBOYWdSdWxlQ29tcGxpYW5jZSA9PiB7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBDZm5Mb2FkQmFsYW5jZXIpIHtcbiAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKG5vZGUubG9hZEJhbGFuY2VyQXR0cmlidXRlcyk7XG4gICAgICBpZiAoYXR0cmlidXRlcyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIGRlbGV0aW9uUHJvdGVjdGlvbkVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICBjb25zdCByZXNvbHZlZEF0dHIgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKGF0dHIpO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHJlc29sdmVkQXR0ci5rZXkgIT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICByZXNvbHZlZEF0dHIua2V5ID09ICdkZWxldGlvbl9wcm90ZWN0aW9uLmVuYWJsZWQnXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAocmVzb2x2ZWRBdHRyLnZhbHVlID09ICd0cnVlJykge1xuICAgICAgICAgICAgICBkZWxldGlvblByb3RlY3Rpb25FbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkZWxldGlvblByb3RlY3Rpb25FbmFibGVkKSB7XG4gICAgICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PTl9DT01QTElBTlQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLkNPTVBMSUFOVDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PVF9BUFBMSUNBQkxFO1xuICAgIH1cbiAgfSxcbiAgJ25hbWUnLFxuICB7IHZhbHVlOiBwYXJzZShfX2ZpbGVuYW1lKS5uYW1lIH1cbik7XG4iXX0=