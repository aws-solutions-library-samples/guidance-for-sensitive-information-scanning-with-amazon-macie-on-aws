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
/**
 * IAM Groups have at least one IAM User
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_iam_1.CfnGroup) {
        const groupLogicalId = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, node.ref);
        const groupName = aws_cdk_lib_1.Stack.of(node).resolve(node.groupName);
        let found = false;
        for (const child of aws_cdk_lib_1.Stack.of(node).node.findAll()) {
            if (child instanceof aws_iam_1.CfnUser) {
                if (isMatchingUser(child, groupLogicalId, groupName)) {
                    found = true;
                    break;
                }
            }
            else if (child instanceof aws_iam_1.CfnUserToGroupAddition) {
                if (isMatchingGroupAddition(child, groupLogicalId, groupName)) {
                    found = true;
                    break;
                }
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
/**
 * Helper function to check whether the IAM User belongs to the IAM Group
 * @param node the CfnUser to check
 * @param groupLogicalId the Cfn Logical ID of the group
 * @param groupName the name of the group
 * returns whether the CfnUser is in the given group
 */
function isMatchingUser(node, groupLogicalId, groupName) {
    const groups = aws_cdk_lib_1.Stack.of(node).resolve(node.groups);
    if (Array.isArray(groups)) {
        for (const group of groups) {
            const resolvedGroup = JSON.stringify(aws_cdk_lib_1.Stack.of(node).resolve(group));
            if (new RegExp(`${groupLogicalId}(?![\\w])`).test(resolvedGroup) ||
                (groupName != undefined &&
                    new RegExp(`${groupName}(?![\\w\\-_\\.])`).test(resolvedGroup))) {
                return true;
            }
        }
    }
    return false;
}
/**
 * Helper function to check whether the User to Group Addition mentions the specified Group
 * @param node the CfnUserToGroupAddition to check
 * @param groupLogicalId the Cfn Logical ID of the group
 * @param groupName the name of the group
 * returns whether the CfnUserToGroupAddition references the given group
 */
function isMatchingGroupAddition(node, groupLogicalId, groupName) {
    const resolvedGroup = JSON.stringify(aws_cdk_lib_1.Stack.of(node).resolve(node.groupName));
    if (new RegExp(`${groupLogicalId}(?![\\w])`).test(resolvedGroup) ||
        (groupName != undefined &&
            new RegExp(`${groupName}(?![\\w\\-_\\.])`).test(resolvedGroup))) {
        return true;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSUFNR3JvdXBIYXNVc2Vycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9pYW0vSUFNR3JvdXBIYXNVc2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7RUFHRTtBQUNGLCtCQUE2QjtBQUM3Qiw2Q0FBaUQ7QUFDakQsaURBQWdGO0FBQ2hGLCtDQUE4RDtBQUU5RDs7O0dBR0c7QUFFSCxrQkFBZSxNQUFNLENBQUMsY0FBYyxDQUNsQyxDQUFDLElBQWlCLEVBQXFCLEVBQUU7SUFDdkMsSUFBSSxJQUFJLFlBQVksa0JBQVEsRUFBRSxDQUFDO1FBQzdCLE1BQU0sY0FBYyxHQUFHLG9CQUFRLENBQUMsNEJBQTRCLENBQzFELElBQUksRUFDSixJQUFJLENBQUMsR0FBRyxDQUNULENBQUM7UUFDRixNQUFNLFNBQVMsR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNsQixLQUFLLE1BQU0sS0FBSyxJQUFJLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO1lBQ2xELElBQUksS0FBSyxZQUFZLGlCQUFPLEVBQUUsQ0FBQztnQkFDN0IsSUFBSSxjQUFjLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDO29CQUNyRCxLQUFLLEdBQUcsSUFBSSxDQUFDO29CQUNiLE1BQU07Z0JBQ1IsQ0FBQztZQUNILENBQUM7aUJBQU0sSUFBSSxLQUFLLFlBQVksZ0NBQXNCLEVBQUUsQ0FBQztnQkFDbkQsSUFBSSx1QkFBdUIsQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUM7b0JBQzlELEtBQUssR0FBRyxJQUFJLENBQUM7b0JBQ2IsTUFBTTtnQkFDUixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDWCxPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsT0FBTyw2QkFBaUIsQ0FBQyxTQUFTLENBQUM7SUFDckMsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLDZCQUFpQixDQUFDLGNBQWMsQ0FBQztJQUMxQyxDQUFDO0FBQ0gsQ0FBQyxFQUNELE1BQU0sRUFDTixFQUFFLEtBQUssRUFBRSxJQUFBLFlBQUssRUFBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FDbEMsQ0FBQztBQUVGOzs7Ozs7R0FNRztBQUNILFNBQVMsY0FBYyxDQUNyQixJQUFhLEVBQ2IsY0FBc0IsRUFDdEIsU0FBNkI7SUFFN0IsTUFBTSxNQUFNLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUMxQixLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRSxDQUFDO1lBQzNCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDcEUsSUFDRSxJQUFJLE1BQU0sQ0FBQyxHQUFHLGNBQWMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztnQkFDNUQsQ0FBQyxTQUFTLElBQUksU0FBUztvQkFDckIsSUFBSSxNQUFNLENBQUMsR0FBRyxTQUFTLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQ2pFLENBQUM7Z0JBQ0QsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxTQUFTLHVCQUF1QixDQUM5QixJQUE0QixFQUM1QixjQUFzQixFQUN0QixTQUE2QjtJQUU3QixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUM3RSxJQUNFLElBQUksTUFBTSxDQUFDLEdBQUcsY0FBYyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzVELENBQUMsU0FBUyxJQUFJLFNBQVM7WUFDckIsSUFBSSxNQUFNLENBQUMsR0FBRyxTQUFTLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQ2pFLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuQ29weXJpZ2h0IEFtYXpvbi5jb20sIEluYy4gb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5TUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuKi9cbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDZm5SZXNvdXJjZSwgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDZm5Hcm91cCwgQ2ZuVXNlciwgQ2ZuVXNlclRvR3JvdXBBZGRpdGlvbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xuaW1wb3J0IHsgTmFnUnVsZUNvbXBsaWFuY2UsIE5hZ1J1bGVzIH0gZnJvbSAnLi4vLi4vbmFnLXJ1bGVzJztcblxuLyoqXG4gKiBJQU0gR3JvdXBzIGhhdmUgYXQgbGVhc3Qgb25lIElBTSBVc2VyXG4gKiBAcGFyYW0gbm9kZSB0aGUgQ2ZuUmVzb3VyY2UgdG8gY2hlY2tcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIChub2RlOiBDZm5SZXNvdXJjZSk6IE5hZ1J1bGVDb21wbGlhbmNlID0+IHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENmbkdyb3VwKSB7XG4gICAgICBjb25zdCBncm91cExvZ2ljYWxJZCA9IE5hZ1J1bGVzLnJlc29sdmVSZXNvdXJjZUZyb21JbnRyaW5zaWMoXG4gICAgICAgIG5vZGUsXG4gICAgICAgIG5vZGUucmVmXG4gICAgICApO1xuICAgICAgY29uc3QgZ3JvdXBOYW1lID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShub2RlLmdyb3VwTmFtZSk7XG4gICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgU3RhY2sub2Yobm9kZSkubm9kZS5maW5kQWxsKCkpIHtcbiAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgQ2ZuVXNlcikge1xuICAgICAgICAgIGlmIChpc01hdGNoaW5nVXNlcihjaGlsZCwgZ3JvdXBMb2dpY2FsSWQsIGdyb3VwTmFtZSkpIHtcbiAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIENmblVzZXJUb0dyb3VwQWRkaXRpb24pIHtcbiAgICAgICAgICBpZiAoaXNNYXRjaGluZ0dyb3VwQWRkaXRpb24oY2hpbGQsIGdyb3VwTG9naWNhbElkLCBncm91cE5hbWUpKSB7XG4gICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PTl9DT01QTElBTlQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuQ09NUExJQU5UO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9UX0FQUExJQ0FCTEU7XG4gICAgfVxuICB9LFxuICAnbmFtZScsXG4gIHsgdmFsdWU6IHBhcnNlKF9fZmlsZW5hbWUpLm5hbWUgfVxuKTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY2hlY2sgd2hldGhlciB0aGUgSUFNIFVzZXIgYmVsb25ncyB0byB0aGUgSUFNIEdyb3VwXG4gKiBAcGFyYW0gbm9kZSB0aGUgQ2ZuVXNlciB0byBjaGVja1xuICogQHBhcmFtIGdyb3VwTG9naWNhbElkIHRoZSBDZm4gTG9naWNhbCBJRCBvZiB0aGUgZ3JvdXBcbiAqIEBwYXJhbSBncm91cE5hbWUgdGhlIG5hbWUgb2YgdGhlIGdyb3VwXG4gKiByZXR1cm5zIHdoZXRoZXIgdGhlIENmblVzZXIgaXMgaW4gdGhlIGdpdmVuIGdyb3VwXG4gKi9cbmZ1bmN0aW9uIGlzTWF0Y2hpbmdVc2VyKFxuICBub2RlOiBDZm5Vc2VyLFxuICBncm91cExvZ2ljYWxJZDogc3RyaW5nLFxuICBncm91cE5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZFxuKTogYm9vbGVhbiB7XG4gIGNvbnN0IGdyb3VwcyA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUobm9kZS5ncm91cHMpO1xuICBpZiAoQXJyYXkuaXNBcnJheShncm91cHMpKSB7XG4gICAgZm9yIChjb25zdCBncm91cCBvZiBncm91cHMpIHtcbiAgICAgIGNvbnN0IHJlc29sdmVkR3JvdXAgPSBKU09OLnN0cmluZ2lmeShTdGFjay5vZihub2RlKS5yZXNvbHZlKGdyb3VwKSk7XG4gICAgICBpZiAoXG4gICAgICAgIG5ldyBSZWdFeHAoYCR7Z3JvdXBMb2dpY2FsSWR9KD8hW1xcXFx3XSlgKS50ZXN0KHJlc29sdmVkR3JvdXApIHx8XG4gICAgICAgIChncm91cE5hbWUgIT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgbmV3IFJlZ0V4cChgJHtncm91cE5hbWV9KD8hW1xcXFx3XFxcXC1fXFxcXC5dKWApLnRlc3QocmVzb2x2ZWRHcm91cCkpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY2hlY2sgd2hldGhlciB0aGUgVXNlciB0byBHcm91cCBBZGRpdGlvbiBtZW50aW9ucyB0aGUgc3BlY2lmaWVkIEdyb3VwXG4gKiBAcGFyYW0gbm9kZSB0aGUgQ2ZuVXNlclRvR3JvdXBBZGRpdGlvbiB0byBjaGVja1xuICogQHBhcmFtIGdyb3VwTG9naWNhbElkIHRoZSBDZm4gTG9naWNhbCBJRCBvZiB0aGUgZ3JvdXBcbiAqIEBwYXJhbSBncm91cE5hbWUgdGhlIG5hbWUgb2YgdGhlIGdyb3VwXG4gKiByZXR1cm5zIHdoZXRoZXIgdGhlIENmblVzZXJUb0dyb3VwQWRkaXRpb24gcmVmZXJlbmNlcyB0aGUgZ2l2ZW4gZ3JvdXBcbiAqL1xuZnVuY3Rpb24gaXNNYXRjaGluZ0dyb3VwQWRkaXRpb24oXG4gIG5vZGU6IENmblVzZXJUb0dyb3VwQWRkaXRpb24sXG4gIGdyb3VwTG9naWNhbElkOiBzdHJpbmcsXG4gIGdyb3VwTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkXG4pOiBib29sZWFuIHtcbiAgY29uc3QgcmVzb2x2ZWRHcm91cCA9IEpTT04uc3RyaW5naWZ5KFN0YWNrLm9mKG5vZGUpLnJlc29sdmUobm9kZS5ncm91cE5hbWUpKTtcbiAgaWYgKFxuICAgIG5ldyBSZWdFeHAoYCR7Z3JvdXBMb2dpY2FsSWR9KD8hW1xcXFx3XSlgKS50ZXN0KHJlc29sdmVkR3JvdXApIHx8XG4gICAgKGdyb3VwTmFtZSAhPSB1bmRlZmluZWQgJiZcbiAgICAgIG5ldyBSZWdFeHAoYCR7Z3JvdXBOYW1lfSg/IVtcXFxcd1xcXFwtX1xcXFwuXSlgKS50ZXN0KHJlc29sdmVkR3JvdXApKVxuICApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4iXX0=