"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
const nag_rules_1 = require("../../nag-rules");
const flatten_cfn_reference_1 = require("../../utils/flatten-cfn-reference");
/**
 * IAM users, roles, and groups do not use AWS managed policies
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_iam_1.CfnGroup ||
        node instanceof aws_iam_1.CfnUser ||
        node instanceof aws_iam_1.CfnRole) {
        const managedPolicyArns = (aws_cdk_lib_1.Stack.of(node).resolve(node.managedPolicyArns));
        const findings = new Set();
        if (managedPolicyArns !== undefined) {
            managedPolicyArns
                .map((policy) => (0, flatten_cfn_reference_1.flattenCfnReference)(aws_cdk_lib_1.Stack.of(node).resolve(policy)))
                .filter((policy) => policy.includes(':iam::aws:'))
                .forEach((policy) => findings.add(`Policy::${policy}`));
        }
        return findings.size ? [...findings] : nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSUFNTm9NYW5hZ2VkUG9saWNpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvaWFtL0lBTU5vTWFuYWdlZFBvbGljaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7OztFQUdFO0FBQ0YsK0JBQTZCO0FBQzdCLDZDQUFpRDtBQUNqRCxpREFBaUU7QUFDakUsK0NBSXlCO0FBQ3pCLDZFQUF3RTtBQUV4RTs7O0dBR0c7QUFDSCxrQkFBZSxNQUFNLENBQUMsY0FBYyxDQUNsQyxDQUFDLElBQWlCLEVBQWlCLEVBQUU7SUFDbkMsSUFDRSxJQUFJLFlBQVksa0JBQVE7UUFDeEIsSUFBSSxZQUFZLGlCQUFPO1FBQ3ZCLElBQUksWUFBWSxpQkFBTyxFQUN2QixDQUFDO1FBQ0QsTUFBTSxpQkFBaUIsR0FBYSxDQUNsQyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQy9DLENBQUM7UUFDRixNQUFNLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztRQUMzQyxJQUFJLGlCQUFpQixLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3BDLGlCQUFpQjtpQkFDZCxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLElBQUEsMkNBQW1CLEVBQUMsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7aUJBQ3BFLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDakQsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFDRCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsNkJBQWlCLENBQUMsU0FBUyxDQUFDO0lBQ3JFLENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTyw2QkFBaUIsQ0FBQyxjQUFjLENBQUM7SUFDMUMsQ0FBQztBQUNILENBQUMsRUFDRCxNQUFNLEVBQ04sRUFBRSxLQUFLLEVBQUUsSUFBQSxZQUFLLEVBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQ2xDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuQ29weXJpZ2h0IEFtYXpvbi5jb20sIEluYy4gb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5TUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuKi9cbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDZm5SZXNvdXJjZSwgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDZm5Sb2xlLCBDZm5Vc2VyLCBDZm5Hcm91cCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xuaW1wb3J0IHtcbiAgTmFnUnVsZUNvbXBsaWFuY2UsXG4gIE5hZ1J1bGVGaW5kaW5nLFxuICBOYWdSdWxlUmVzdWx0LFxufSBmcm9tICcuLi8uLi9uYWctcnVsZXMnO1xuaW1wb3J0IHsgZmxhdHRlbkNmblJlZmVyZW5jZSB9IGZyb20gJy4uLy4uL3V0aWxzL2ZsYXR0ZW4tY2ZuLXJlZmVyZW5jZSc7XG5cbi8qKlxuICogSUFNIHVzZXJzLCByb2xlcywgYW5kIGdyb3VwcyBkbyBub3QgdXNlIEFXUyBtYW5hZ2VkIHBvbGljaWVzXG4gKiBAcGFyYW0gbm9kZSB0aGUgQ2ZuUmVzb3VyY2UgdG8gY2hlY2tcbiAqL1xuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmRlZmluZVByb3BlcnR5KFxuICAobm9kZTogQ2ZuUmVzb3VyY2UpOiBOYWdSdWxlUmVzdWx0ID0+IHtcbiAgICBpZiAoXG4gICAgICBub2RlIGluc3RhbmNlb2YgQ2ZuR3JvdXAgfHxcbiAgICAgIG5vZGUgaW5zdGFuY2VvZiBDZm5Vc2VyIHx8XG4gICAgICBub2RlIGluc3RhbmNlb2YgQ2ZuUm9sZVxuICAgICkge1xuICAgICAgY29uc3QgbWFuYWdlZFBvbGljeUFybnMgPSA8c3RyaW5nW10+KFxuICAgICAgICBTdGFjay5vZihub2RlKS5yZXNvbHZlKG5vZGUubWFuYWdlZFBvbGljeUFybnMpXG4gICAgICApO1xuICAgICAgY29uc3QgZmluZGluZ3MgPSBuZXcgU2V0PE5hZ1J1bGVGaW5kaW5nPigpO1xuICAgICAgaWYgKG1hbmFnZWRQb2xpY3lBcm5zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbWFuYWdlZFBvbGljeUFybnNcbiAgICAgICAgICAubWFwKChwb2xpY3kpID0+IGZsYXR0ZW5DZm5SZWZlcmVuY2UoU3RhY2sub2Yobm9kZSkucmVzb2x2ZShwb2xpY3kpKSlcbiAgICAgICAgICAuZmlsdGVyKChwb2xpY3kpID0+IHBvbGljeS5pbmNsdWRlcygnOmlhbTo6YXdzOicpKVxuICAgICAgICAgIC5mb3JFYWNoKChwb2xpY3kpID0+IGZpbmRpbmdzLmFkZChgUG9saWN5Ojoke3BvbGljeX1gKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmluZGluZ3Muc2l6ZSA/IFsuLi5maW5kaW5nc10gOiBOYWdSdWxlQ29tcGxpYW5jZS5DT01QTElBTlQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT1RfQVBQTElDQUJMRTtcbiAgICB9XG4gIH0sXG4gICduYW1lJyxcbiAgeyB2YWx1ZTogcGFyc2UoX19maWxlbmFtZSkubmFtZSB9XG4pO1xuIl19