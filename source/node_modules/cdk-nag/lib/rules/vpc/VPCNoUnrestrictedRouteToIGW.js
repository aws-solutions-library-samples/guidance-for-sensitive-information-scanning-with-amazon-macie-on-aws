"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_ec2_1 = require("aws-cdk-lib/aws-ec2");
const nag_rules_1 = require("../../nag-rules");
/**
 * Route tables do not have unrestricted routes ('0.0.0.0/0' or '::/0') to IGWs
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_ec2_1.CfnRoute) {
        if (node.gatewayId != undefined) {
            const destinationCidrBlock = nag_rules_1.NagRules.resolveIfPrimitive(node, node.destinationCidrBlock);
            const destinationIpv6CidrBlock = nag_rules_1.NagRules.resolveIfPrimitive(node, node.destinationIpv6CidrBlock);
            if (destinationCidrBlock != undefined &&
                destinationCidrBlock.includes('/0')) {
                return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
            }
            if (destinationIpv6CidrBlock != undefined &&
                destinationIpv6CidrBlock.includes('/0')) {
                return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
            }
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlBDTm9VbnJlc3RyaWN0ZWRSb3V0ZVRvSUdXLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3J1bGVzL3ZwYy9WUENOb1VucmVzdHJpY3RlZFJvdXRlVG9JR1cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0VBR0U7QUFDRiwrQkFBNkI7QUFFN0IsaURBQStDO0FBQy9DLCtDQUE4RDtBQUU5RDs7O0dBR0c7QUFDSCxrQkFBZSxNQUFNLENBQUMsY0FBYyxDQUNsQyxDQUFDLElBQWlCLEVBQXFCLEVBQUU7SUFDdkMsSUFBSSxJQUFJLFlBQVksa0JBQVEsRUFBRSxDQUFDO1FBQzdCLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUNoQyxNQUFNLG9CQUFvQixHQUFHLG9CQUFRLENBQUMsa0JBQWtCLENBQ3RELElBQUksRUFDSixJQUFJLENBQUMsb0JBQW9CLENBQzFCLENBQUM7WUFDRixNQUFNLHdCQUF3QixHQUFHLG9CQUFRLENBQUMsa0JBQWtCLENBQzFELElBQUksRUFDSixJQUFJLENBQUMsd0JBQXdCLENBQzlCLENBQUM7WUFDRixJQUNFLG9CQUFvQixJQUFJLFNBQVM7Z0JBQ2pDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDbkMsQ0FBQztnQkFDRCxPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztZQUN6QyxDQUFDO1lBQ0QsSUFDRSx3QkFBd0IsSUFBSSxTQUFTO2dCQUNyQyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQ3ZDLENBQUM7Z0JBQ0QsT0FBTyw2QkFBaUIsQ0FBQyxhQUFhLENBQUM7WUFDekMsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLDZCQUFpQixDQUFDLFNBQVMsQ0FBQztJQUNyQyxDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sNkJBQWlCLENBQUMsY0FBYyxDQUFDO0lBQzFDLENBQUM7QUFDSCxDQUFDLEVBQ0QsTUFBTSxFQUNOLEVBQUUsS0FBSyxFQUFFLElBQUEsWUFBSyxFQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUNsQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbkNvcHlyaWdodCBBbWF6b24uY29tLCBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiovXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ2ZuUmVzb3VyY2UgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDZm5Sb3V0ZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1lYzInO1xuaW1wb3J0IHsgTmFnUnVsZUNvbXBsaWFuY2UsIE5hZ1J1bGVzIH0gZnJvbSAnLi4vLi4vbmFnLXJ1bGVzJztcblxuLyoqXG4gKiBSb3V0ZSB0YWJsZXMgZG8gbm90IGhhdmUgdW5yZXN0cmljdGVkIHJvdXRlcyAoJzAuMC4wLjAvMCcgb3IgJzo6LzAnKSB0byBJR1dzXG4gKiBAcGFyYW0gbm9kZSB0aGUgQ2ZuUmVzb3VyY2UgdG8gY2hlY2tcbiAqL1xuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmRlZmluZVByb3BlcnR5KFxuICAobm9kZTogQ2ZuUmVzb3VyY2UpOiBOYWdSdWxlQ29tcGxpYW5jZSA9PiB7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBDZm5Sb3V0ZSkge1xuICAgICAgaWYgKG5vZGUuZ2F0ZXdheUlkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBkZXN0aW5hdGlvbkNpZHJCbG9jayA9IE5hZ1J1bGVzLnJlc29sdmVJZlByaW1pdGl2ZShcbiAgICAgICAgICBub2RlLFxuICAgICAgICAgIG5vZGUuZGVzdGluYXRpb25DaWRyQmxvY2tcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZGVzdGluYXRpb25JcHY2Q2lkckJsb2NrID0gTmFnUnVsZXMucmVzb2x2ZUlmUHJpbWl0aXZlKFxuICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgbm9kZS5kZXN0aW5hdGlvbklwdjZDaWRyQmxvY2tcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGRlc3RpbmF0aW9uQ2lkckJsb2NrICE9IHVuZGVmaW5lZCAmJlxuICAgICAgICAgIGRlc3RpbmF0aW9uQ2lkckJsb2NrLmluY2x1ZGVzKCcvMCcpXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICBkZXN0aW5hdGlvbklwdjZDaWRyQmxvY2sgIT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgZGVzdGluYXRpb25JcHY2Q2lkckJsb2NrLmluY2x1ZGVzKCcvMCcpXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuQ09NUExJQU5UO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9UX0FQUExJQ0FCTEU7XG4gICAgfVxuICB9LFxuICAnbmFtZScsXG4gIHsgdmFsdWU6IHBhcnNlKF9fZmlsZW5hbWUpLm5hbWUgfVxuKTtcbiJdfQ==