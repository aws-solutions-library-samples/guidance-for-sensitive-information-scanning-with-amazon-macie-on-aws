"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_elasticloadbalancing_1 = require("aws-cdk-lib/aws-elasticloadbalancing");
const nag_rules_1 = require("../../nag-rules");
/**
 * CLBs use at least two AZs with the Cross-Zone Load Balancing feature enabled
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_elasticloadbalancing_1.CfnLoadBalancer) {
        if (node.crossZone == undefined) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        if (node.subnets == undefined) {
            if (node.availabilityZones == undefined ||
                node.availabilityZones.length < 2) {
                return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
            }
        }
        else if (node.subnets.length < 2) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        const crossZone = nag_rules_1.NagRules.resolveIfPrimitive(node, node.crossZone);
        if (crossZone != true) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRUxCQ3Jvc3Nab25lTG9hZEJhbGFuY2luZ0VuYWJsZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvZWxiL0VMQkNyb3NzWm9uZUxvYWRCYWxhbmNpbmdFbmFibGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7OztFQUdFO0FBQ0YsK0JBQTZCO0FBRTdCLG1GQUF1RTtBQUN2RSwrQ0FBOEQ7QUFFOUQ7OztHQUdHO0FBQ0gsa0JBQWUsTUFBTSxDQUFDLGNBQWMsQ0FDbEMsQ0FBQyxJQUFpQixFQUFxQixFQUFFO0lBQ3ZDLElBQUksSUFBSSxZQUFZLDBDQUFlLEVBQUUsQ0FBQztRQUNwQyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksU0FBUyxFQUFFLENBQUM7WUFDaEMsT0FBTyw2QkFBaUIsQ0FBQyxhQUFhLENBQUM7UUFDekMsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUM5QixJQUNFLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxTQUFTO2dCQUNuQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDakMsQ0FBQztnQkFDRCxPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztZQUN6QyxDQUFDO1FBQ0gsQ0FBQzthQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDbkMsT0FBTyw2QkFBaUIsQ0FBQyxhQUFhLENBQUM7UUFDekMsQ0FBQztRQUNELE1BQU0sU0FBUyxHQUFHLG9CQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRSxJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUN0QixPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsT0FBTyw2QkFBaUIsQ0FBQyxTQUFTLENBQUM7SUFDckMsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLDZCQUFpQixDQUFDLGNBQWMsQ0FBQztJQUMxQyxDQUFDO0FBQ0gsQ0FBQyxFQUNELE1BQU0sRUFDTixFQUFFLEtBQUssRUFBRSxJQUFBLFlBQUssRUFBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FDbEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5Db3B5cmlnaHQgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4qL1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IENmblJlc291cmNlIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ2ZuTG9hZEJhbGFuY2VyIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWVsYXN0aWNsb2FkYmFsYW5jaW5nJztcbmltcG9ydCB7IE5hZ1J1bGVDb21wbGlhbmNlLCBOYWdSdWxlcyB9IGZyb20gJy4uLy4uL25hZy1ydWxlcyc7XG5cbi8qKlxuICogQ0xCcyB1c2UgYXQgbGVhc3QgdHdvIEFacyB3aXRoIHRoZSBDcm9zcy1ab25lIExvYWQgQmFsYW5jaW5nIGZlYXR1cmUgZW5hYmxlZFxuICogQHBhcmFtIG5vZGUgdGhlIENmblJlc291cmNlIHRvIGNoZWNrXG4gKi9cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShcbiAgKG5vZGU6IENmblJlc291cmNlKTogTmFnUnVsZUNvbXBsaWFuY2UgPT4ge1xuICAgIGlmIChub2RlIGluc3RhbmNlb2YgQ2ZuTG9hZEJhbGFuY2VyKSB7XG4gICAgICBpZiAobm9kZS5jcm9zc1pvbmUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGUuc3VibmV0cyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIG5vZGUuYXZhaWxhYmlsaXR5Wm9uZXMgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgbm9kZS5hdmFpbGFiaWxpdHlab25lcy5sZW5ndGggPCAyXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG5vZGUuc3VibmV0cy5sZW5ndGggPCAyKSB7XG4gICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgfVxuICAgICAgY29uc3QgY3Jvc3Nab25lID0gTmFnUnVsZXMucmVzb2x2ZUlmUHJpbWl0aXZlKG5vZGUsIG5vZGUuY3Jvc3Nab25lKTtcbiAgICAgIGlmIChjcm9zc1pvbmUgIT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9OX0NPTVBMSUFOVDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5DT01QTElBTlQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT1RfQVBQTElDQUJMRTtcbiAgICB9XG4gIH0sXG4gICduYW1lJyxcbiAgeyB2YWx1ZTogcGFyc2UoX19maWxlbmFtZSkubmFtZSB9XG4pO1xuIl19