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
 * Elastic Beanstalk environments are configured to use a specific VPC
 * https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/command-options-general.html#command-options-general-ec2vpc
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
            if (namespace === 'aws:ec2:vpc' &&
                optionName === 'VPCId' &&
                value !== undefined) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWxhc3RpY0JlYW5zdGFsa1ZQQ1NwZWNpZmllZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9lbGFzdGljYmVhbnN0YWxrL0VsYXN0aWNCZWFuc3RhbGtWUENTcGVjaWZpZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0VBR0U7QUFDRiwrQkFBNkI7QUFDN0IsNkNBQWlEO0FBQ2pELDJFQUFrRTtBQUNsRSwrQ0FBb0Q7QUFFcEQ7Ozs7R0FJRztBQUNILGtCQUFlLE1BQU0sQ0FBQyxjQUFjLENBQ2xDLENBQUMsSUFBaUIsRUFBcUIsRUFBRTtJQUN2QyxJQUFJLElBQUksWUFBWSxxQ0FBYyxFQUFFLENBQUM7UUFDbkMsTUFBTSxjQUFjLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNuRSxJQUFJLGNBQWMsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUNoQyxPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLEtBQUssTUFBTSxhQUFhLElBQUksY0FBYyxFQUFFLENBQUM7WUFDM0MsTUFBTSxxQkFBcUIsR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDcEUsTUFBTSxTQUFTLEdBQUcscUJBQXFCLENBQUMsU0FBUyxDQUFDO1lBQ2xELE1BQU0sVUFBVSxHQUFHLHFCQUFxQixDQUFDLFVBQVUsQ0FBQztZQUNwRCxNQUFNLEtBQUssR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUM7WUFDMUMsSUFDRSxTQUFTLEtBQUssYUFBYTtnQkFDM0IsVUFBVSxLQUFLLE9BQU87Z0JBQ3RCLEtBQUssS0FBSyxTQUFTLEVBQ25CLENBQUM7Z0JBQ0QsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFDcEIsTUFBTTtZQUNSLENBQUM7UUFDSCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ2xCLE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDO1FBQ3pDLENBQUM7UUFDRCxPQUFPLDZCQUFpQixDQUFDLFNBQVMsQ0FBQztJQUNyQyxDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sNkJBQWlCLENBQUMsY0FBYyxDQUFDO0lBQzFDLENBQUM7QUFDSCxDQUFDLEVBQ0QsTUFBTSxFQUNOLEVBQUUsS0FBSyxFQUFFLElBQUEsWUFBSyxFQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUNsQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbkNvcHlyaWdodCBBbWF6b24uY29tLCBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiovXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ2ZuUmVzb3VyY2UsIFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ2ZuRW52aXJvbm1lbnQgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWxhc3RpY2JlYW5zdGFsayc7XG5pbXBvcnQgeyBOYWdSdWxlQ29tcGxpYW5jZSB9IGZyb20gJy4uLy4uL25hZy1ydWxlcyc7XG5cbi8qKlxuICogRWxhc3RpYyBCZWFuc3RhbGsgZW52aXJvbm1lbnRzIGFyZSBjb25maWd1cmVkIHRvIHVzZSBhIHNwZWNpZmljIFZQQ1xuICogaHR0cHM6Ly9kb2NzLmF3cy5hbWF6b24uY29tL2VsYXN0aWNiZWFuc3RhbGsvbGF0ZXN0L2RnL2NvbW1hbmQtb3B0aW9ucy1nZW5lcmFsLmh0bWwjY29tbWFuZC1vcHRpb25zLWdlbmVyYWwtZWMydnBjXG4gKiBAcGFyYW0gbm9kZSB0aGUgQ2ZuUmVzb3VyY2UgdG8gY2hlY2tcbiAqL1xuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmRlZmluZVByb3BlcnR5KFxuICAobm9kZTogQ2ZuUmVzb3VyY2UpOiBOYWdSdWxlQ29tcGxpYW5jZSA9PiB7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBDZm5FbnZpcm9ubWVudCkge1xuICAgICAgY29uc3Qgb3B0aW9uU2V0dGluZ3MgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKG5vZGUub3B0aW9uU2V0dGluZ3MpO1xuICAgICAgaWYgKG9wdGlvblNldHRpbmdzID09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9OX0NPTVBMSUFOVDtcbiAgICAgIH1cbiAgICAgIGxldCBmb3VuZEVuYWJsZWQgPSBmYWxzZTtcbiAgICAgIGZvciAoY29uc3Qgb3B0aW9uU2V0dGluZyBvZiBvcHRpb25TZXR0aW5ncykge1xuICAgICAgICBjb25zdCByZXNvbHZlZE9wdGlvblNldHRpbmcgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKG9wdGlvblNldHRpbmcpO1xuICAgICAgICBjb25zdCBuYW1lc3BhY2UgPSByZXNvbHZlZE9wdGlvblNldHRpbmcubmFtZXNwYWNlO1xuICAgICAgICBjb25zdCBvcHRpb25OYW1lID0gcmVzb2x2ZWRPcHRpb25TZXR0aW5nLm9wdGlvbk5hbWU7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gcmVzb2x2ZWRPcHRpb25TZXR0aW5nLnZhbHVlO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgbmFtZXNwYWNlID09PSAnYXdzOmVjMjp2cGMnICYmXG4gICAgICAgICAgb3B0aW9uTmFtZSA9PT0gJ1ZQQ0lkJyAmJlxuICAgICAgICAgIHZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgZm91bmRFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFmb3VuZEVuYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PTl9DT01QTElBTlQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuQ09NUExJQU5UO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9UX0FQUExJQ0FCTEU7XG4gICAgfVxuICB9LFxuICAnbmFtZScsXG4gIHsgdmFsdWU6IHBhcnNlKF9fZmlsZW5hbWUpLm5hbWUgfVxuKTtcbiJdfQ==