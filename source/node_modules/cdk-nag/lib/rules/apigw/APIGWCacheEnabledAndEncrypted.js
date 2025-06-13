"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const nag_rules_1 = require("../../nag-rules");
/**
 * All methods in API Gateway stages have caching enabled and encrypted
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_apigateway_1.CfnStage) {
        if (node.methodSettings == undefined) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        const methodSettings = aws_cdk_lib_1.Stack.of(node).resolve(node.methodSettings);
        let found = false;
        for (const setting of methodSettings) {
            const resolvedSetting = aws_cdk_lib_1.Stack.of(node).resolve(setting);
            if (resolvedSetting?.httpMethod == '*' &&
                resolvedSetting?.resourcePath == '/*' &&
                resolvedSetting?.cacheDataEncrypted &&
                resolvedSetting?.cachingEnabled) {
                found = true;
                break;
            }
        }
        if (!found) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQVBJR1dDYWNoZUVuYWJsZWRBbmRFbmNyeXB0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvYXBpZ3cvQVBJR1dDYWNoZUVuYWJsZWRBbmRFbmNyeXB0ZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0VBR0U7QUFDRiwrQkFBNkI7QUFDN0IsNkNBQWlEO0FBQ2pELCtEQUFzRDtBQUN0RCwrQ0FBb0Q7QUFFcEQ7OztHQUdHO0FBQ0gsa0JBQWUsTUFBTSxDQUFDLGNBQWMsQ0FDbEMsQ0FBQyxJQUFpQixFQUFxQixFQUFFO0lBQ3ZDLElBQUksSUFBSSxZQUFZLHlCQUFRLEVBQUUsQ0FBQztRQUM3QixJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksU0FBUyxFQUFFLENBQUM7WUFDckMsT0FBTyw2QkFBaUIsQ0FBQyxhQUFhLENBQUM7UUFDekMsQ0FBQztRQUNELE1BQU0sY0FBYyxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbkUsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLEtBQUssTUFBTSxPQUFPLElBQUksY0FBYyxFQUFFLENBQUM7WUFDckMsTUFBTSxlQUFlLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3hELElBQ0UsZUFBZSxFQUFFLFVBQVUsSUFBSSxHQUFHO2dCQUNsQyxlQUFlLEVBQUUsWUFBWSxJQUFJLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSxrQkFBa0I7Z0JBQ25DLGVBQWUsRUFBRSxjQUFjLEVBQy9CLENBQUM7Z0JBQ0QsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDYixNQUFNO1lBQ1IsQ0FBQztRQUNILENBQUM7UUFDRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDWCxPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsT0FBTyw2QkFBaUIsQ0FBQyxTQUFTLENBQUM7SUFDckMsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLDZCQUFpQixDQUFDLGNBQWMsQ0FBQztJQUMxQyxDQUFDO0FBQ0gsQ0FBQyxFQUNELE1BQU0sRUFDTixFQUFFLEtBQUssRUFBRSxJQUFBLFlBQUssRUFBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FDbEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5Db3B5cmlnaHQgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4qL1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IENmblJlc291cmNlLCBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENmblN0YWdlIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXknO1xuaW1wb3J0IHsgTmFnUnVsZUNvbXBsaWFuY2UgfSBmcm9tICcuLi8uLi9uYWctcnVsZXMnO1xuXG4vKipcbiAqIEFsbCBtZXRob2RzIGluIEFQSSBHYXRld2F5IHN0YWdlcyBoYXZlIGNhY2hpbmcgZW5hYmxlZCBhbmQgZW5jcnlwdGVkXG4gKiBAcGFyYW0gbm9kZSB0aGUgQ2ZuUmVzb3VyY2UgdG8gY2hlY2tcbiAqL1xuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmRlZmluZVByb3BlcnR5KFxuICAobm9kZTogQ2ZuUmVzb3VyY2UpOiBOYWdSdWxlQ29tcGxpYW5jZSA9PiB7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBDZm5TdGFnZSkge1xuICAgICAgaWYgKG5vZGUubWV0aG9kU2V0dGluZ3MgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgfVxuICAgICAgY29uc3QgbWV0aG9kU2V0dGluZ3MgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKG5vZGUubWV0aG9kU2V0dGluZ3MpO1xuICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICBmb3IgKGNvbnN0IHNldHRpbmcgb2YgbWV0aG9kU2V0dGluZ3MpIHtcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRTZXR0aW5nID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShzZXR0aW5nKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHJlc29sdmVkU2V0dGluZz8uaHR0cE1ldGhvZCA9PSAnKicgJiZcbiAgICAgICAgICByZXNvbHZlZFNldHRpbmc/LnJlc291cmNlUGF0aCA9PSAnLyonICYmXG4gICAgICAgICAgcmVzb2x2ZWRTZXR0aW5nPy5jYWNoZURhdGFFbmNyeXB0ZWQgJiZcbiAgICAgICAgICByZXNvbHZlZFNldHRpbmc/LmNhY2hpbmdFbmFibGVkXG4gICAgICAgICkge1xuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9OX0NPTVBMSUFOVDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5DT01QTElBTlQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT1RfQVBQTElDQUJMRTtcbiAgICB9XG4gIH0sXG4gICduYW1lJyxcbiAgeyB2YWx1ZTogcGFyc2UoX19maWxlbmFtZSkubmFtZSB9XG4pO1xuIl19