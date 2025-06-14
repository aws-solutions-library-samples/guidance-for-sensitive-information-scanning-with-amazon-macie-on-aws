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
 * S3 Buckets and bucket policies require requests to use SSL
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_s3_1.CfnBucket) {
        const bucketLogicalId = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, node.ref);
        const bucketName = aws_cdk_lib_1.Stack.of(node).resolve(node.bucketName);
        let found = false;
        for (const child of aws_cdk_lib_1.Stack.of(node).node.findAll()) {
            if (child instanceof aws_s3_1.CfnBucketPolicy) {
                if (isMatchingPolicy(child, bucketLogicalId, bucketName) &&
                    isCompliantPolicy(child, bucketLogicalId, bucketName)) {
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
    else if (node instanceof aws_s3_1.CfnBucketPolicy) {
        const bucketLogicalId = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, node.bucket);
        return isCompliantPolicy(node, bucketLogicalId, node.bucket)
            ? nag_rules_1.NagRuleCompliance.COMPLIANT
            : nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
/**
 * Helper function to check whether the Bucket Policy belongs to the given bucket
 * @param node The CfnBucketPolicy to check.
 * @param bucketLogicalId The Cfn Logical ID of the bucket.
 * @param bucketName The name of the bucket.
 * @returns Whether the CfnBucketPolicy belongs to th egiven bucket.
 */
function isMatchingPolicy(node, bucketLogicalId, bucketName) {
    const bucket = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, node.bucket);
    return bucket === bucketLogicalId || bucket === bucketName;
}
/**
 * Helper function to check whether the Bucket Policy requires SSL on the given bucket.
 * @param node The CfnBucketPolicy to check.
 * @param bucketLogicalId The Cfn Logical ID of the bucket.
 * @param bucketName The name of the bucket.
 * @returns Whether the CfnBucketPolicy requires SSL on the given bucket.
 */
function isCompliantPolicy(node, bucketLogicalId, bucketName) {
    const resolvedPolicyDocument = aws_cdk_lib_1.Stack.of(node).resolve(node.policyDocument);
    for (const statement of resolvedPolicyDocument.Statement) {
        const resolvedStatement = aws_cdk_lib_1.Stack.of(node).resolve(statement);
        const secureTransport = resolvedStatement?.Condition?.Bool?.['aws:SecureTransport'];
        if (resolvedStatement.Effect === 'Deny' &&
            checkMatchingAction(resolvedStatement.Action) === true &&
            checkMatchingPrincipal(resolvedStatement.Principal) === true &&
            (secureTransport === 'false' || secureTransport === false) &&
            checkMatchingResources(node, bucketLogicalId, bucketName, resolvedStatement.Resource) === true) {
            return true;
        }
    }
    return false;
}
/**
 * Helper function to check whether the Bucket Policy applies to all actions
 * @param node The CfnBucketPolicy to check
 * @param actions The action in the bucket policy
 * @returns Whether the CfnBucketPolicy applies to all actions
 */
function checkMatchingAction(actions) {
    if (Array.isArray(actions)) {
        for (const action of actions) {
            if (action === '*' || action.toLowerCase() === 's3:*') {
                return true;
            }
        }
    }
    else if (actions === '*' || actions.toLowerCase() === 's3:*') {
        return true;
    }
    return false;
}
/**
 * Helper function to check whether the Bucket Policy applies to all principals
 * @param node The CfnBucketPolicy to check
 * @param principal The principals in the bucket policy
 * @returns Whether the CfnBucketPolicy applies to all principals
 */
function checkMatchingPrincipal(principals) {
    if (principals === '*') {
        return true;
    }
    const awsPrincipal = principals.AWS;
    if (Array.isArray(awsPrincipal)) {
        for (const account of awsPrincipal) {
            if (account === '*') {
                return true;
            }
        }
    }
    else if (awsPrincipal === '*') {
        return true;
    }
    return false;
}
/**
 * Helper function to check whether the Bucket Policy applies to the bucket and all of it's resources
 * @param node The CfnBucketPolicy to check
 * @param bucketLogicalId The Cfn Logical ID of the bucket
 * @param bucketName The name of the bucket
 * @param resources The resources in the bucket policy
 * @returns Whether the Bucket Policy applies to the bucket and all of it's resources
 */
function checkMatchingResources(node, bucketLogicalId, bucketName, resources) {
    if (!Array.isArray(resources)) {
        return false;
    }
    const bucketResourceRegexes = Array();
    const bucketObjectsRegexes = Array();
    bucketResourceRegexes.push(`(${bucketLogicalId}(?![\\w\\-]))`);
    bucketObjectsRegexes.push(`(${bucketLogicalId}(?![\\w\\-]).*\\/\\*)`);
    if (bucketName !== undefined) {
        bucketResourceRegexes.push(`(${bucketName}(?![\\w\\-]))`);
        bucketObjectsRegexes.push(`(${bucketName}(?![\\w\\-]).*\\/\\*)`);
    }
    const fullBucketResourceRegex = new RegExp(bucketResourceRegexes.join('|'));
    const fullBucketObjectsRegex = new RegExp(bucketObjectsRegexes.join('|'));
    let matchedBucketResource = false;
    let matchedObjectsResource = false;
    for (const resource of resources) {
        const resolvedResourceString = JSON.stringify(aws_cdk_lib_1.Stack.of(node).resolve(resource));
        if (matchedBucketResource === false &&
            fullBucketResourceRegex.test(resolvedResourceString) &&
            !resolvedResourceString.includes('/')) {
            matchedBucketResource = true;
        }
        else if (matchedObjectsResource === false &&
            fullBucketObjectsRegex.test(resolvedResourceString) &&
            resolvedResourceString.indexOf('/') ===
                resolvedResourceString.lastIndexOf('/')) {
            matchedObjectsResource = true;
        }
        if (matchedBucketResource === true && matchedObjectsResource === true) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUzNCdWNrZXRTU0xSZXF1ZXN0c09ubHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvczMvUzNCdWNrZXRTU0xSZXF1ZXN0c09ubHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0VBR0U7QUFDRiwrQkFBNkI7QUFDN0IsNkNBQWlEO0FBQ2pELCtDQUFnRTtBQUNoRSwrQ0FBOEQ7QUFFOUQ7OztHQUdHO0FBRUgsa0JBQWUsTUFBTSxDQUFDLGNBQWMsQ0FDbEMsQ0FBQyxJQUFpQixFQUFxQixFQUFFO0lBQ3ZDLElBQUksSUFBSSxZQUFZLGtCQUFTLEVBQUUsQ0FBQztRQUM5QixNQUFNLGVBQWUsR0FBRyxvQkFBUSxDQUFDLDRCQUE0QixDQUMzRCxJQUFJLEVBQ0osSUFBSSxDQUFDLEdBQUcsQ0FDVCxDQUFDO1FBQ0YsTUFBTSxVQUFVLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzRCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbEIsS0FBSyxNQUFNLEtBQUssSUFBSSxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQztZQUNsRCxJQUFJLEtBQUssWUFBWSx3QkFBZSxFQUFFLENBQUM7Z0JBQ3JDLElBQ0UsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLGVBQWUsRUFBRSxVQUFVLENBQUM7b0JBQ3BELGlCQUFpQixDQUFDLEtBQUssRUFBRSxlQUFlLEVBQUUsVUFBVSxDQUFDLEVBQ3JELENBQUM7b0JBQ0QsS0FBSyxHQUFHLElBQUksQ0FBQztvQkFDYixNQUFNO2dCQUNSLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUNELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNYLE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDO1FBQ3pD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b24uY29tLCBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiovXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ2ZuUmVzb3VyY2UsIFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ2ZuQnVja2V0LCBDZm5CdWNrZXRQb2xpY3kgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtczMnO1xuaW1wb3J0IHsgTmFnUnVsZUNvbXBsaWFuY2UsIE5hZ1J1bGVzIH0gZnJvbSAnLi4vLi4vbmFnLXJ1bGVzJztcblxuLyoqXG4gKiBTMyBCdWNrZXRzIGFuZCBidWNrZXQgcG9saWNpZXMgcmVxdWlyZSByZXF1ZXN0cyB0byB1c2UgU1NMXG4gKiBAcGFyYW0gbm9kZSB0aGUgQ2ZuUmVzb3VyY2UgdG8gY2hlY2tcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIChub2RlOiBDZm5SZXNvdXJjZSk6IE5hZ1J1bGVDb21wbGlhbmNlID0+IHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENmbkJ1Y2tldCkge1xuICAgICAgY29uc3QgYnVja2V0TG9naWNhbElkID0gTmFnUnVsZXMucmVzb2x2ZVJlc291cmNlRnJvbUludHJpbnNpYyhcbiAgICAgICAgbm9kZSxcbiAgICAgICAgbm9kZS5yZWZcbiAgICAgICk7XG4gICAgICBjb25zdCBidWNrZXROYW1lID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShub2RlLmJ1Y2tldE5hbWUpO1xuICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIFN0YWNrLm9mKG5vZGUpLm5vZGUuZmluZEFsbCgpKSB7XG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIENmbkJ1Y2tldFBvbGljeSkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGlzTWF0Y2hpbmdQb2xpY3koY2hpbGQsIGJ1Y2tldExvZ2ljYWxJZCwgYnVja2V0TmFtZSkgJiZcbiAgICAgICAgICAgIGlzQ29tcGxpYW50UG9saWN5KGNoaWxkLCBidWNrZXRMb2dpY2FsSWQsIGJ1Y2tldE5hbWUpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PTl9DT01QTElBTlQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuQ09NUExJQU5UO1xuICAgIH0gZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIENmbkJ1Y2tldFBvbGljeSkge1xuICAgICAgY29uc3QgYnVja2V0TG9naWNhbElkID0gTmFnUnVsZXMucmVzb2x2ZVJlc291cmNlRnJvbUludHJpbnNpYyhcbiAgICAgICAgbm9kZSxcbiAgICAgICAgbm9kZS5idWNrZXRcbiAgICAgICk7XG4gICAgICByZXR1cm4gaXNDb21wbGlhbnRQb2xpY3kobm9kZSwgYnVja2V0TG9naWNhbElkLCBub2RlLmJ1Y2tldClcbiAgICAgICAgPyBOYWdSdWxlQ29tcGxpYW5jZS5DT01QTElBTlRcbiAgICAgICAgOiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9UX0FQUExJQ0FCTEU7XG4gICAgfVxuICB9LFxuICAnbmFtZScsXG4gIHsgdmFsdWU6IHBhcnNlKF9fZmlsZW5hbWUpLm5hbWUgfVxuKTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY2hlY2sgd2hldGhlciB0aGUgQnVja2V0IFBvbGljeSBiZWxvbmdzIHRvIHRoZSBnaXZlbiBidWNrZXRcbiAqIEBwYXJhbSBub2RlIFRoZSBDZm5CdWNrZXRQb2xpY3kgdG8gY2hlY2suXG4gKiBAcGFyYW0gYnVja2V0TG9naWNhbElkIFRoZSBDZm4gTG9naWNhbCBJRCBvZiB0aGUgYnVja2V0LlxuICogQHBhcmFtIGJ1Y2tldE5hbWUgVGhlIG5hbWUgb2YgdGhlIGJ1Y2tldC5cbiAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIENmbkJ1Y2tldFBvbGljeSBiZWxvbmdzIHRvIHRoIGVnaXZlbiBidWNrZXQuXG4gKi9cbmZ1bmN0aW9uIGlzTWF0Y2hpbmdQb2xpY3koXG4gIG5vZGU6IENmbkJ1Y2tldFBvbGljeSxcbiAgYnVja2V0TG9naWNhbElkOiBzdHJpbmcsXG4gIGJ1Y2tldE5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZFxuKTogYm9vbGVhbiB7XG4gIGNvbnN0IGJ1Y2tldCA9IE5hZ1J1bGVzLnJlc29sdmVSZXNvdXJjZUZyb21JbnRyaW5zaWMobm9kZSwgbm9kZS5idWNrZXQpO1xuICByZXR1cm4gYnVja2V0ID09PSBidWNrZXRMb2dpY2FsSWQgfHwgYnVja2V0ID09PSBidWNrZXROYW1lO1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBjaGVjayB3aGV0aGVyIHRoZSBCdWNrZXQgUG9saWN5IHJlcXVpcmVzIFNTTCBvbiB0aGUgZ2l2ZW4gYnVja2V0LlxuICogQHBhcmFtIG5vZGUgVGhlIENmbkJ1Y2tldFBvbGljeSB0byBjaGVjay5cbiAqIEBwYXJhbSBidWNrZXRMb2dpY2FsSWQgVGhlIENmbiBMb2dpY2FsIElEIG9mIHRoZSBidWNrZXQuXG4gKiBAcGFyYW0gYnVja2V0TmFtZSBUaGUgbmFtZSBvZiB0aGUgYnVja2V0LlxuICogQHJldHVybnMgV2hldGhlciB0aGUgQ2ZuQnVja2V0UG9saWN5IHJlcXVpcmVzIFNTTCBvbiB0aGUgZ2l2ZW4gYnVja2V0LlxuICovXG5mdW5jdGlvbiBpc0NvbXBsaWFudFBvbGljeShcbiAgbm9kZTogQ2ZuQnVja2V0UG9saWN5LFxuICBidWNrZXRMb2dpY2FsSWQ6IHN0cmluZyxcbiAgYnVja2V0TmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkXG4pOiBib29sZWFuIHtcbiAgY29uc3QgcmVzb2x2ZWRQb2xpY3lEb2N1bWVudCA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUobm9kZS5wb2xpY3lEb2N1bWVudCk7XG4gIGZvciAoY29uc3Qgc3RhdGVtZW50IG9mIHJlc29sdmVkUG9saWN5RG9jdW1lbnQuU3RhdGVtZW50KSB7XG4gICAgY29uc3QgcmVzb2x2ZWRTdGF0ZW1lbnQgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKHN0YXRlbWVudCk7XG4gICAgY29uc3Qgc2VjdXJlVHJhbnNwb3J0ID1cbiAgICAgIHJlc29sdmVkU3RhdGVtZW50Py5Db25kaXRpb24/LkJvb2w/LlsnYXdzOlNlY3VyZVRyYW5zcG9ydCddO1xuICAgIGlmIChcbiAgICAgIHJlc29sdmVkU3RhdGVtZW50LkVmZmVjdCA9PT0gJ0RlbnknICYmXG4gICAgICBjaGVja01hdGNoaW5nQWN0aW9uKHJlc29sdmVkU3RhdGVtZW50LkFjdGlvbikgPT09IHRydWUgJiZcbiAgICAgIGNoZWNrTWF0Y2hpbmdQcmluY2lwYWwocmVzb2x2ZWRTdGF0ZW1lbnQuUHJpbmNpcGFsKSA9PT0gdHJ1ZSAmJlxuICAgICAgKHNlY3VyZVRyYW5zcG9ydCA9PT0gJ2ZhbHNlJyB8fCBzZWN1cmVUcmFuc3BvcnQgPT09IGZhbHNlKSAmJlxuICAgICAgY2hlY2tNYXRjaGluZ1Jlc291cmNlcyhcbiAgICAgICAgbm9kZSxcbiAgICAgICAgYnVja2V0TG9naWNhbElkLFxuICAgICAgICBidWNrZXROYW1lLFxuICAgICAgICByZXNvbHZlZFN0YXRlbWVudC5SZXNvdXJjZVxuICAgICAgKSA9PT0gdHJ1ZVxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY2hlY2sgd2hldGhlciB0aGUgQnVja2V0IFBvbGljeSBhcHBsaWVzIHRvIGFsbCBhY3Rpb25zXG4gKiBAcGFyYW0gbm9kZSBUaGUgQ2ZuQnVja2V0UG9saWN5IHRvIGNoZWNrXG4gKiBAcGFyYW0gYWN0aW9ucyBUaGUgYWN0aW9uIGluIHRoZSBidWNrZXQgcG9saWN5XG4gKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBDZm5CdWNrZXRQb2xpY3kgYXBwbGllcyB0byBhbGwgYWN0aW9uc1xuICovXG5mdW5jdGlvbiBjaGVja01hdGNoaW5nQWN0aW9uKGFjdGlvbnM6IGFueSk6IGJvb2xlYW4ge1xuICBpZiAoQXJyYXkuaXNBcnJheShhY3Rpb25zKSkge1xuICAgIGZvciAoY29uc3QgYWN0aW9uIG9mIGFjdGlvbnMpIHtcbiAgICAgIGlmIChhY3Rpb24gPT09ICcqJyB8fCBhY3Rpb24udG9Mb3dlckNhc2UoKSA9PT0gJ3MzOionKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChhY3Rpb25zID09PSAnKicgfHwgYWN0aW9ucy50b0xvd2VyQ2FzZSgpID09PSAnczM6KicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGNoZWNrIHdoZXRoZXIgdGhlIEJ1Y2tldCBQb2xpY3kgYXBwbGllcyB0byBhbGwgcHJpbmNpcGFsc1xuICogQHBhcmFtIG5vZGUgVGhlIENmbkJ1Y2tldFBvbGljeSB0byBjaGVja1xuICogQHBhcmFtIHByaW5jaXBhbCBUaGUgcHJpbmNpcGFscyBpbiB0aGUgYnVja2V0IHBvbGljeVxuICogQHJldHVybnMgV2hldGhlciB0aGUgQ2ZuQnVja2V0UG9saWN5IGFwcGxpZXMgdG8gYWxsIHByaW5jaXBhbHNcbiAqL1xuZnVuY3Rpb24gY2hlY2tNYXRjaGluZ1ByaW5jaXBhbChwcmluY2lwYWxzOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKHByaW5jaXBhbHMgPT09ICcqJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGNvbnN0IGF3c1ByaW5jaXBhbCA9IHByaW5jaXBhbHMuQVdTO1xuICBpZiAoQXJyYXkuaXNBcnJheShhd3NQcmluY2lwYWwpKSB7XG4gICAgZm9yIChjb25zdCBhY2NvdW50IG9mIGF3c1ByaW5jaXBhbCkge1xuICAgICAgaWYgKGFjY291bnQgPT09ICcqJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoYXdzUHJpbmNpcGFsID09PSAnKicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGNoZWNrIHdoZXRoZXIgdGhlIEJ1Y2tldCBQb2xpY3kgYXBwbGllcyB0byB0aGUgYnVja2V0IGFuZCBhbGwgb2YgaXQncyByZXNvdXJjZXNcbiAqIEBwYXJhbSBub2RlIFRoZSBDZm5CdWNrZXRQb2xpY3kgdG8gY2hlY2tcbiAqIEBwYXJhbSBidWNrZXRMb2dpY2FsSWQgVGhlIENmbiBMb2dpY2FsIElEIG9mIHRoZSBidWNrZXRcbiAqIEBwYXJhbSBidWNrZXROYW1lIFRoZSBuYW1lIG9mIHRoZSBidWNrZXRcbiAqIEBwYXJhbSByZXNvdXJjZXMgVGhlIHJlc291cmNlcyBpbiB0aGUgYnVja2V0IHBvbGljeVxuICogQHJldHVybnMgV2hldGhlciB0aGUgQnVja2V0IFBvbGljeSBhcHBsaWVzIHRvIHRoZSBidWNrZXQgYW5kIGFsbCBvZiBpdCdzIHJlc291cmNlc1xuICovXG5mdW5jdGlvbiBjaGVja01hdGNoaW5nUmVzb3VyY2VzKFxuICBub2RlOiBDZm5CdWNrZXRQb2xpY3ksXG4gIGJ1Y2tldExvZ2ljYWxJZDogc3RyaW5nLFxuICBidWNrZXROYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gIHJlc291cmNlczogYW55XG4pOiBib29sZWFuIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHJlc291cmNlcykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgYnVja2V0UmVzb3VyY2VSZWdleGVzID0gQXJyYXk8c3RyaW5nPigpO1xuICBjb25zdCBidWNrZXRPYmplY3RzUmVnZXhlcyA9IEFycmF5PHN0cmluZz4oKTtcbiAgYnVja2V0UmVzb3VyY2VSZWdleGVzLnB1c2goYCgke2J1Y2tldExvZ2ljYWxJZH0oPyFbXFxcXHdcXFxcLV0pKWApO1xuICBidWNrZXRPYmplY3RzUmVnZXhlcy5wdXNoKGAoJHtidWNrZXRMb2dpY2FsSWR9KD8hW1xcXFx3XFxcXC1dKS4qXFxcXC9cXFxcKilgKTtcbiAgaWYgKGJ1Y2tldE5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgIGJ1Y2tldFJlc291cmNlUmVnZXhlcy5wdXNoKGAoJHtidWNrZXROYW1lfSg/IVtcXFxcd1xcXFwtXSkpYCk7XG4gICAgYnVja2V0T2JqZWN0c1JlZ2V4ZXMucHVzaChgKCR7YnVja2V0TmFtZX0oPyFbXFxcXHdcXFxcLV0pLipcXFxcL1xcXFwqKWApO1xuICB9XG4gIGNvbnN0IGZ1bGxCdWNrZXRSZXNvdXJjZVJlZ2V4ID0gbmV3IFJlZ0V4cChidWNrZXRSZXNvdXJjZVJlZ2V4ZXMuam9pbignfCcpKTtcbiAgY29uc3QgZnVsbEJ1Y2tldE9iamVjdHNSZWdleCA9IG5ldyBSZWdFeHAoYnVja2V0T2JqZWN0c1JlZ2V4ZXMuam9pbignfCcpKTtcbiAgbGV0IG1hdGNoZWRCdWNrZXRSZXNvdXJjZSA9IGZhbHNlO1xuICBsZXQgbWF0Y2hlZE9iamVjdHNSZXNvdXJjZSA9IGZhbHNlO1xuICBmb3IgKGNvbnN0IHJlc291cmNlIG9mIHJlc291cmNlcykge1xuICAgIGNvbnN0IHJlc29sdmVkUmVzb3VyY2VTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShcbiAgICAgIFN0YWNrLm9mKG5vZGUpLnJlc29sdmUocmVzb3VyY2UpXG4gICAgKTtcbiAgICBpZiAoXG4gICAgICBtYXRjaGVkQnVja2V0UmVzb3VyY2UgPT09IGZhbHNlICYmXG4gICAgICBmdWxsQnVja2V0UmVzb3VyY2VSZWdleC50ZXN0KHJlc29sdmVkUmVzb3VyY2VTdHJpbmcpICYmXG4gICAgICAhcmVzb2x2ZWRSZXNvdXJjZVN0cmluZy5pbmNsdWRlcygnLycpXG4gICAgKSB7XG4gICAgICBtYXRjaGVkQnVja2V0UmVzb3VyY2UgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBtYXRjaGVkT2JqZWN0c1Jlc291cmNlID09PSBmYWxzZSAmJlxuICAgICAgZnVsbEJ1Y2tldE9iamVjdHNSZWdleC50ZXN0KHJlc29sdmVkUmVzb3VyY2VTdHJpbmcpICYmXG4gICAgICByZXNvbHZlZFJlc291cmNlU3RyaW5nLmluZGV4T2YoJy8nKSA9PT1cbiAgICAgICAgcmVzb2x2ZWRSZXNvdXJjZVN0cmluZy5sYXN0SW5kZXhPZignLycpXG4gICAgKSB7XG4gICAgICBtYXRjaGVkT2JqZWN0c1Jlc291cmNlID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG1hdGNoZWRCdWNrZXRSZXNvdXJjZSA9PT0gdHJ1ZSAmJiBtYXRjaGVkT2JqZWN0c1Jlc291cmNlID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuIl19