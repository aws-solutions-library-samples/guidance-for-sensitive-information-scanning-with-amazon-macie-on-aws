"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_eks_1 = require("aws-cdk-lib/aws-eks");
const nag_rules_1 = require("../../nag-rules");
/**
 * EKS Clusters publish 'api', 'audit', 'authenticator, 'controllerManager', and 'scheduler' control plane logs
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_eks_1.CfnCluster) {
        const requiredTypes = new Set([
            'api',
            'audit',
            'authenticator',
            'controllerManager',
            'scheduler',
        ]);
        const logging = aws_cdk_lib_1.Stack.of(node).resolve(node.logging);
        const clusterLogging = aws_cdk_lib_1.Stack.of(node).resolve(logging?.clusterLogging);
        const enabledTypes = aws_cdk_lib_1.Stack.of(node).resolve(clusterLogging?.enabledTypes) ?? [];
        for (const enabled of enabledTypes) {
            requiredTypes.delete(nag_rules_1.NagRules.resolveIfPrimitive(node, enabled.type));
            if (requiredTypes.size === 0) {
                break;
            }
        }
        return requiredTypes.size
            ? [...requiredTypes].map((log) => `LogExport::${log}`)
            : nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else if (node.cfnResourceType === 'Custom::AWSCDK-EKS-Cluster') {
        // The CDK uses a Custom Resource with AWS SDK calls to create EKS Clusters
        const props = aws_cdk_lib_1.Stack.of(node).resolve(node._cfnProperties);
        const clusterLogging = aws_cdk_lib_1.Stack.of(node).resolve(props?.Config?.logging?.clusterLogging) ?? [];
        const requiredTypes = new Set([
            'api',
            'audit',
            'authenticator',
            'controllerManager',
            'scheduler',
        ]);
        for (const config of clusterLogging) {
            if (config?.enabled === true) {
                for (const type of config?.types) {
                    requiredTypes.delete(type);
                    if (requiredTypes.size === 0) {
                        break;
                    }
                }
            }
        }
        return requiredTypes.size
            ? [...requiredTypes].map((log) => `LogExport::${log}`)
            : nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRUtTQ2x1c3RlckNvbnRyb2xQbGFuZUxvZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvZWtzL0VLU0NsdXN0ZXJDb250cm9sUGxhbmVMb2dzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7OztFQUdFO0FBQ0YsK0JBQTZCO0FBQzdCLDZDQUFpRDtBQUNqRCxpREFBaUQ7QUFDakQsK0NBQTZFO0FBRTdFOzs7R0FHRztBQUNILGtCQUFlLE1BQU0sQ0FBQyxjQUFjLENBQ2xDLENBQUMsSUFBaUIsRUFBaUIsRUFBRTtJQUNuQyxJQUFJLElBQUksWUFBWSxvQkFBVSxFQUFFLENBQUM7UUFDL0IsTUFBTSxhQUFhLEdBQUcsSUFBSSxHQUFHLENBQUM7WUFDNUIsS0FBSztZQUNMLE9BQU87WUFDUCxlQUFlO1lBQ2YsbUJBQW1CO1lBQ25CLFdBQVc7U0FDWixDQUFDLENBQUM7UUFDSCxNQUFNLE9BQU8sR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELE1BQU0sY0FBYyxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDdkUsTUFBTSxZQUFZLEdBQ2hCLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzdELEtBQUssTUFBTSxPQUFPLElBQUksWUFBWSxFQUFFLENBQUM7WUFDbkMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxvQkFBUSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN0RSxJQUFJLGFBQWEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQzdCLE1BQU07WUFDUixDQUFDO1FBQ0gsQ0FBQztRQUNELE9BQU8sYUFBYSxDQUFDLElBQUk7WUFDdkIsQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7WUFDdEQsQ0FBQyxDQUFDLDZCQUFpQixDQUFDLFNBQVMsQ0FBQztJQUNsQyxDQUFDO1NBQU0sSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLDRCQUE0QixFQUFFLENBQUM7UUFDakUsMkVBQTJFO1FBQzNFLE1BQU0sS0FBSyxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBTyxJQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDakUsTUFBTSxjQUFjLEdBQ2xCLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkUsTUFBTSxhQUFhLEdBQUcsSUFBSSxHQUFHLENBQUM7WUFDNUIsS0FBSztZQUNMLE9BQU87WUFDUCxlQUFlO1lBQ2YsbUJBQW1CO1lBQ25CLFdBQVc7U0FDWixDQUFDLENBQUM7UUFDSCxLQUFLLE1BQU0sTUFBTSxJQUFJLGNBQWMsRUFBRSxDQUFDO1lBQ3BDLElBQUksTUFBTSxFQUFFLE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQztnQkFDN0IsS0FBSyxNQUFNLElBQUksSUFBSSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7b0JBQ2pDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzNCLElBQUksYUFBYSxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQzt3QkFDN0IsTUFBTTtvQkFDUixDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUNELE9BQU8sYUFBYSxDQUFDLElBQUk7WUFDdkIsQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7WUFDdEQsQ0FBQyxDQUFDLDZCQUFpQixDQUFDLFNBQVMsQ0FBQztJQUNsQyxDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sNkJBQWlCLENBQUMsY0FBYyxDQUFDO0lBQzFDLENBQUM7QUFDSCxDQUFDLEVBQ0QsTUFBTSxFQUNOLEVBQUUsS0FBSyxFQUFFLElBQUEsWUFBSyxFQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUNsQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbkNvcHlyaWdodCBBbWF6b24uY29tLCBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiovXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ2ZuUmVzb3VyY2UsIFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ2ZuQ2x1c3RlciB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1la3MnO1xuaW1wb3J0IHsgTmFnUnVsZUNvbXBsaWFuY2UsIE5hZ1J1bGVSZXN1bHQsIE5hZ1J1bGVzIH0gZnJvbSAnLi4vLi4vbmFnLXJ1bGVzJztcblxuLyoqXG4gKiBFS1MgQ2x1c3RlcnMgcHVibGlzaCAnYXBpJywgJ2F1ZGl0JywgJ2F1dGhlbnRpY2F0b3IsICdjb250cm9sbGVyTWFuYWdlcicsIGFuZCAnc2NoZWR1bGVyJyBjb250cm9sIHBsYW5lIGxvZ3NcbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5SZXNvdXJjZSB0byBjaGVja1xuICovXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIChub2RlOiBDZm5SZXNvdXJjZSk6IE5hZ1J1bGVSZXN1bHQgPT4ge1xuICAgIGlmIChub2RlIGluc3RhbmNlb2YgQ2ZuQ2x1c3Rlcikge1xuICAgICAgY29uc3QgcmVxdWlyZWRUeXBlcyA9IG5ldyBTZXQoW1xuICAgICAgICAnYXBpJyxcbiAgICAgICAgJ2F1ZGl0JyxcbiAgICAgICAgJ2F1dGhlbnRpY2F0b3InLFxuICAgICAgICAnY29udHJvbGxlck1hbmFnZXInLFxuICAgICAgICAnc2NoZWR1bGVyJyxcbiAgICAgIF0pO1xuICAgICAgY29uc3QgbG9nZ2luZyA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUobm9kZS5sb2dnaW5nKTtcbiAgICAgIGNvbnN0IGNsdXN0ZXJMb2dnaW5nID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShsb2dnaW5nPy5jbHVzdGVyTG9nZ2luZyk7XG4gICAgICBjb25zdCBlbmFibGVkVHlwZXM6IENmbkNsdXN0ZXIuTG9nZ2luZ1R5cGVDb25maWdQcm9wZXJ0eVtdID1cbiAgICAgICAgU3RhY2sub2Yobm9kZSkucmVzb2x2ZShjbHVzdGVyTG9nZ2luZz8uZW5hYmxlZFR5cGVzKSA/PyBbXTtcbiAgICAgIGZvciAoY29uc3QgZW5hYmxlZCBvZiBlbmFibGVkVHlwZXMpIHtcbiAgICAgICAgcmVxdWlyZWRUeXBlcy5kZWxldGUoTmFnUnVsZXMucmVzb2x2ZUlmUHJpbWl0aXZlKG5vZGUsIGVuYWJsZWQudHlwZSkpO1xuICAgICAgICBpZiAocmVxdWlyZWRUeXBlcy5zaXplID09PSAwKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXF1aXJlZFR5cGVzLnNpemVcbiAgICAgICAgPyBbLi4ucmVxdWlyZWRUeXBlc10ubWFwKChsb2cpID0+IGBMb2dFeHBvcnQ6OiR7bG9nfWApXG4gICAgICAgIDogTmFnUnVsZUNvbXBsaWFuY2UuQ09NUExJQU5UO1xuICAgIH0gZWxzZSBpZiAobm9kZS5jZm5SZXNvdXJjZVR5cGUgPT09ICdDdXN0b206OkFXU0NESy1FS1MtQ2x1c3RlcicpIHtcbiAgICAgIC8vIFRoZSBDREsgdXNlcyBhIEN1c3RvbSBSZXNvdXJjZSB3aXRoIEFXUyBTREsgY2FsbHMgdG8gY3JlYXRlIEVLUyBDbHVzdGVyc1xuICAgICAgY29uc3QgcHJvcHMgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKCg8YW55Pm5vZGUpLl9jZm5Qcm9wZXJ0aWVzKTtcbiAgICAgIGNvbnN0IGNsdXN0ZXJMb2dnaW5nID1cbiAgICAgICAgU3RhY2sub2Yobm9kZSkucmVzb2x2ZShwcm9wcz8uQ29uZmlnPy5sb2dnaW5nPy5jbHVzdGVyTG9nZ2luZykgPz8gW107XG4gICAgICBjb25zdCByZXF1aXJlZFR5cGVzID0gbmV3IFNldChbXG4gICAgICAgICdhcGknLFxuICAgICAgICAnYXVkaXQnLFxuICAgICAgICAnYXV0aGVudGljYXRvcicsXG4gICAgICAgICdjb250cm9sbGVyTWFuYWdlcicsXG4gICAgICAgICdzY2hlZHVsZXInLFxuICAgICAgXSk7XG4gICAgICBmb3IgKGNvbnN0IGNvbmZpZyBvZiBjbHVzdGVyTG9nZ2luZykge1xuICAgICAgICBpZiAoY29uZmlnPy5lbmFibGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgZm9yIChjb25zdCB0eXBlIG9mIGNvbmZpZz8udHlwZXMpIHtcbiAgICAgICAgICAgIHJlcXVpcmVkVHlwZXMuZGVsZXRlKHR5cGUpO1xuICAgICAgICAgICAgaWYgKHJlcXVpcmVkVHlwZXMuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXF1aXJlZFR5cGVzLnNpemVcbiAgICAgICAgPyBbLi4ucmVxdWlyZWRUeXBlc10ubWFwKChsb2cpID0+IGBMb2dFeHBvcnQ6OiR7bG9nfWApXG4gICAgICAgIDogTmFnUnVsZUNvbXBsaWFuY2UuQ09NUExJQU5UO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9UX0FQUExJQ0FCTEU7XG4gICAgfVxuICB9LFxuICAnbmFtZScsXG4gIHsgdmFsdWU6IHBhcnNlKF9fZmlsZW5hbWUpLm5hbWUgfVxuKTtcbiJdfQ==