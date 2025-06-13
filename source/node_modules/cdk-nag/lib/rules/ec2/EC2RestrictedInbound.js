"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_ec2_1 = require("aws-cdk-lib/aws-ec2");
const nag_rules_1 = require("../../nag-rules");
/**
 * EC2 security groups do not allow for 0.0.0.0/0 or ::/0 inbound access
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_ec2_1.CfnSecurityGroup) {
        const ingressRules = aws_cdk_lib_1.Stack.of(node).resolve(node.securityGroupIngress);
        if (ingressRules != undefined) {
            for (const rule of ingressRules) {
                const resolvedRule = aws_cdk_lib_1.Stack.of(node).resolve(rule);
                const resolvedcidrIp = nag_rules_1.NagRules.resolveIfPrimitive(node, resolvedRule.cidrIp);
                const resolvedcidrIpv6 = nag_rules_1.NagRules.resolveIfPrimitive(node, resolvedRule.cidrIpv6);
                if (resolvedcidrIp != undefined && resolvedcidrIp.includes('/0')) {
                    return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
                }
                if (resolvedcidrIpv6 != undefined &&
                    resolvedcidrIpv6.includes('/0')) {
                    return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
                }
            }
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else if (node instanceof aws_ec2_1.CfnSecurityGroupIngress) {
        const resolvedcidrIp = nag_rules_1.NagRules.resolveIfPrimitive(node, node.cidrIp);
        const resolvedcidrIpv6 = nag_rules_1.NagRules.resolveIfPrimitive(node, node.cidrIpv6);
        if (resolvedcidrIp != undefined && resolvedcidrIp.includes('/0')) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        if (resolvedcidrIpv6 != undefined && resolvedcidrIpv6.includes('/0')) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRUMyUmVzdHJpY3RlZEluYm91bmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvZWMyL0VDMlJlc3RyaWN0ZWRJbmJvdW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7OztFQUdFO0FBQ0YsK0JBQTZCO0FBQzdCLDZDQUFpRDtBQUNqRCxpREFBZ0Y7QUFDaEYsK0NBQThEO0FBRTlEOzs7R0FHRztBQUNILGtCQUFlLE1BQU0sQ0FBQyxjQUFjLENBQ2xDLENBQUMsSUFBaUIsRUFBcUIsRUFBRTtJQUN2QyxJQUFJLElBQUksWUFBWSwwQkFBZ0IsRUFBRSxDQUFDO1FBQ3JDLE1BQU0sWUFBWSxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN2RSxJQUFJLFlBQVksSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUM5QixLQUFLLE1BQU0sSUFBSSxJQUFJLFlBQVksRUFBRSxDQUFDO2dCQUNoQyxNQUFNLFlBQVksR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xELE1BQU0sY0FBYyxHQUFHLG9CQUFRLENBQUMsa0JBQWtCLENBQ2hELElBQUksRUFDSixZQUFZLENBQUMsTUFBTSxDQUNwQixDQUFDO2dCQUNGLE1BQU0sZ0JBQWdCLEdBQUcsb0JBQVEsQ0FBQyxrQkFBa0IsQ0FDbEQsSUFBSSxFQUNKLFlBQVksQ0FBQyxRQUFRLENBQ3RCLENBQUM7Z0JBQ0YsSUFBSSxjQUFjLElBQUksU0FBUyxJQUFJLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztvQkFDakUsT0FBTyw2QkFBaUIsQ0FBQyxhQUFhLENBQUM7Z0JBQ3pDLENBQUM7Z0JBQ0QsSUFDRSxnQkFBZ0IsSUFBSSxTQUFTO29CQUM3QixnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQy9CLENBQUM7b0JBQ0QsT0FBTyw2QkFBaUIsQ0FBQyxhQUFhLENBQUM7Z0JBQ3pDLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUNELE9BQU8sNkJBQWlCLENBQUMsU0FBUyxDQUFDO0lBQ3JDLENBQUM7U0FBTSxJQUFJLElBQUksWUFBWSxpQ0FBdUIsRUFBRSxDQUFDO1FBQ25ELE1BQU0sY0FBYyxHQUFHLG9CQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0RSxNQUFNLGdCQUFnQixHQUFHLG9CQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxRSxJQUFJLGNBQWMsSUFBSSxTQUFTLElBQUksY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2pFLE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDO1FBQ3pDLENBQUM7UUFDRCxJQUFJLGdCQUFnQixJQUFJLFNBQVMsSUFBSSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNyRSxPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsT0FBTyw2QkFBaUIsQ0FBQyxTQUFTLENBQUM7SUFDckMsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLDZCQUFpQixDQUFDLGNBQWMsQ0FBQztJQUMxQyxDQUFDO0FBQ0gsQ0FBQyxFQUNELE1BQU0sRUFDTixFQUFFLEtBQUssRUFBRSxJQUFBLFlBQUssRUFBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FDbEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5Db3B5cmlnaHQgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4qL1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IENmblJlc291cmNlLCBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENmblNlY3VyaXR5R3JvdXAsIENmblNlY3VyaXR5R3JvdXBJbmdyZXNzIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWVjMic7XG5pbXBvcnQgeyBOYWdSdWxlQ29tcGxpYW5jZSwgTmFnUnVsZXMgfSBmcm9tICcuLi8uLi9uYWctcnVsZXMnO1xuXG4vKipcbiAqIEVDMiBzZWN1cml0eSBncm91cHMgZG8gbm90IGFsbG93IGZvciAwLjAuMC4wLzAgb3IgOjovMCBpbmJvdW5kIGFjY2Vzc1xuICogQHBhcmFtIG5vZGUgdGhlIENmblJlc291cmNlIHRvIGNoZWNrXG4gKi9cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShcbiAgKG5vZGU6IENmblJlc291cmNlKTogTmFnUnVsZUNvbXBsaWFuY2UgPT4ge1xuICAgIGlmIChub2RlIGluc3RhbmNlb2YgQ2ZuU2VjdXJpdHlHcm91cCkge1xuICAgICAgY29uc3QgaW5ncmVzc1J1bGVzID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShub2RlLnNlY3VyaXR5R3JvdXBJbmdyZXNzKTtcbiAgICAgIGlmIChpbmdyZXNzUnVsZXMgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvciAoY29uc3QgcnVsZSBvZiBpbmdyZXNzUnVsZXMpIHtcbiAgICAgICAgICBjb25zdCByZXNvbHZlZFJ1bGUgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKHJ1bGUpO1xuICAgICAgICAgIGNvbnN0IHJlc29sdmVkY2lkcklwID0gTmFnUnVsZXMucmVzb2x2ZUlmUHJpbWl0aXZlKFxuICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgIHJlc29sdmVkUnVsZS5jaWRySXBcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IHJlc29sdmVkY2lkcklwdjYgPSBOYWdSdWxlcy5yZXNvbHZlSWZQcmltaXRpdmUoXG4gICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgcmVzb2x2ZWRSdWxlLmNpZHJJcHY2XG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAocmVzb2x2ZWRjaWRySXAgIT0gdW5kZWZpbmVkICYmIHJlc29sdmVkY2lkcklwLmluY2x1ZGVzKCcvMCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9OX0NPTVBMSUFOVDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgcmVzb2x2ZWRjaWRySXB2NiAhPSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIHJlc29sdmVkY2lkcklwdjYuaW5jbHVkZXMoJy8wJylcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLkNPTVBMSUFOVDtcbiAgICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBDZm5TZWN1cml0eUdyb3VwSW5ncmVzcykge1xuICAgICAgY29uc3QgcmVzb2x2ZWRjaWRySXAgPSBOYWdSdWxlcy5yZXNvbHZlSWZQcmltaXRpdmUobm9kZSwgbm9kZS5jaWRySXApO1xuICAgICAgY29uc3QgcmVzb2x2ZWRjaWRySXB2NiA9IE5hZ1J1bGVzLnJlc29sdmVJZlByaW1pdGl2ZShub2RlLCBub2RlLmNpZHJJcHY2KTtcbiAgICAgIGlmIChyZXNvbHZlZGNpZHJJcCAhPSB1bmRlZmluZWQgJiYgcmVzb2x2ZWRjaWRySXAuaW5jbHVkZXMoJy8wJykpIHtcbiAgICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PTl9DT01QTElBTlQ7XG4gICAgICB9XG4gICAgICBpZiAocmVzb2x2ZWRjaWRySXB2NiAhPSB1bmRlZmluZWQgJiYgcmVzb2x2ZWRjaWRySXB2Ni5pbmNsdWRlcygnLzAnKSkge1xuICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9OX0NPTVBMSUFOVDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5DT01QTElBTlQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT1RfQVBQTElDQUJMRTtcbiAgICB9XG4gIH0sXG4gICduYW1lJyxcbiAgeyB2YWx1ZTogcGFyc2UoX19maWxlbmFtZSkubmFtZSB9XG4pO1xuIl19