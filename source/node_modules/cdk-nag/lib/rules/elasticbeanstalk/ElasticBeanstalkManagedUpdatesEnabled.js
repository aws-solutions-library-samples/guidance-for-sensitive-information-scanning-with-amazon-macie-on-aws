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
 * Elastic Beanstalk environments have managed updates enabled
 * https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/command-options-general.html#command-options-general-elasticbeanstalkmanagedactions
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_elasticbeanstalk_1.CfnEnvironment) {
        const optionSettings = aws_cdk_lib_1.Stack.of(node).resolve(node.optionSettings);
        if (optionSettings == undefined) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        let foundEnabled = false;
        let foundLevel = false;
        for (const optionSetting of optionSettings) {
            const resolvedOptionSetting = aws_cdk_lib_1.Stack.of(node).resolve(optionSetting);
            const namespace = resolvedOptionSetting.namespace;
            const optionName = resolvedOptionSetting.optionName;
            const value = resolvedOptionSetting.value;
            if (namespace === 'aws:elasticbeanstalk:managedactions' &&
                optionName === 'ManagedActionsEnabled' &&
                (value === undefined || value === 'true')) {
                foundEnabled = true;
                if (foundLevel) {
                    break;
                }
            }
            else if (namespace === 'aws:elasticbeanstalk:managedactions:platformupdate' &&
                optionName === 'UpdateLevel' &&
                (value === 'minor' || value === 'patch')) {
                foundLevel = true;
                if (foundEnabled) {
                    break;
                }
            }
        }
        if (!foundEnabled || !foundLevel) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWxhc3RpY0JlYW5zdGFsa01hbmFnZWRVcGRhdGVzRW5hYmxlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9lbGFzdGljYmVhbnN0YWxrL0VsYXN0aWNCZWFuc3RhbGtNYW5hZ2VkVXBkYXRlc0VuYWJsZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0VBR0U7QUFDRiwrQkFBNkI7QUFDN0IsNkNBQWlEO0FBQ2pELDJFQUFrRTtBQUNsRSwrQ0FBb0Q7QUFFcEQ7Ozs7R0FJRztBQUNILGtCQUFlLE1BQU0sQ0FBQyxjQUFjLENBQ2xDLENBQUMsSUFBaUIsRUFBcUIsRUFBRTtJQUN2QyxJQUFJLElBQUksWUFBWSxxQ0FBYyxFQUFFLENBQUM7UUFDbkMsTUFBTSxjQUFjLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNuRSxJQUFJLGNBQWMsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUNoQyxPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN2QixLQUFLLE1BQU0sYUFBYSxJQUFJLGNBQWMsRUFBRSxDQUFDO1lBQzNDLE1BQU0scUJBQXFCLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3BFLE1BQU0sU0FBUyxHQUFHLHFCQUFxQixDQUFDLFNBQVMsQ0FBQztZQUNsRCxNQUFNLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQyxVQUFVLENBQUM7WUFDcEQsTUFBTSxLQUFLLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDO1lBQzFDLElBQ0UsU0FBUyxLQUFLLHFDQUFxQztnQkFDbkQsVUFBVSxLQUFLLHVCQUF1QjtnQkFDdEMsQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxNQUFNLENBQUMsRUFDekMsQ0FBQztnQkFDRCxZQUFZLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixJQUFJLFVBQVUsRUFBRSxDQUFDO29CQUNmLE1BQU07Z0JBQ1IsQ0FBQztZQUNILENBQUM7aUJBQU0sSUFDTCxTQUFTLEtBQUssb0RBQW9EO2dCQUNsRSxVQUFVLEtBQUssYUFBYTtnQkFDNUIsQ0FBQyxLQUFLLEtBQUssT0FBTyxJQUFJLEtBQUssS0FBSyxPQUFPLENBQUMsRUFDeEMsQ0FBQztnQkFDRCxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUNsQixJQUFJLFlBQVksRUFBRSxDQUFDO29CQUNqQixNQUFNO2dCQUNSLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUNELElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNqQyxPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsT0FBTyw2QkFBaUIsQ0FBQyxTQUFTLENBQUM7SUFDckMsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLDZCQUFpQixDQUFDLGNBQWMsQ0FBQztJQUMxQyxDQUFDO0FBQ0gsQ0FBQyxFQUNELE1BQU0sRUFDTixFQUFFLEtBQUssRUFBRSxJQUFBLFlBQUssRUFBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FDbEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5Db3B5cmlnaHQgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4qL1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IENmblJlc291cmNlLCBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENmbkVudmlyb25tZW50IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWVsYXN0aWNiZWFuc3RhbGsnO1xuaW1wb3J0IHsgTmFnUnVsZUNvbXBsaWFuY2UgfSBmcm9tICcuLi8uLi9uYWctcnVsZXMnO1xuXG4vKipcbiAqIEVsYXN0aWMgQmVhbnN0YWxrIGVudmlyb25tZW50cyBoYXZlIG1hbmFnZWQgdXBkYXRlcyBlbmFibGVkXG4gKiBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20vZWxhc3RpY2JlYW5zdGFsay9sYXRlc3QvZGcvY29tbWFuZC1vcHRpb25zLWdlbmVyYWwuaHRtbCNjb21tYW5kLW9wdGlvbnMtZ2VuZXJhbC1lbGFzdGljYmVhbnN0YWxrbWFuYWdlZGFjdGlvbnNcbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5SZXNvdXJjZSB0byBjaGVja1xuICovXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIChub2RlOiBDZm5SZXNvdXJjZSk6IE5hZ1J1bGVDb21wbGlhbmNlID0+IHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENmbkVudmlyb25tZW50KSB7XG4gICAgICBjb25zdCBvcHRpb25TZXR0aW5ncyA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUobm9kZS5vcHRpb25TZXR0aW5ncyk7XG4gICAgICBpZiAob3B0aW9uU2V0dGluZ3MgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgfVxuICAgICAgbGV0IGZvdW5kRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgbGV0IGZvdW5kTGV2ZWwgPSBmYWxzZTtcbiAgICAgIGZvciAoY29uc3Qgb3B0aW9uU2V0dGluZyBvZiBvcHRpb25TZXR0aW5ncykge1xuICAgICAgICBjb25zdCByZXNvbHZlZE9wdGlvblNldHRpbmcgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKG9wdGlvblNldHRpbmcpO1xuICAgICAgICBjb25zdCBuYW1lc3BhY2UgPSByZXNvbHZlZE9wdGlvblNldHRpbmcubmFtZXNwYWNlO1xuICAgICAgICBjb25zdCBvcHRpb25OYW1lID0gcmVzb2x2ZWRPcHRpb25TZXR0aW5nLm9wdGlvbk5hbWU7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gcmVzb2x2ZWRPcHRpb25TZXR0aW5nLnZhbHVlO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgbmFtZXNwYWNlID09PSAnYXdzOmVsYXN0aWNiZWFuc3RhbGs6bWFuYWdlZGFjdGlvbnMnICYmXG4gICAgICAgICAgb3B0aW9uTmFtZSA9PT0gJ01hbmFnZWRBY3Rpb25zRW5hYmxlZCcgJiZcbiAgICAgICAgICAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gJ3RydWUnKVxuICAgICAgICApIHtcbiAgICAgICAgICBmb3VuZEVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgIGlmIChmb3VuZExldmVsKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgbmFtZXNwYWNlID09PSAnYXdzOmVsYXN0aWNiZWFuc3RhbGs6bWFuYWdlZGFjdGlvbnM6cGxhdGZvcm11cGRhdGUnICYmXG4gICAgICAgICAgb3B0aW9uTmFtZSA9PT0gJ1VwZGF0ZUxldmVsJyAmJlxuICAgICAgICAgICh2YWx1ZSA9PT0gJ21pbm9yJyB8fCB2YWx1ZSA9PT0gJ3BhdGNoJylcbiAgICAgICAgKSB7XG4gICAgICAgICAgZm91bmRMZXZlbCA9IHRydWU7XG4gICAgICAgICAgaWYgKGZvdW5kRW5hYmxlZCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIWZvdW5kRW5hYmxlZCB8fCAhZm91bmRMZXZlbCkge1xuICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9OX0NPTVBMSUFOVDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5DT01QTElBTlQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT1RfQVBQTElDQUJMRTtcbiAgICB9XG4gIH0sXG4gICduYW1lJyxcbiAgeyB2YWx1ZTogcGFyc2UoX19maWxlbmFtZSkubmFtZSB9XG4pO1xuIl19