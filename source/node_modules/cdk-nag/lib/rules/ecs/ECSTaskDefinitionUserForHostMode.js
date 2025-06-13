"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_ecs_1 = require("aws-cdk-lib/aws-ecs");
const nag_rules_1 = require("../../nag-rules");
/**
 * Containers in ECS task definitions configured for host networking have 'privileged' set to true and a non-empty non-root 'user'
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_ecs_1.CfnTaskDefinition) {
        if (node.networkMode === aws_ecs_1.NetworkMode.HOST) {
            const containerDefinitions = aws_cdk_lib_1.Stack.of(node).resolve(node.containerDefinitions);
            if (containerDefinitions !== undefined) {
                for (const containerDefinition of containerDefinitions) {
                    const resolvedDefinition = aws_cdk_lib_1.Stack.of(node).resolve(containerDefinition);
                    const privileged = nag_rules_1.NagRules.resolveIfPrimitive(node, resolvedDefinition.privileged);
                    const user = nag_rules_1.NagRules.resolveIfPrimitive(node, resolvedDefinition.user);
                    if (privileged !== true || user === undefined) {
                        return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
                    }
                    const rootIdentifiers = ['root', '0'];
                    const userParts = user.split(':');
                    for (const userPart of userParts) {
                        if (rootIdentifiers.includes(userPart.toLowerCase())) {
                            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
                        }
                    }
                }
            }
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRUNTVGFza0RlZmluaXRpb25Vc2VyRm9ySG9zdE1vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvZWNzL0VDU1Rhc2tEZWZpbml0aW9uVXNlckZvckhvc3RNb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7OztFQUdFO0FBQ0YsK0JBQTZCO0FBQzdCLDZDQUFpRDtBQUNqRCxpREFBcUU7QUFDckUsK0NBQThEO0FBRTlEOzs7R0FHRztBQUNILGtCQUFlLE1BQU0sQ0FBQyxjQUFjLENBQ2xDLENBQUMsSUFBaUIsRUFBcUIsRUFBRTtJQUN2QyxJQUFJLElBQUksWUFBWSwyQkFBaUIsRUFBRSxDQUFDO1FBQ3RDLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxxQkFBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzFDLE1BQU0sb0JBQW9CLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUNqRCxJQUFJLENBQUMsb0JBQW9CLENBQzFCLENBQUM7WUFDRixJQUFJLG9CQUFvQixLQUFLLFNBQVMsRUFBRSxDQUFDO2dCQUN2QyxLQUFLLE1BQU0sbUJBQW1CLElBQUksb0JBQW9CLEVBQUUsQ0FBQztvQkFDdkQsTUFBTSxrQkFBa0IsR0FDdEIsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7b0JBQzlDLE1BQU0sVUFBVSxHQUFHLG9CQUFRLENBQUMsa0JBQWtCLENBQzVDLElBQUksRUFDSixrQkFBa0IsQ0FBQyxVQUFVLENBQzlCLENBQUM7b0JBQ0YsTUFBTSxJQUFJLEdBQUcsb0JBQVEsQ0FBQyxrQkFBa0IsQ0FDdEMsSUFBSSxFQUNKLGtCQUFrQixDQUFDLElBQUksQ0FDeEIsQ0FBQztvQkFDRixJQUFJLFVBQVUsS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRSxDQUFDO3dCQUM5QyxPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztvQkFDekMsQ0FBQztvQkFDRCxNQUFNLGVBQWUsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDdEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDbEMsS0FBSyxNQUFNLFFBQVEsSUFBSSxTQUFTLEVBQUUsQ0FBQzt3QkFDakMsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUM7NEJBQ3JELE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDO3dCQUN6QyxDQUFDO29CQUNILENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyw2QkFBaUIsQ0FBQyxTQUFTLENBQUM7SUFDckMsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLDZCQUFpQixDQUFDLGNBQWMsQ0FBQztJQUMxQyxDQUFDO0FBQ0gsQ0FBQyxFQUNELE1BQU0sRUFDTixFQUFFLEtBQUssRUFBRSxJQUFBLFlBQUssRUFBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FDbEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5Db3B5cmlnaHQgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4qL1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IENmblJlc291cmNlLCBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENmblRhc2tEZWZpbml0aW9uLCBOZXR3b3JrTW9kZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1lY3MnO1xuaW1wb3J0IHsgTmFnUnVsZUNvbXBsaWFuY2UsIE5hZ1J1bGVzIH0gZnJvbSAnLi4vLi4vbmFnLXJ1bGVzJztcblxuLyoqXG4gKiBDb250YWluZXJzIGluIEVDUyB0YXNrIGRlZmluaXRpb25zIGNvbmZpZ3VyZWQgZm9yIGhvc3QgbmV0d29ya2luZyBoYXZlICdwcml2aWxlZ2VkJyBzZXQgdG8gdHJ1ZSBhbmQgYSBub24tZW1wdHkgbm9uLXJvb3QgJ3VzZXInXG4gKiBAcGFyYW0gbm9kZSB0aGUgQ2ZuUmVzb3VyY2UgdG8gY2hlY2tcbiAqL1xuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmRlZmluZVByb3BlcnR5KFxuICAobm9kZTogQ2ZuUmVzb3VyY2UpOiBOYWdSdWxlQ29tcGxpYW5jZSA9PiB7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBDZm5UYXNrRGVmaW5pdGlvbikge1xuICAgICAgaWYgKG5vZGUubmV0d29ya01vZGUgPT09IE5ldHdvcmtNb2RlLkhPU1QpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyRGVmaW5pdGlvbnMgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKFxuICAgICAgICAgIG5vZGUuY29udGFpbmVyRGVmaW5pdGlvbnNcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGNvbnRhaW5lckRlZmluaXRpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGNvbnRhaW5lckRlZmluaXRpb24gb2YgY29udGFpbmVyRGVmaW5pdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkRGVmaW5pdGlvbiA9XG4gICAgICAgICAgICAgIFN0YWNrLm9mKG5vZGUpLnJlc29sdmUoY29udGFpbmVyRGVmaW5pdGlvbik7XG4gICAgICAgICAgICBjb25zdCBwcml2aWxlZ2VkID0gTmFnUnVsZXMucmVzb2x2ZUlmUHJpbWl0aXZlKFxuICAgICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgICByZXNvbHZlZERlZmluaXRpb24ucHJpdmlsZWdlZFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBOYWdSdWxlcy5yZXNvbHZlSWZQcmltaXRpdmUoXG4gICAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICAgIHJlc29sdmVkRGVmaW5pdGlvbi51c2VyXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHByaXZpbGVnZWQgIT09IHRydWUgfHwgdXNlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgcm9vdElkZW50aWZpZXJzID0gWydyb290JywgJzAnXTtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJQYXJ0cyA9IHVzZXIuc3BsaXQoJzonKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdXNlclBhcnQgb2YgdXNlclBhcnRzKSB7XG4gICAgICAgICAgICAgIGlmIChyb290SWRlbnRpZmllcnMuaW5jbHVkZXModXNlclBhcnQudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9OX0NPTVBMSUFOVDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLkNPTVBMSUFOVDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PVF9BUFBMSUNBQkxFO1xuICAgIH1cbiAgfSxcbiAgJ25hbWUnLFxuICB7IHZhbHVlOiBwYXJzZShfX2ZpbGVuYW1lKS5uYW1lIH1cbik7XG4iXX0=