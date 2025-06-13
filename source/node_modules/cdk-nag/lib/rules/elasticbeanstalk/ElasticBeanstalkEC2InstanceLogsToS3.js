"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_elasticbeanstalk_1 = require("aws-cdk-lib/aws-elasticbeanstalk");
const nag_rules_1 = require("../../nag-rules");
/**
 * EC2 instances in Elastic Beanstalk environments upload rotated logs to S3
 * https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/command-options-general.html#command-options-general-elasticbeanstalkhostmanager
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_elasticbeanstalk_1.CfnEnvironment) {
        const optionSettings = aws_cdk_lib_1.Stack.of(node).resolve(node.optionSettings);
        if (optionSettings == undefined) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        let foundEnabled = false;
        for (const optionSetting of optionSettings) {
            const resolvedOptionSetting = aws_cdk_lib_1.Stack.of(node).resolve(optionSetting);
            const namespace = resolvedOptionSetting.namespace;
            const optionName = resolvedOptionSetting.optionName;
            const value = resolvedOptionSetting.value;
            if (namespace === 'aws:elasticbeanstalk:hostmanager' &&
                optionName === 'LogPublicationControl' &&
                value === 'true') {
                foundEnabled = true;
                break;
            }
        }
        if (!foundEnabled) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWxhc3RpY0JlYW5zdGFsa0VDMkluc3RhbmNlTG9nc1RvUzMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvZWxhc3RpY2JlYW5zdGFsay9FbGFzdGljQmVhbnN0YWxrRUMySW5zdGFuY2VMb2dzVG9TMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7RUFHRTtBQUNGLCtCQUE2QjtBQUM3Qiw2Q0FBaUQ7QUFDakQsMkVBQWtFO0FBQ2xFLCtDQUFvRDtBQUVwRDs7OztHQUlHO0FBQ0gsa0JBQWUsTUFBTSxDQUFDLGNBQWMsQ0FDbEMsQ0FBQyxJQUFpQixFQUFxQixFQUFFO0lBQ3ZDLElBQUksSUFBSSxZQUFZLHFDQUFjLEVBQUUsQ0FBQztRQUNuQyxNQUFNLGNBQWMsR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ25FLElBQUksY0FBYyxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQ2hDLE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDO1FBQ3pDLENBQUM7UUFDRCxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDekIsS0FBSyxNQUFNLGFBQWEsSUFBSSxjQUFjLEVBQUUsQ0FBQztZQUMzQyxNQUFNLHFCQUFxQixHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNwRSxNQUFNLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxTQUFTLENBQUM7WUFDbEQsTUFBTSxVQUFVLEdBQUcscUJBQXFCLENBQUMsVUFBVSxDQUFDO1lBQ3BELE1BQU0sS0FBSyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQztZQUMxQyxJQUNFLFNBQVMsS0FBSyxrQ0FBa0M7Z0JBQ2hELFVBQVUsS0FBSyx1QkFBdUI7Z0JBQ3RDLEtBQUssS0FBSyxNQUFNLEVBQ2hCLENBQUM7Z0JBQ0QsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFDcEIsTUFBTTtZQUNSLENBQUM7UUFDSCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ2xCLE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDO1FBQ3pDLENBQUM7UUFDRCxPQUFPLDZCQUFpQixDQUFDLFNBQVMsQ0FBQztJQUNyQyxDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sNkJBQWlCLENBQUMsY0FBYyxDQUFDO0lBQzFDLENBQUM7QUFDSCxDQUFDLEVBQ0QsTUFBTSxFQUNOLEVBQUUsS0FBSyxFQUFFLElBQUEsWUFBSyxFQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUNsQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbkNvcHlyaWdodCBBbWF6b24uY29tLCBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiovXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ2ZuUmVzb3VyY2UsIFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ2ZuRW52aXJvbm1lbnQgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWxhc3RpY2JlYW5zdGFsayc7XG5pbXBvcnQgeyBOYWdSdWxlQ29tcGxpYW5jZSB9IGZyb20gJy4uLy4uL25hZy1ydWxlcyc7XG5cbi8qKlxuICogRUMyIGluc3RhbmNlcyBpbiBFbGFzdGljIEJlYW5zdGFsayBlbnZpcm9ubWVudHMgdXBsb2FkIHJvdGF0ZWQgbG9ncyB0byBTM1xuICogaHR0cHM6Ly9kb2NzLmF3cy5hbWF6b24uY29tL2VsYXN0aWNiZWFuc3RhbGsvbGF0ZXN0L2RnL2NvbW1hbmQtb3B0aW9ucy1nZW5lcmFsLmh0bWwjY29tbWFuZC1vcHRpb25zLWdlbmVyYWwtZWxhc3RpY2JlYW5zdGFsa2hvc3RtYW5hZ2VyXG4gKiBAcGFyYW0gbm9kZSB0aGUgQ2ZuUmVzb3VyY2UgdG8gY2hlY2tcbiAqL1xuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmRlZmluZVByb3BlcnR5KFxuICAobm9kZTogQ2ZuUmVzb3VyY2UpOiBOYWdSdWxlQ29tcGxpYW5jZSA9PiB7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBDZm5FbnZpcm9ubWVudCkge1xuICAgICAgY29uc3Qgb3B0aW9uU2V0dGluZ3MgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKG5vZGUub3B0aW9uU2V0dGluZ3MpO1xuICAgICAgaWYgKG9wdGlvblNldHRpbmdzID09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9OX0NPTVBMSUFOVDtcbiAgICAgIH1cbiAgICAgIGxldCBmb3VuZEVuYWJsZWQgPSBmYWxzZTtcbiAgICAgIGZvciAoY29uc3Qgb3B0aW9uU2V0dGluZyBvZiBvcHRpb25TZXR0aW5ncykge1xuICAgICAgICBjb25zdCByZXNvbHZlZE9wdGlvblNldHRpbmcgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKG9wdGlvblNldHRpbmcpO1xuICAgICAgICBjb25zdCBuYW1lc3BhY2UgPSByZXNvbHZlZE9wdGlvblNldHRpbmcubmFtZXNwYWNlO1xuICAgICAgICBjb25zdCBvcHRpb25OYW1lID0gcmVzb2x2ZWRPcHRpb25TZXR0aW5nLm9wdGlvbk5hbWU7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gcmVzb2x2ZWRPcHRpb25TZXR0aW5nLnZhbHVlO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgbmFtZXNwYWNlID09PSAnYXdzOmVsYXN0aWNiZWFuc3RhbGs6aG9zdG1hbmFnZXInICYmXG4gICAgICAgICAgb3B0aW9uTmFtZSA9PT0gJ0xvZ1B1YmxpY2F0aW9uQ29udHJvbCcgJiZcbiAgICAgICAgICB2YWx1ZSA9PT0gJ3RydWUnXG4gICAgICAgICkge1xuICAgICAgICAgIGZvdW5kRW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghZm91bmRFbmFibGVkKSB7XG4gICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLkNPTVBMSUFOVDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PVF9BUFBMSUNBQkxFO1xuICAgIH1cbiAgfSxcbiAgJ25hbWUnLFxuICB7IHZhbHVlOiBwYXJzZShfX2ZpbGVuYW1lKS5uYW1lIH1cbik7XG4iXX0=