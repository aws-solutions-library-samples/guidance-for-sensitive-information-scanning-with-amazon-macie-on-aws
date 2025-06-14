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
const flatten_cfn_reference_1 = require("../../utils/flatten-cfn-reference");
/**
 * S3 Buckets have server access logs enabled
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_s3_1.CfnBucket) {
        const logging = aws_cdk_lib_1.Stack.of(node).resolve(node.loggingConfiguration);
        if (logging == undefined ||
            (logging.destinationBucketName == undefined &&
                logging.logFilePrefix == undefined)) {
            let found = false;
            const bucketLogicalId = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, node.ref);
            const bucketName = aws_cdk_lib_1.Stack.of(node).resolve(node.bucketName);
            for (const child of aws_cdk_lib_1.Stack.of(node).node.findAll()) {
                if (child instanceof aws_s3_1.CfnBucket) {
                    if (isMatchingBucket(child, bucketLogicalId, bucketName)) {
                        found = true;
                        break;
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
 * Helper function to check whether a given S3 Bucket uses the target S3 bucket for access logs
 * @param node the CfnBucket to check
 * @param bucketLogicalId the Cfn Logical ID of the target bucket
 * @param bucketName the name of the target bucket
 * returns whether the CfnBucket uses the target S3 bucket for access logs
 */
function isMatchingBucket(node, bucketLogicalId, bucketName) {
    const destinationBucketName = (0, flatten_cfn_reference_1.flattenCfnReference)(aws_cdk_lib_1.Stack.of(node).resolve(aws_cdk_lib_1.Stack.of(node).resolve(node.loggingConfiguration)?.destinationBucketName));
    if (new RegExp(`${bucketLogicalId}(?![\\w])`).test(destinationBucketName) ||
        bucketName === destinationBucketName) {
        return true;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUzNCdWNrZXRMb2dnaW5nRW5hYmxlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9zMy9TM0J1Y2tldExvZ2dpbmdFbmFibGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7OztFQUdFO0FBQ0YsK0JBQTZCO0FBQzdCLDZDQUFpRDtBQUNqRCwrQ0FBK0M7QUFDL0MsK0NBQThEO0FBQzlELDZFQUF3RTtBQUV4RTs7O0dBR0c7QUFDSCxrQkFBZSxNQUFNLENBQUMsY0FBYyxDQUNsQyxDQUFDLElBQWlCLEVBQXFCLEVBQUU7SUFDdkMsSUFBSSxJQUFJLFlBQVksa0JBQVMsRUFBRSxDQUFDO1FBQzlCLE1BQU0sT0FBTyxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNsRSxJQUNFLE9BQU8sSUFBSSxTQUFTO1lBQ3BCLENBQUMsT0FBTyxDQUFDLHFCQUFxQixJQUFJLFNBQVM7Z0JBQ3pDLE9BQU8sQ0FBQyxhQUFhLElBQUksU0FBUyxDQUFDLEVBQ3JDLENBQUM7WUFDRCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbEIsTUFBTSxlQUFlLEdBQUcsb0JBQVEsQ0FBQyw0QkFBNEIsQ0FDM0QsSUFBSSxFQUNKLElBQUksQ0FBQyxHQUFHLENBQ1QsQ0FBQztZQUNGLE1BQU0sVUFBVSxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDM0QsS0FBSyxNQUFNLEtBQUssSUFBSSxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQztnQkFDbEQsSUFBSSxLQUFLLFlBQVksa0JBQVMsRUFBRSxDQUFDO29CQUMvQixJQUFJLGdCQUFnQixDQUFDLEtBQUssRUFBRSxlQUFlLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQzt3QkFDekQsS0FBSyxHQUFHLElBQUksQ0FBQzt3QkFDYixNQUFNO29CQUNSLENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUM7WUFDRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ1gsT0FBTyw2QkFBaUIsQ0FBQyxhQUFhLENBQUM7WUFDekMsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLDZCQUFpQixDQUFDLFNBQVMsQ0FBQztJQUNyQyxDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sNkJBQWlCLENBQUMsY0FBYyxDQUFDO0lBQzFDLENBQUM7QUFDSCxDQUFDLEVBQ0QsTUFBTSxFQUNOLEVBQUUsS0FBSyxFQUFFLElBQUEsWUFBSyxFQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUNsQyxDQUFDO0FBRUY7Ozs7OztHQU1HO0FBQ0gsU0FBUyxnQkFBZ0IsQ0FDdkIsSUFBZSxFQUNmLGVBQXVCLEVBQ3ZCLFVBQThCO0lBRTlCLE1BQU0scUJBQXFCLEdBQUcsSUFBQSwyQ0FBbUIsRUFDL0MsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUNwQixtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEVBQUUscUJBQXFCLENBQ3pFLENBQ0YsQ0FBQztJQUNGLElBQ0UsSUFBSSxNQUFNLENBQUMsR0FBRyxlQUFlLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztRQUNyRSxVQUFVLEtBQUsscUJBQXFCLEVBQ3BDLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuQ29weXJpZ2h0IEFtYXpvbi5jb20sIEluYy4gb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5TUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuKi9cbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDZm5SZXNvdXJjZSwgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDZm5CdWNrZXQgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtczMnO1xuaW1wb3J0IHsgTmFnUnVsZUNvbXBsaWFuY2UsIE5hZ1J1bGVzIH0gZnJvbSAnLi4vLi4vbmFnLXJ1bGVzJztcbmltcG9ydCB7IGZsYXR0ZW5DZm5SZWZlcmVuY2UgfSBmcm9tICcuLi8uLi91dGlscy9mbGF0dGVuLWNmbi1yZWZlcmVuY2UnO1xuXG4vKipcbiAqIFMzIEJ1Y2tldHMgaGF2ZSBzZXJ2ZXIgYWNjZXNzIGxvZ3MgZW5hYmxlZFxuICogQHBhcmFtIG5vZGUgdGhlIENmblJlc291cmNlIHRvIGNoZWNrXG4gKi9cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShcbiAgKG5vZGU6IENmblJlc291cmNlKTogTmFnUnVsZUNvbXBsaWFuY2UgPT4ge1xuICAgIGlmIChub2RlIGluc3RhbmNlb2YgQ2ZuQnVja2V0KSB7XG4gICAgICBjb25zdCBsb2dnaW5nID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShub2RlLmxvZ2dpbmdDb25maWd1cmF0aW9uKTtcbiAgICAgIGlmIChcbiAgICAgICAgbG9nZ2luZyA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgKGxvZ2dpbmcuZGVzdGluYXRpb25CdWNrZXROYW1lID09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgIGxvZ2dpbmcubG9nRmlsZVByZWZpeCA9PSB1bmRlZmluZWQpXG4gICAgICApIHtcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGJ1Y2tldExvZ2ljYWxJZCA9IE5hZ1J1bGVzLnJlc29sdmVSZXNvdXJjZUZyb21JbnRyaW5zaWMoXG4gICAgICAgICAgbm9kZSxcbiAgICAgICAgICBub2RlLnJlZlxuICAgICAgICApO1xuICAgICAgICBjb25zdCBidWNrZXROYW1lID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShub2RlLmJ1Y2tldE5hbWUpO1xuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIFN0YWNrLm9mKG5vZGUpLm5vZGUuZmluZEFsbCgpKSB7XG4gICAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgQ2ZuQnVja2V0KSB7XG4gICAgICAgICAgICBpZiAoaXNNYXRjaGluZ0J1Y2tldChjaGlsZCwgYnVja2V0TG9naWNhbElkLCBidWNrZXROYW1lKSkge1xuICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PTl9DT01QTElBTlQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5DT01QTElBTlQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT1RfQVBQTElDQUJMRTtcbiAgICB9XG4gIH0sXG4gICduYW1lJyxcbiAgeyB2YWx1ZTogcGFyc2UoX19maWxlbmFtZSkubmFtZSB9XG4pO1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBjaGVjayB3aGV0aGVyIGEgZ2l2ZW4gUzMgQnVja2V0IHVzZXMgdGhlIHRhcmdldCBTMyBidWNrZXQgZm9yIGFjY2VzcyBsb2dzXG4gKiBAcGFyYW0gbm9kZSB0aGUgQ2ZuQnVja2V0IHRvIGNoZWNrXG4gKiBAcGFyYW0gYnVja2V0TG9naWNhbElkIHRoZSBDZm4gTG9naWNhbCBJRCBvZiB0aGUgdGFyZ2V0IGJ1Y2tldFxuICogQHBhcmFtIGJ1Y2tldE5hbWUgdGhlIG5hbWUgb2YgdGhlIHRhcmdldCBidWNrZXRcbiAqIHJldHVybnMgd2hldGhlciB0aGUgQ2ZuQnVja2V0IHVzZXMgdGhlIHRhcmdldCBTMyBidWNrZXQgZm9yIGFjY2VzcyBsb2dzXG4gKi9cbmZ1bmN0aW9uIGlzTWF0Y2hpbmdCdWNrZXQoXG4gIG5vZGU6IENmbkJ1Y2tldCxcbiAgYnVja2V0TG9naWNhbElkOiBzdHJpbmcsXG4gIGJ1Y2tldE5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZFxuKTogYm9vbGVhbiB7XG4gIGNvbnN0IGRlc3RpbmF0aW9uQnVja2V0TmFtZSA9IGZsYXR0ZW5DZm5SZWZlcmVuY2UoXG4gICAgU3RhY2sub2Yobm9kZSkucmVzb2x2ZShcbiAgICAgIFN0YWNrLm9mKG5vZGUpLnJlc29sdmUobm9kZS5sb2dnaW5nQ29uZmlndXJhdGlvbik/LmRlc3RpbmF0aW9uQnVja2V0TmFtZVxuICAgIClcbiAgKTtcbiAgaWYgKFxuICAgIG5ldyBSZWdFeHAoYCR7YnVja2V0TG9naWNhbElkfSg/IVtcXFxcd10pYCkudGVzdChkZXN0aW5hdGlvbkJ1Y2tldE5hbWUpIHx8XG4gICAgYnVja2V0TmFtZSA9PT0gZGVzdGluYXRpb25CdWNrZXROYW1lXG4gICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbiJdfQ==