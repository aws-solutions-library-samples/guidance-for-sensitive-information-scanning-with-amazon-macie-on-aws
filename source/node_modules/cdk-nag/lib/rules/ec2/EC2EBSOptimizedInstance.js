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
const EBS_OPTIMIZED_SUPPORTED = [
    'c1.xlarge',
    'c3.xlarge',
    'c3.2xlarge',
    'c3.4xlarge',
    'g2.2xlarge',
    'i2.xlarge',
    'i2.2xlarge',
    'i2.4xlarge',
    'm1.large',
    'm1.xlarge',
    'm2.2xlarge',
    'm2.4xlarge',
    'm3.xlarge',
    'm3.2xlarge',
    'r3.xlarge',
    'r3.2xlarge',
    'r3.4xlarge',
];
const DEFAULT_TYPE = 'm1.small';
/**
 * EC2 instance types that support EBS optimization and are not EBS optimized by default have EBS optimization enabled
 * https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-optimized.html#previous
 *  @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_ec2_1.CfnInstance) {
        const instanceType = node.instanceType
            ? nag_rules_1.NagRules.resolveIfPrimitive(node, node.instanceType)
            : DEFAULT_TYPE;
        const ebsOptimized = aws_cdk_lib_1.Stack.of(node).resolve(node.ebsOptimized);
        if (EBS_OPTIMIZED_SUPPORTED.includes(instanceType) &&
            ebsOptimized !== true) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRUMyRUJTT3B0aW1pemVkSW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvZWMyL0VDMkVCU09wdGltaXplZEluc3RhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7OztFQUdFO0FBQ0YsK0JBQTZCO0FBQzdCLDZDQUFpRDtBQUNqRCxpREFBa0Q7QUFDbEQsK0NBQThEO0FBRTlELE1BQU0sdUJBQXVCLEdBQUc7SUFDOUIsV0FBVztJQUNYLFdBQVc7SUFDWCxZQUFZO0lBQ1osWUFBWTtJQUNaLFlBQVk7SUFDWixXQUFXO0lBQ1gsWUFBWTtJQUNaLFlBQVk7SUFDWixVQUFVO0lBQ1YsV0FBVztJQUNYLFlBQVk7SUFDWixZQUFZO0lBQ1osV0FBVztJQUNYLFlBQVk7SUFDWixXQUFXO0lBQ1gsWUFBWTtJQUNaLFlBQVk7Q0FDYixDQUFDO0FBQ0YsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDO0FBQ2hDOzs7O0dBSUc7QUFDSCxrQkFBZSxNQUFNLENBQUMsY0FBYyxDQUNsQyxDQUFDLElBQWlCLEVBQXFCLEVBQUU7SUFDdkMsSUFBSSxJQUFJLFlBQVkscUJBQVcsRUFBRSxDQUFDO1FBQ2hDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZO1lBQ3BDLENBQUMsQ0FBQyxvQkFBUSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ3RELENBQUMsQ0FBQyxZQUFZLENBQUM7UUFDakIsTUFBTSxZQUFZLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvRCxJQUNFLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7WUFDOUMsWUFBWSxLQUFLLElBQUksRUFDckIsQ0FBQztZQUNELE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDO1FBQ3pDLENBQUM7UUFDRCxPQUFPLDZCQUFpQixDQUFDLFNBQVMsQ0FBQztJQUNyQyxDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sNkJBQWlCLENBQUMsY0FBYyxDQUFDO0lBQzFDLENBQUM7QUFDSCxDQUFDLEVBQ0QsTUFBTSxFQUNOLEVBQUUsS0FBSyxFQUFFLElBQUEsWUFBSyxFQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUNsQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbkNvcHlyaWdodCBBbWF6b24uY29tLCBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiovXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ2ZuUmVzb3VyY2UsIFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ2ZuSW5zdGFuY2UgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWMyJztcbmltcG9ydCB7IE5hZ1J1bGVDb21wbGlhbmNlLCBOYWdSdWxlcyB9IGZyb20gJy4uLy4uL25hZy1ydWxlcyc7XG5cbmNvbnN0IEVCU19PUFRJTUlaRURfU1VQUE9SVEVEID0gW1xuICAnYzEueGxhcmdlJyxcbiAgJ2MzLnhsYXJnZScsXG4gICdjMy4yeGxhcmdlJyxcbiAgJ2MzLjR4bGFyZ2UnLFxuICAnZzIuMnhsYXJnZScsXG4gICdpMi54bGFyZ2UnLFxuICAnaTIuMnhsYXJnZScsXG4gICdpMi40eGxhcmdlJyxcbiAgJ20xLmxhcmdlJyxcbiAgJ20xLnhsYXJnZScsXG4gICdtMi4yeGxhcmdlJyxcbiAgJ20yLjR4bGFyZ2UnLFxuICAnbTMueGxhcmdlJyxcbiAgJ20zLjJ4bGFyZ2UnLFxuICAncjMueGxhcmdlJyxcbiAgJ3IzLjJ4bGFyZ2UnLFxuICAncjMuNHhsYXJnZScsXG5dO1xuY29uc3QgREVGQVVMVF9UWVBFID0gJ20xLnNtYWxsJztcbi8qKlxuICogRUMyIGluc3RhbmNlIHR5cGVzIHRoYXQgc3VwcG9ydCBFQlMgb3B0aW1pemF0aW9uIGFuZCBhcmUgbm90IEVCUyBvcHRpbWl6ZWQgYnkgZGVmYXVsdCBoYXZlIEVCUyBvcHRpbWl6YXRpb24gZW5hYmxlZFxuICogaHR0cHM6Ly9kb2NzLmF3cy5hbWF6b24uY29tL0FXU0VDMi9sYXRlc3QvVXNlckd1aWRlL2Vicy1vcHRpbWl6ZWQuaHRtbCNwcmV2aW91c1xuICogIEBwYXJhbSBub2RlIHRoZSBDZm5SZXNvdXJjZSB0byBjaGVja1xuICovXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIChub2RlOiBDZm5SZXNvdXJjZSk6IE5hZ1J1bGVDb21wbGlhbmNlID0+IHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENmbkluc3RhbmNlKSB7XG4gICAgICBjb25zdCBpbnN0YW5jZVR5cGUgPSBub2RlLmluc3RhbmNlVHlwZVxuICAgICAgICA/IE5hZ1J1bGVzLnJlc29sdmVJZlByaW1pdGl2ZShub2RlLCBub2RlLmluc3RhbmNlVHlwZSlcbiAgICAgICAgOiBERUZBVUxUX1RZUEU7XG4gICAgICBjb25zdCBlYnNPcHRpbWl6ZWQgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKG5vZGUuZWJzT3B0aW1pemVkKTtcbiAgICAgIGlmIChcbiAgICAgICAgRUJTX09QVElNSVpFRF9TVVBQT1JURUQuaW5jbHVkZXMoaW5zdGFuY2VUeXBlKSAmJlxuICAgICAgICBlYnNPcHRpbWl6ZWQgIT09IHRydWVcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9OX0NPTVBMSUFOVDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5DT01QTElBTlQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT1RfQVBQTElDQUJMRTtcbiAgICB9XG4gIH0sXG4gICduYW1lJyxcbiAgeyB2YWx1ZTogcGFyc2UoX19maWxlbmFtZSkubmFtZSB9XG4pO1xuIl19