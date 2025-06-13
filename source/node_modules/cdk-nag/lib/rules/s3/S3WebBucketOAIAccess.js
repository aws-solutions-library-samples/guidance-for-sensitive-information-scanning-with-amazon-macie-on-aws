"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_s3_1 = require("aws-cdk-lib/aws-s3");
const nag_rules_1 = require("../../nag-rules");
/**
 * S3 static website buckets do not have an open world bucket policy and use CloudFront Origin Access Identities in the bucket policy for limited getObject and/or putObject permissions
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_s3_1.CfnBucket) {
        if (node.websiteConfiguration !== undefined) {
            const bucketLogicalId = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, node.ref);
            const bucketName = aws_cdk_lib_1.Stack.of(node).resolve(node.bucketName);
            let found = false;
            for (const child of aws_cdk_lib_1.Stack.of(node).node.findAll()) {
                if (child instanceof aws_s3_1.CfnBucketPolicy) {
                    if (isMatchingCompliantPolicy(child, bucketLogicalId, bucketName)) {
                        found = true;
                    }
                }
            }
            if (!found) {
                return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
            }
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
/**
 * Helper function to check whether the Bucket Policy does not allow for open access  and uses a restricted OAI Policy for access on the given bucket.
 * @param node The CfnBucketPolicy to check.
 * @param bucketLogicalId The Cfn Logical ID of the bucket.
 * @param bucketName The name of the bucket.
 * @returns Whether the CfnBucketPolicy allows for open access on the given bucket.
 */
function isMatchingCompliantPolicy(node, bucketLogicalId, bucketName) {
    const bucket = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, node.bucket);
    if (bucket !== bucketLogicalId && bucket !== bucketName) {
        return false;
    }
    const resolvedPolicyDocument = aws_cdk_lib_1.Stack.of(node).resolve(node.policyDocument);
    let found = false;
    for (const statement of resolvedPolicyDocument.Statement) {
        const resolvedStatement = aws_cdk_lib_1.Stack.of(node).resolve(statement);
        if (resolvedStatement.Effect === 'Allow') {
            if (checkStarPrincipals(resolvedStatement.Principal)) {
                return false;
            }
            if (checkOAIPrincipal(resolvedStatement.Principal)) {
                if (checkMatchingActions(normalizeArray(resolvedStatement.Action))) {
                    found = true;
                }
                else {
                    return false;
                }
            }
        }
    }
    return found;
}
/**
 * Helper function to check whether the Bucket Policy applies to all principals
 * @param node The CfnBucketPolicy to check
 * @param principal The principals in the bucket policy
 * @returns Whether the CfnBucketPolicy applies to all principals
 */
function checkStarPrincipals(principals) {
    return JSON.stringify(principals ?? '').includes('*');
}
/**
 * Helper function to check whether the Bucket Policy applies to a CloudFront OAI
 * @param node The CfnBucketPolicy to check
 * @param principal The principals in the bucket policy
 * @returns Whether the CfnBucketPolicy applies to a CloudFront OAI
 */
function checkOAIPrincipal(principals) {
    const usesAWSPrincipalOAI = JSON.stringify(principals.AWS ?? '').includes('CloudFront Origin Access Identity');
    const usesCanonicalUserPrincipal = !!principals?.CanonicalUser;
    return usesAWSPrincipalOAI || usesCanonicalUserPrincipal;
}
/**
 * Helper function to check whether the statement applies to only GetObject and/or PutObject actions
 * @param node The statement to check
 * @param actions The action in the bucket statement
 * @returns Whether the statement applies to only GetObject and/or PutObject actions
 */
function checkMatchingActions(actions) {
    for (const action of actions) {
        if (action.toLowerCase() !== 's3:getobject' &&
            action.toLowerCase() !== 's3:putobject') {
            return false;
        }
    }
    return true;
}
function normalizeArray(arrOrStr) {
    return Array.isArray(arrOrStr) ? arrOrStr : [arrOrStr];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUzNXZWJCdWNrZXRPQUlBY2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvczMvUzNXZWJCdWNrZXRPQUlBY2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0VBR0U7QUFDRiwrQkFBNkI7QUFDN0IsNkNBQWlEO0FBQ2pELCtDQUFnRTtBQUNoRSwrQ0FBOEQ7QUFFOUQ7OztHQUdHO0FBQ0gsa0JBQWUsTUFBTSxDQUFDLGNBQWMsQ0FDbEMsQ0FBQyxJQUFpQixFQUFxQixFQUFFO0lBQ3ZDLElBQUksSUFBSSxZQUFZLGtCQUFTLEVBQUUsQ0FBQztRQUM5QixJQUFJLElBQUksQ0FBQyxvQkFBb0IsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUM1QyxNQUFNLGVBQWUsR0FBRyxvQkFBUSxDQUFDLDRCQUE0QixDQUMzRCxJQUFJLEVBQ0osSUFBSSxDQUFDLEdBQUcsQ0FDVCxDQUFDO1lBQ0YsTUFBTSxVQUFVLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMzRCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbEIsS0FBSyxNQUFNLEtBQUssSUFBSSxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQztnQkFDbEQsSUFBSSxLQUFLLFlBQVksd0JBQWUsRUFBRSxDQUFDO29CQUNyQyxJQUFJLHlCQUF5QixDQUFDLEtBQUssRUFBRSxlQUFlLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQzt3QkFDbEUsS0FBSyxHQUFHLElBQUksQ0FBQztvQkFDZixDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1lBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNYLE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDO1lBQ3pDLENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyw2QkFBaUIsQ0FBQyxTQUFTLENBQUM7SUFDckMsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLDZCQUFpQixDQUFDLGNBQWMsQ0FBQztJQUMxQyxDQUFDO0FBQ0gsQ0FBQyxFQUNELE1BQU0sRUFDTixFQUFFLEtBQUssRUFBRSxJQUFBLFlBQUssRUFBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FDbEMsQ0FBQztBQUVGOzs7Ozs7R0FNRztBQUNILFNBQVMseUJBQXlCLENBQ2hDLElBQXFCLEVBQ3JCLGVBQXVCLEVBQ3ZCLFVBQThCO0lBRTlCLE1BQU0sTUFBTSxHQUFHLG9CQUFRLENBQUMsNEJBQTRCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4RSxJQUFJLE1BQU0sS0FBSyxlQUFlLElBQUksTUFBTSxLQUFLLFVBQVUsRUFBRSxDQUFDO1FBQ3hELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNELE1BQU0sc0JBQXNCLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMzRSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDbEIsS0FBSyxNQUFNLFNBQVMsSUFBSSxzQkFBc0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN6RCxNQUFNLGlCQUFpQixHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1RCxJQUFJLGlCQUFpQixDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUUsQ0FBQztZQUN6QyxJQUFJLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7Z0JBQ3JELE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQztZQUNELElBQUksaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztnQkFDbkQsSUFBSSxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUNuRSxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUNmLENBQUM7cUJBQU0sQ0FBQztvQkFDTixPQUFPLEtBQUssQ0FBQztnQkFDZixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFTLG1CQUFtQixDQUFDLFVBQWU7SUFDMUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDeEQsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsU0FBUyxpQkFBaUIsQ0FBQyxVQUFlO0lBQ3hDLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FDdkUsbUNBQW1DLENBQ3BDLENBQUM7SUFDRixNQUFNLDBCQUEwQixHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDO0lBQy9ELE9BQU8sbUJBQW1CLElBQUksMEJBQTBCLENBQUM7QUFDM0QsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsU0FBUyxvQkFBb0IsQ0FBQyxPQUFpQjtJQUM3QyxLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQzdCLElBQ0UsTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLGNBQWM7WUFDdkMsTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLGNBQWMsRUFDdkMsQ0FBQztZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztJQUNILENBQUM7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCxTQUFTLGNBQWMsQ0FBSSxRQUFpQjtJQUMxQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN6RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbkNvcHlyaWdodCBBbWF6b24uY29tLCBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiovXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ2ZuUmVzb3VyY2UsIFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ2ZuQnVja2V0LCBDZm5CdWNrZXRQb2xpY3kgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtczMnO1xuaW1wb3J0IHsgTmFnUnVsZUNvbXBsaWFuY2UsIE5hZ1J1bGVzIH0gZnJvbSAnLi4vLi4vbmFnLXJ1bGVzJztcblxuLyoqXG4gKiBTMyBzdGF0aWMgd2Vic2l0ZSBidWNrZXRzIGRvIG5vdCBoYXZlIGFuIG9wZW4gd29ybGQgYnVja2V0IHBvbGljeSBhbmQgdXNlIENsb3VkRnJvbnQgT3JpZ2luIEFjY2VzcyBJZGVudGl0aWVzIGluIHRoZSBidWNrZXQgcG9saWN5IGZvciBsaW1pdGVkIGdldE9iamVjdCBhbmQvb3IgcHV0T2JqZWN0IHBlcm1pc3Npb25zXG4gKiBAcGFyYW0gbm9kZSB0aGUgQ2ZuUmVzb3VyY2UgdG8gY2hlY2tcbiAqL1xuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmRlZmluZVByb3BlcnR5KFxuICAobm9kZTogQ2ZuUmVzb3VyY2UpOiBOYWdSdWxlQ29tcGxpYW5jZSA9PiB7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBDZm5CdWNrZXQpIHtcbiAgICAgIGlmIChub2RlLndlYnNpdGVDb25maWd1cmF0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgYnVja2V0TG9naWNhbElkID0gTmFnUnVsZXMucmVzb2x2ZVJlc291cmNlRnJvbUludHJpbnNpYyhcbiAgICAgICAgICBub2RlLFxuICAgICAgICAgIG5vZGUucmVmXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGJ1Y2tldE5hbWUgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKG5vZGUuYnVja2V0TmFtZSk7XG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIFN0YWNrLm9mKG5vZGUpLm5vZGUuZmluZEFsbCgpKSB7XG4gICAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgQ2ZuQnVja2V0UG9saWN5KSB7XG4gICAgICAgICAgICBpZiAoaXNNYXRjaGluZ0NvbXBsaWFudFBvbGljeShjaGlsZCwgYnVja2V0TG9naWNhbElkLCBidWNrZXROYW1lKSkge1xuICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9OX0NPTVBMSUFOVDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLkNPTVBMSUFOVDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PVF9BUFBMSUNBQkxFO1xuICAgIH1cbiAgfSxcbiAgJ25hbWUnLFxuICB7IHZhbHVlOiBwYXJzZShfX2ZpbGVuYW1lKS5uYW1lIH1cbik7XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGNoZWNrIHdoZXRoZXIgdGhlIEJ1Y2tldCBQb2xpY3kgZG9lcyBub3QgYWxsb3cgZm9yIG9wZW4gYWNjZXNzICBhbmQgdXNlcyBhIHJlc3RyaWN0ZWQgT0FJIFBvbGljeSBmb3IgYWNjZXNzIG9uIHRoZSBnaXZlbiBidWNrZXQuXG4gKiBAcGFyYW0gbm9kZSBUaGUgQ2ZuQnVja2V0UG9saWN5IHRvIGNoZWNrLlxuICogQHBhcmFtIGJ1Y2tldExvZ2ljYWxJZCBUaGUgQ2ZuIExvZ2ljYWwgSUQgb2YgdGhlIGJ1Y2tldC5cbiAqIEBwYXJhbSBidWNrZXROYW1lIFRoZSBuYW1lIG9mIHRoZSBidWNrZXQuXG4gKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBDZm5CdWNrZXRQb2xpY3kgYWxsb3dzIGZvciBvcGVuIGFjY2VzcyBvbiB0aGUgZ2l2ZW4gYnVja2V0LlxuICovXG5mdW5jdGlvbiBpc01hdGNoaW5nQ29tcGxpYW50UG9saWN5KFxuICBub2RlOiBDZm5CdWNrZXRQb2xpY3ksXG4gIGJ1Y2tldExvZ2ljYWxJZDogc3RyaW5nLFxuICBidWNrZXROYW1lOiBzdHJpbmcgfCB1bmRlZmluZWRcbik6IGJvb2xlYW4ge1xuICBjb25zdCBidWNrZXQgPSBOYWdSdWxlcy5yZXNvbHZlUmVzb3VyY2VGcm9tSW50cmluc2ljKG5vZGUsIG5vZGUuYnVja2V0KTtcbiAgaWYgKGJ1Y2tldCAhPT0gYnVja2V0TG9naWNhbElkICYmIGJ1Y2tldCAhPT0gYnVja2V0TmFtZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCByZXNvbHZlZFBvbGljeURvY3VtZW50ID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShub2RlLnBvbGljeURvY3VtZW50KTtcbiAgbGV0IGZvdW5kID0gZmFsc2U7XG4gIGZvciAoY29uc3Qgc3RhdGVtZW50IG9mIHJlc29sdmVkUG9saWN5RG9jdW1lbnQuU3RhdGVtZW50KSB7XG4gICAgY29uc3QgcmVzb2x2ZWRTdGF0ZW1lbnQgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKHN0YXRlbWVudCk7XG4gICAgaWYgKHJlc29sdmVkU3RhdGVtZW50LkVmZmVjdCA9PT0gJ0FsbG93Jykge1xuICAgICAgaWYgKGNoZWNrU3RhclByaW5jaXBhbHMocmVzb2x2ZWRTdGF0ZW1lbnQuUHJpbmNpcGFsKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoY2hlY2tPQUlQcmluY2lwYWwocmVzb2x2ZWRTdGF0ZW1lbnQuUHJpbmNpcGFsKSkge1xuICAgICAgICBpZiAoY2hlY2tNYXRjaGluZ0FjdGlvbnMobm9ybWFsaXplQXJyYXkocmVzb2x2ZWRTdGF0ZW1lbnQuQWN0aW9uKSkpIHtcbiAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmb3VuZDtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY2hlY2sgd2hldGhlciB0aGUgQnVja2V0IFBvbGljeSBhcHBsaWVzIHRvIGFsbCBwcmluY2lwYWxzXG4gKiBAcGFyYW0gbm9kZSBUaGUgQ2ZuQnVja2V0UG9saWN5IHRvIGNoZWNrXG4gKiBAcGFyYW0gcHJpbmNpcGFsIFRoZSBwcmluY2lwYWxzIGluIHRoZSBidWNrZXQgcG9saWN5XG4gKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBDZm5CdWNrZXRQb2xpY3kgYXBwbGllcyB0byBhbGwgcHJpbmNpcGFsc1xuICovXG5mdW5jdGlvbiBjaGVja1N0YXJQcmluY2lwYWxzKHByaW5jaXBhbHM6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocHJpbmNpcGFscyA/PyAnJykuaW5jbHVkZXMoJyonKTtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY2hlY2sgd2hldGhlciB0aGUgQnVja2V0IFBvbGljeSBhcHBsaWVzIHRvIGEgQ2xvdWRGcm9udCBPQUlcbiAqIEBwYXJhbSBub2RlIFRoZSBDZm5CdWNrZXRQb2xpY3kgdG8gY2hlY2tcbiAqIEBwYXJhbSBwcmluY2lwYWwgVGhlIHByaW5jaXBhbHMgaW4gdGhlIGJ1Y2tldCBwb2xpY3lcbiAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIENmbkJ1Y2tldFBvbGljeSBhcHBsaWVzIHRvIGEgQ2xvdWRGcm9udCBPQUlcbiAqL1xuZnVuY3Rpb24gY2hlY2tPQUlQcmluY2lwYWwocHJpbmNpcGFsczogYW55KTogYm9vbGVhbiB7XG4gIGNvbnN0IHVzZXNBV1NQcmluY2lwYWxPQUkgPSBKU09OLnN0cmluZ2lmeShwcmluY2lwYWxzLkFXUyA/PyAnJykuaW5jbHVkZXMoXG4gICAgJ0Nsb3VkRnJvbnQgT3JpZ2luIEFjY2VzcyBJZGVudGl0eSdcbiAgKTtcbiAgY29uc3QgdXNlc0Nhbm9uaWNhbFVzZXJQcmluY2lwYWwgPSAhIXByaW5jaXBhbHM/LkNhbm9uaWNhbFVzZXI7XG4gIHJldHVybiB1c2VzQVdTUHJpbmNpcGFsT0FJIHx8IHVzZXNDYW5vbmljYWxVc2VyUHJpbmNpcGFsO1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBjaGVjayB3aGV0aGVyIHRoZSBzdGF0ZW1lbnQgYXBwbGllcyB0byBvbmx5IEdldE9iamVjdCBhbmQvb3IgUHV0T2JqZWN0IGFjdGlvbnNcbiAqIEBwYXJhbSBub2RlIFRoZSBzdGF0ZW1lbnQgdG8gY2hlY2tcbiAqIEBwYXJhbSBhY3Rpb25zIFRoZSBhY3Rpb24gaW4gdGhlIGJ1Y2tldCBzdGF0ZW1lbnRcbiAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIHN0YXRlbWVudCBhcHBsaWVzIHRvIG9ubHkgR2V0T2JqZWN0IGFuZC9vciBQdXRPYmplY3QgYWN0aW9uc1xuICovXG5mdW5jdGlvbiBjaGVja01hdGNoaW5nQWN0aW9ucyhhY3Rpb25zOiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xuICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBhY3Rpb25zKSB7XG4gICAgaWYgKFxuICAgICAgYWN0aW9uLnRvTG93ZXJDYXNlKCkgIT09ICdzMzpnZXRvYmplY3QnICYmXG4gICAgICBhY3Rpb24udG9Mb3dlckNhc2UoKSAhPT0gJ3MzOnB1dG9iamVjdCdcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUFycmF5PFQ+KGFyck9yU3RyOiBUW10gfCBUKTogVFtdIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXJyT3JTdHIpID8gYXJyT3JTdHIgOiBbYXJyT3JTdHJdO1xufVxuIl19