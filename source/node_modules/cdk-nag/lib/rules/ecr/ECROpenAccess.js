"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_ecr_1 = require("aws-cdk-lib/aws-ecr");
const nag_rules_1 = require("../../nag-rules");
/**
 * ECR Repositories do not allow open access
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_ecr_1.CfnRegistryPolicy) {
        const policyText = aws_cdk_lib_1.Stack.of(node).resolve(node.policyText);
        const compliant = checkStatement(policyText);
        if (compliant !== true) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else if (node instanceof aws_ecr_1.CfnRepository) {
        const policyText = aws_cdk_lib_1.Stack.of(node).resolve(node.repositoryPolicyText);
        const compliant = checkStatement(policyText);
        if (compliant !== true) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
/**
 * Helper function for parsing through the policy statement
 * @param policyText the JSON policy text
 * @returns boolean
 */
function checkStatement(policyText) {
    if (policyText == undefined || policyText.Statement == undefined) {
        return true;
    }
    for (const statement of policyText.Statement) {
        const effect = statement.Effect;
        if (effect == 'Allow') {
            const awsString = statement.Principal
                ? JSON.stringify(statement.Principal)
                : '';
            if (awsString.includes('*')) {
                return false;
            }
        }
    }
    return true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRUNST3BlbkFjY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9lY3IvRUNST3BlbkFjY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7RUFHRTtBQUNGLCtCQUE2QjtBQUM3Qiw2Q0FBaUQ7QUFDakQsaURBQXVFO0FBQ3ZFLCtDQUFvRDtBQUVwRDs7O0dBR0c7QUFDSCxrQkFBZSxNQUFNLENBQUMsY0FBYyxDQUNsQyxDQUFDLElBQWlCLEVBQXFCLEVBQUU7SUFDdkMsSUFBSSxJQUFJLFlBQVksMkJBQWlCLEVBQUUsQ0FBQztRQUN0QyxNQUFNLFVBQVUsR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNELE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3QyxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUN2QixPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsT0FBTyw2QkFBaUIsQ0FBQyxTQUFTLENBQUM7SUFDckMsQ0FBQztTQUFNLElBQUksSUFBSSxZQUFZLHVCQUFhLEVBQUUsQ0FBQztRQUN6QyxNQUFNLFVBQVUsR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDckUsTUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdDLElBQUksU0FBUyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3ZCLE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDO1FBQ3pDLENBQUM7UUFDRCxPQUFPLDZCQUFpQixDQUFDLFNBQVMsQ0FBQztJQUNyQyxDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sNkJBQWlCLENBQUMsY0FBYyxDQUFDO0lBQzFDLENBQUM7QUFDSCxDQUFDLEVBQ0QsTUFBTSxFQUNOLEVBQUUsS0FBSyxFQUFFLElBQUEsWUFBSyxFQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUNsQyxDQUFDO0FBRUY7Ozs7R0FJRztBQUNILFNBQVMsY0FBYyxDQUFDLFVBQWU7SUFDckMsSUFBSSxVQUFVLElBQUksU0FBUyxJQUFJLFVBQVUsQ0FBQyxTQUFTLElBQUksU0FBUyxFQUFFLENBQUM7UUFDakUsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QsS0FBSyxNQUFNLFNBQVMsSUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDN0MsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUNoQyxJQUFJLE1BQU0sSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUN0QixNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUztnQkFDbkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztnQkFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNQLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUM1QixPQUFPLEtBQUssQ0FBQztZQUNmLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5Db3B5cmlnaHQgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4qL1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IENmblJlc291cmNlLCBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENmblJlZ2lzdHJ5UG9saWN5LCBDZm5SZXBvc2l0b3J5IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWVjcic7XG5pbXBvcnQgeyBOYWdSdWxlQ29tcGxpYW5jZSB9IGZyb20gJy4uLy4uL25hZy1ydWxlcyc7XG5cbi8qKlxuICogRUNSIFJlcG9zaXRvcmllcyBkbyBub3QgYWxsb3cgb3BlbiBhY2Nlc3NcbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5SZXNvdXJjZSB0byBjaGVja1xuICovXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIChub2RlOiBDZm5SZXNvdXJjZSk6IE5hZ1J1bGVDb21wbGlhbmNlID0+IHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENmblJlZ2lzdHJ5UG9saWN5KSB7XG4gICAgICBjb25zdCBwb2xpY3lUZXh0ID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShub2RlLnBvbGljeVRleHQpO1xuICAgICAgY29uc3QgY29tcGxpYW50ID0gY2hlY2tTdGF0ZW1lbnQocG9saWN5VGV4dCk7XG4gICAgICBpZiAoY29tcGxpYW50ICE9PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLkNPTVBMSUFOVDtcbiAgICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBDZm5SZXBvc2l0b3J5KSB7XG4gICAgICBjb25zdCBwb2xpY3lUZXh0ID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShub2RlLnJlcG9zaXRvcnlQb2xpY3lUZXh0KTtcbiAgICAgIGNvbnN0IGNvbXBsaWFudCA9IGNoZWNrU3RhdGVtZW50KHBvbGljeVRleHQpO1xuICAgICAgaWYgKGNvbXBsaWFudCAhPT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9OX0NPTVBMSUFOVDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5DT01QTElBTlQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT1RfQVBQTElDQUJMRTtcbiAgICB9XG4gIH0sXG4gICduYW1lJyxcbiAgeyB2YWx1ZTogcGFyc2UoX19maWxlbmFtZSkubmFtZSB9XG4pO1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiBmb3IgcGFyc2luZyB0aHJvdWdoIHRoZSBwb2xpY3kgc3RhdGVtZW50XG4gKiBAcGFyYW0gcG9saWN5VGV4dCB0aGUgSlNPTiBwb2xpY3kgdGV4dFxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5mdW5jdGlvbiBjaGVja1N0YXRlbWVudChwb2xpY3lUZXh0OiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKHBvbGljeVRleHQgPT0gdW5kZWZpbmVkIHx8IHBvbGljeVRleHQuU3RhdGVtZW50ID09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGZvciAoY29uc3Qgc3RhdGVtZW50IG9mIHBvbGljeVRleHQuU3RhdGVtZW50KSB7XG4gICAgY29uc3QgZWZmZWN0ID0gc3RhdGVtZW50LkVmZmVjdDtcbiAgICBpZiAoZWZmZWN0ID09ICdBbGxvdycpIHtcbiAgICAgIGNvbnN0IGF3c1N0cmluZyA9IHN0YXRlbWVudC5QcmluY2lwYWxcbiAgICAgICAgPyBKU09OLnN0cmluZ2lmeShzdGF0ZW1lbnQuUHJpbmNpcGFsKVxuICAgICAgICA6ICcnO1xuICAgICAgaWYgKGF3c1N0cmluZy5pbmNsdWRlcygnKicpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG4iXX0=