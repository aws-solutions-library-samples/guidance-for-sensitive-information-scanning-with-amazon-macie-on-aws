"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_elasticloadbalancingv2_1 = require("aws-cdk-lib/aws-elasticloadbalancingv2");
const aws_wafv2_1 = require("aws-cdk-lib/aws-wafv2");
const nag_rules_1 = require("../../nag-rules");
/**
 * ALBs are associated with AWS WAFv2 web ACLs
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_elasticloadbalancingv2_1.CfnLoadBalancer) {
        const type = nag_rules_1.NagRules.resolveIfPrimitive(node, node.type);
        if (type === undefined || type === 'application') {
            const loadBalancerLogicalId = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, node.ref);
            let found = false;
            for (const child of aws_cdk_lib_1.Stack.of(node).node.findAll()) {
                if (child instanceof aws_wafv2_1.CfnWebACLAssociation) {
                    if (isMatchingWebACLAssociation(child, loadBalancerLogicalId)) {
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
 * Helper function to check whether a given Web ACL Association is associated with the given Load Balancer
 * @param node the CfnWebACLAssociation to check
 * @param loadBalancerLogicalId the Cfn Logical ID of the Load Balancer
 * returns whether the CfnWebACLAssociation is associates with the given Load Balancer
 */
function isMatchingWebACLAssociation(node, loadBalancerLogicalId) {
    const resourceLogicalId = JSON.stringify(aws_cdk_lib_1.Stack.of(node).resolve(node.resourceArn));
    if (new RegExp(`${loadBalancerLogicalId}(?![\\w])`, 'gm').test(resourceLogicalId)) {
        return true;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQUxCV0FGRW5hYmxlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9lbGIvQUxCV0FGRW5hYmxlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7RUFHRTtBQUNGLCtCQUE2QjtBQUM3Qiw2Q0FBaUQ7QUFDakQsdUZBQXlFO0FBQ3pFLHFEQUE2RDtBQUM3RCwrQ0FBOEQ7QUFFOUQ7OztHQUdHO0FBRUgsa0JBQWUsTUFBTSxDQUFDLGNBQWMsQ0FDbEMsQ0FBQyxJQUFpQixFQUFxQixFQUFFO0lBQ3ZDLElBQUksSUFBSSxZQUFZLDRDQUFlLEVBQUUsQ0FBQztRQUNwQyxNQUFNLElBQUksR0FBRyxvQkFBUSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUQsSUFBSSxJQUFJLEtBQUssU0FBUyxJQUFJLElBQUksS0FBSyxhQUFhLEVBQUUsQ0FBQztZQUNqRCxNQUFNLHFCQUFxQixHQUFHLG9CQUFRLENBQUMsNEJBQTRCLENBQ2pFLElBQUksRUFDSixJQUFJLENBQUMsR0FBRyxDQUNULENBQUM7WUFDRixJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbEIsS0FBSyxNQUFNLEtBQUssSUFBSSxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQztnQkFDbEQsSUFBSSxLQUFLLFlBQVksZ0NBQW9CLEVBQUUsQ0FBQztvQkFDMUMsSUFBSSwyQkFBMkIsQ0FBQyxLQUFLLEVBQUUscUJBQXFCLENBQUMsRUFBRSxDQUFDO3dCQUM5RCxLQUFLLEdBQUcsSUFBSSxDQUFDO3dCQUNiLE1BQU07b0JBQ1IsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQztZQUNELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDWCxPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztZQUN6QyxDQUFDO1FBQ0gsQ0FBQztRQUNELE9BQU8sNkJBQWlCLENBQUMsU0FBUyxDQUFDO0lBQ3JDLENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTyw2QkFBaUIsQ0FBQyxjQUFjLENBQUM7SUFDMUMsQ0FBQztBQUNILENBQUMsRUFDRCxNQUFNLEVBQ04sRUFBRSxLQUFLLEVBQUUsSUFBQSxZQUFLLEVBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQ2xDLENBQUM7QUFFRjs7Ozs7R0FLRztBQUNILFNBQVMsMkJBQTJCLENBQ2xDLElBQTBCLEVBQzFCLHFCQUE2QjtJQUU3QixNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQ3RDLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQ3pDLENBQUM7SUFDRixJQUNFLElBQUksTUFBTSxDQUFDLEdBQUcscUJBQXFCLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ3hELGlCQUFpQixDQUNsQixFQUNELENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuQ29weXJpZ2h0IEFtYXpvbi5jb20sIEluYy4gb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5TUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuKi9cbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDZm5SZXNvdXJjZSwgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDZm5Mb2FkQmFsYW5jZXIgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWxhc3RpY2xvYWRiYWxhbmNpbmd2Mic7XG5pbXBvcnQgeyBDZm5XZWJBQ0xBc3NvY2lhdGlvbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy13YWZ2Mic7XG5pbXBvcnQgeyBOYWdSdWxlQ29tcGxpYW5jZSwgTmFnUnVsZXMgfSBmcm9tICcuLi8uLi9uYWctcnVsZXMnO1xuXG4vKipcbiAqIEFMQnMgYXJlIGFzc29jaWF0ZWQgd2l0aCBBV1MgV0FGdjIgd2ViIEFDTHNcbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5SZXNvdXJjZSB0byBjaGVja1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShcbiAgKG5vZGU6IENmblJlc291cmNlKTogTmFnUnVsZUNvbXBsaWFuY2UgPT4ge1xuICAgIGlmIChub2RlIGluc3RhbmNlb2YgQ2ZuTG9hZEJhbGFuY2VyKSB7XG4gICAgICBjb25zdCB0eXBlID0gTmFnUnVsZXMucmVzb2x2ZUlmUHJpbWl0aXZlKG5vZGUsIG5vZGUudHlwZSk7XG4gICAgICBpZiAodHlwZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGUgPT09ICdhcHBsaWNhdGlvbicpIHtcbiAgICAgICAgY29uc3QgbG9hZEJhbGFuY2VyTG9naWNhbElkID0gTmFnUnVsZXMucmVzb2x2ZVJlc291cmNlRnJvbUludHJpbnNpYyhcbiAgICAgICAgICBub2RlLFxuICAgICAgICAgIG5vZGUucmVmXG4gICAgICAgICk7XG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIFN0YWNrLm9mKG5vZGUpLm5vZGUuZmluZEFsbCgpKSB7XG4gICAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgQ2ZuV2ViQUNMQXNzb2NpYXRpb24pIHtcbiAgICAgICAgICAgIGlmIChpc01hdGNoaW5nV2ViQUNMQXNzb2NpYXRpb24oY2hpbGQsIGxvYWRCYWxhbmNlckxvZ2ljYWxJZCkpIHtcbiAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuQ09NUExJQU5UO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9UX0FQUExJQ0FCTEU7XG4gICAgfVxuICB9LFxuICAnbmFtZScsXG4gIHsgdmFsdWU6IHBhcnNlKF9fZmlsZW5hbWUpLm5hbWUgfVxuKTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY2hlY2sgd2hldGhlciBhIGdpdmVuIFdlYiBBQ0wgQXNzb2NpYXRpb24gaXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBMb2FkIEJhbGFuY2VyXG4gKiBAcGFyYW0gbm9kZSB0aGUgQ2ZuV2ViQUNMQXNzb2NpYXRpb24gdG8gY2hlY2tcbiAqIEBwYXJhbSBsb2FkQmFsYW5jZXJMb2dpY2FsSWQgdGhlIENmbiBMb2dpY2FsIElEIG9mIHRoZSBMb2FkIEJhbGFuY2VyXG4gKiByZXR1cm5zIHdoZXRoZXIgdGhlIENmbldlYkFDTEFzc29jaWF0aW9uIGlzIGFzc29jaWF0ZXMgd2l0aCB0aGUgZ2l2ZW4gTG9hZCBCYWxhbmNlclxuICovXG5mdW5jdGlvbiBpc01hdGNoaW5nV2ViQUNMQXNzb2NpYXRpb24oXG4gIG5vZGU6IENmbldlYkFDTEFzc29jaWF0aW9uLFxuICBsb2FkQmFsYW5jZXJMb2dpY2FsSWQ6IHN0cmluZ1xuKTogYm9vbGVhbiB7XG4gIGNvbnN0IHJlc291cmNlTG9naWNhbElkID0gSlNPTi5zdHJpbmdpZnkoXG4gICAgU3RhY2sub2Yobm9kZSkucmVzb2x2ZShub2RlLnJlc291cmNlQXJuKVxuICApO1xuICBpZiAoXG4gICAgbmV3IFJlZ0V4cChgJHtsb2FkQmFsYW5jZXJMb2dpY2FsSWR9KD8hW1xcXFx3XSlgLCAnZ20nKS50ZXN0KFxuICAgICAgcmVzb3VyY2VMb2dpY2FsSWRcbiAgICApXG4gICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbiJdfQ==