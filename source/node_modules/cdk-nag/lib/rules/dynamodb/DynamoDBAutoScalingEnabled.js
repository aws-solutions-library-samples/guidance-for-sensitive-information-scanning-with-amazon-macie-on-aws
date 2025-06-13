"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_applicationautoscaling_1 = require("aws-cdk-lib/aws-applicationautoscaling");
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
const nag_rules_1 = require("../../nag-rules");
/**
 * Provisioned capacity DynamoDB tables have auto-scaling enabled on their indexes
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_dynamodb_1.CfnTable) {
        if (nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, node.billingMode) !==
            aws_dynamodb_1.BillingMode.PAY_PER_REQUEST) {
            const indexWriteMatches = [''];
            const indexReadMatches = [''];
            const tableLogicalId = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, node.ref);
            const tableName = aws_cdk_lib_1.Stack.of(node).resolve(node.tableName);
            const globalSecondaryIndexes = aws_cdk_lib_1.Stack.of(node).resolve(node.globalSecondaryIndexes);
            if (Array.isArray(globalSecondaryIndexes)) {
                globalSecondaryIndexes.forEach((gsi) => {
                    const resolvedGsi = aws_cdk_lib_1.Stack.of(node).resolve(gsi);
                    indexWriteMatches.push(resolvedGsi.indexName);
                    indexReadMatches.push(resolvedGsi.indexName);
                });
            }
            for (const child of aws_cdk_lib_1.Stack.of(node).node.findAll()) {
                if (child instanceof aws_applicationautoscaling_1.CfnScalableTarget) {
                    const writeMatchIndex = isMatchingScalableTarget(child, 'WriteCapacityUnits', tableLogicalId, tableName, indexWriteMatches);
                    if (writeMatchIndex !== -1) {
                        indexWriteMatches.splice(writeMatchIndex, 1);
                        continue;
                    }
                    const readMatchIndex = isMatchingScalableTarget(child, 'ReadCapacityUnits', tableLogicalId, tableName, indexReadMatches);
                    if (readMatchIndex !== -1) {
                        indexReadMatches.splice(readMatchIndex, 1);
                    }
                }
            }
            if (indexWriteMatches.length != 0 || indexReadMatches.length != 0) {
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
 * Helper function to check whether the CfnScalableTarget is related to the given Table index
 * @param node the CfnScalableTarget to check
 * @param dimension the dimension of the CfnScalableTarget to check
 * @param tableLogicalId the Cfn Logical ID of the table
 * @param tableName the name of the table
 * @param indexNames the names of the indexes to check against
 * returns the location in the indexNames array of the matching index or -1 if no match is found
 */
function isMatchingScalableTarget(node, dimension, tableLogicalId, tableName, indexNames) {
    if (node.serviceNamespace === 'dynamodb') {
        let scalableDimension = '';
        const resourceId = JSON.stringify(aws_cdk_lib_1.Stack.of(node).resolve(node.resourceId));
        for (let i = 0; i < indexNames.length; i++) {
            const regexes = Array();
            const indexName = indexNames[i];
            if (indexName === '') {
                regexes.push(`${tableLogicalId}.*`);
                if (tableName !== undefined) {
                    regexes.push(`${tableName}.*`);
                }
                scalableDimension = `dynamodb:table:${dimension}`;
            }
            else {
                regexes.push(`${tableLogicalId}.*index\/${indexName}(?![\\w\\-_\\.])`);
                if (tableName !== undefined) {
                    regexes.push(`${tableName}.*index\/${indexName}(?![\\w\\-_\\.])`);
                }
                scalableDimension = `dynamodb:index:${dimension}`;
            }
            const regex = new RegExp(regexes.join('|'), 'gm');
            if (node.scalableDimension === scalableDimension &&
                regex.test(resourceId)) {
                return i;
            }
        }
    }
    return -1;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHluYW1vREJBdXRvU2NhbGluZ0VuYWJsZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvZHluYW1vZGIvRHluYW1vREJBdXRvU2NhbGluZ0VuYWJsZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0VBR0U7QUFDRiwrQkFBNkI7QUFDN0IsNkNBQWlEO0FBQ2pELHVGQUEyRTtBQUMzRSwyREFBaUU7QUFDakUsK0NBQThEO0FBRTlEOzs7R0FHRztBQUVILGtCQUFlLE1BQU0sQ0FBQyxjQUFjLENBQ2xDLENBQUMsSUFBaUIsRUFBcUIsRUFBRTtJQUN2QyxJQUFJLElBQUksWUFBWSx1QkFBUSxFQUFFLENBQUM7UUFDN0IsSUFDRSxvQkFBUSxDQUFDLDRCQUE0QixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQzdELDBCQUFXLENBQUMsZUFBZSxFQUMzQixDQUFDO1lBQ0QsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QixNQUFNLGNBQWMsR0FBRyxvQkFBUSxDQUFDLDRCQUE0QixDQUMxRCxJQUFJLEVBQ0osSUFBSSxDQUFDLEdBQUcsQ0FDVCxDQUFDO1lBQ0YsTUFBTSxTQUFTLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN6RCxNQUFNLHNCQUFzQixHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FDbkQsSUFBSSxDQUFDLHNCQUFzQixDQUM1QixDQUFDO1lBQ0YsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQztnQkFDMUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JB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cEQsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxjQUFjLFlBQVksU0FBUyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUN2RSxJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUUsQ0FBQztvQkFDNUIsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsWUFBWSxTQUFTLGtCQUFrQixDQUFDLENBQUM7Z0JBQ3BFLENBQUM7Z0JBQ0QsaUJBQWlCLEdBQUcsa0JBQWtCLFNBQVMsRUFBRSxDQUFDO1lBQ3BELENBQUM7WUFDRCxNQUFNLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2xELElBQ0UsSUFBSSxDQUFDLGlCQUFpQixLQUFLLGlCQUFpQjtnQkFDNUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFDdEIsQ0FBQztnQkFDRCxPQUFPLENBQUMsQ0FBQztZQUNYLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUNELE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDWixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbkNvcHlyaWdodCBBbWF6b24uY29tLCBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiovXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ2ZuUmVzb3VyY2UsIFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ2ZuU2NhbGFibGVUYXJnZXQgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtYXBwbGljYXRpb25hdXRvc2NhbGluZyc7XG5pbXBvcnQgeyBDZm5UYWJsZSwgQmlsbGluZ01vZGUgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZHluYW1vZGInO1xuaW1wb3J0IHsgTmFnUnVsZUNvbXBsaWFuY2UsIE5hZ1J1bGVzIH0gZnJvbSAnLi4vLi4vbmFnLXJ1bGVzJztcblxuLyoqXG4gKiBQcm92aXNpb25lZCBjYXBhY2l0eSBEeW5hbW9EQiB0YWJsZXMgaGF2ZSBhdXRvLXNjYWxpbmcgZW5hYmxlZCBvbiB0aGVpciBpbmRleGVzXG4gKiBAcGFyYW0gbm9kZSB0aGUgQ2ZuUmVzb3VyY2UgdG8gY2hlY2tcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIChub2RlOiBDZm5SZXNvdXJjZSk6IE5hZ1J1bGVDb21wbGlhbmNlID0+IHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENmblRhYmxlKSB7XG4gICAgICBpZiAoXG4gICAgICAgIE5hZ1J1bGVzLnJlc29sdmVSZXNvdXJjZUZyb21JbnRyaW5zaWMobm9kZSwgbm9kZS5iaWxsaW5nTW9kZSkgIT09XG4gICAgICAgIEJpbGxpbmdNb2RlLlBBWV9QRVJfUkVRVUVTVFxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGluZGV4V3JpdGVNYXRjaGVzID0gWycnXTtcbiAgICAgICAgY29uc3QgaW5kZXhSZWFkTWF0Y2hlcyA9IFsnJ107XG4gICAgICAgIGNvbnN0IHRhYmxlTG9naWNhbElkID0gTmFnUnVsZXMucmVzb2x2ZVJlc291cmNlRnJvbUludHJpbnNpYyhcbiAgICAgICAgICBub2RlLFxuICAgICAgICAgIG5vZGUucmVmXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHRhYmxlTmFtZSA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUobm9kZS50YWJsZU5hbWUpO1xuICAgICAgICBjb25zdCBnbG9iYWxTZWNvbmRhcnlJbmRleGVzID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShcbiAgICAgICAgICBub2RlLmdsb2JhbFNlY29uZGFyeUluZGV4ZXNcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZ2xvYmFsU2Vjb25kYXJ5SW5kZXhlcykpIHtcbiAgICAgICAgICBnbG9iYWxTZWNvbmRhcnlJbmRleGVzLmZvckVhY2goKGdzaSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWRHc2kgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKGdzaSk7XG4gICAgICAgICAgICBpbmRleFdyaXRlTWF0Y2hlcy5wdXNoKHJlc29sdmVkR3NpLmluZGV4TmFtZSk7XG4gICAgICAgICAgICBpbmRleFJlYWRNYXRjaGVzLnB1c2gocmVzb2x2ZWRHc2kuaW5kZXhOYW1lKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIFN0YWNrLm9mKG5vZGUpLm5vZGUuZmluZEFsbCgpKSB7XG4gICAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgQ2ZuU2NhbGFibGVUYXJnZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IHdyaXRlTWF0Y2hJbmRleCA9IGlzTWF0Y2hpbmdTY2FsYWJsZVRhcmdldChcbiAgICAgICAgICAgICAgY2hpbGQsXG4gICAgICAgICAgICAgICdXcml0ZUNhcGFjaXR5VW5pdHMnLFxuICAgICAgICAgICAgICB0YWJsZUxvZ2ljYWxJZCxcbiAgICAgICAgICAgICAgdGFibGVOYW1lLFxuICAgICAgICAgICAgICBpbmRleFdyaXRlTWF0Y2hlc1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmICh3cml0ZU1hdGNoSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgIGluZGV4V3JpdGVNYXRjaGVzLnNwbGljZSh3cml0ZU1hdGNoSW5kZXgsIDEpO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlYWRNYXRjaEluZGV4ID0gaXNNYXRjaGluZ1NjYWxhYmxlVGFyZ2V0KFxuICAgICAgICAgICAgICBjaGlsZCxcbiAgICAgICAgICAgICAgJ1JlYWRDYXBhY2l0eVVuaXRzJyxcbiAgICAgICAgICAgICAgdGFibGVMb2dpY2FsSWQsXG4gICAgICAgICAgICAgIHRhYmxlTmFtZSxcbiAgICAgICAgICAgICAgaW5kZXhSZWFkTWF0Y2hlc1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChyZWFkTWF0Y2hJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgaW5kZXhSZWFkTWF0Y2hlcy5zcGxpY2UocmVhZE1hdGNoSW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXhXcml0ZU1hdGNoZXMubGVuZ3RoICE9IDAgfHwgaW5kZXhSZWFkTWF0Y2hlcy5sZW5ndGggIT0gMCkge1xuICAgICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuQ09NUExJQU5UO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9UX0FQUExJQ0FCTEU7XG4gICAgfVxuICB9LFxuICAnbmFtZScsXG4gIHsgdmFsdWU6IHBhcnNlKF9fZmlsZW5hbWUpLm5hbWUgfVxuKTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY2hlY2sgd2hldGhlciB0aGUgQ2ZuU2NhbGFibGVUYXJnZXQgaXMgcmVsYXRlZCB0byB0aGUgZ2l2ZW4gVGFibGUgaW5kZXhcbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5TY2FsYWJsZVRhcmdldCB0byBjaGVja1xuICogQHBhcmFtIGRpbWVuc2lvbiB0aGUgZGltZW5zaW9uIG9mIHRoZSBDZm5TY2FsYWJsZVRhcmdldCB0byBjaGVja1xuICogQHBhcmFtIHRhYmxlTG9naWNhbElkIHRoZSBDZm4gTG9naWNhbCBJRCBvZiB0aGUgdGFibGVcbiAqIEBwYXJhbSB0YWJsZU5hbWUgdGhlIG5hbWUgb2YgdGhlIHRhYmxlXG4gKiBAcGFyYW0gaW5kZXhOYW1lcyB0aGUgbmFtZXMgb2YgdGhlIGluZGV4ZXMgdG8gY2hlY2sgYWdhaW5zdFxuICogcmV0dXJucyB0aGUgbG9jYXRpb24gaW4gdGhlIGluZGV4TmFtZXMgYXJyYXkgb2YgdGhlIG1hdGNoaW5nIGluZGV4IG9yIC0xIGlmIG5vIG1hdGNoIGlzIGZvdW5kXG4gKi9cbmZ1bmN0aW9uIGlzTWF0Y2hpbmdTY2FsYWJsZVRhcmdldChcbiAgbm9kZTogQ2ZuU2NhbGFibGVUYXJnZXQsXG4gIGRpbWVuc2lvbjogc3RyaW5nLFxuICB0YWJsZUxvZ2ljYWxJZDogc3RyaW5nLFxuICB0YWJsZU5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgaW5kZXhOYW1lczogc3RyaW5nW11cbik6IG51bWJlciB7XG4gIGlmIChub2RlLnNlcnZpY2VOYW1lc3BhY2UgPT09ICdkeW5hbW9kYicpIHtcbiAgICBsZXQgc2NhbGFibGVEaW1lbnNpb24gPSAnJztcbiAgICBjb25zdCByZXNvdXJjZUlkID0gSlNPTi5zdHJpbmdpZnkoU3RhY2sub2Yobm9kZSkucmVzb2x2ZShub2RlLnJlc291cmNlSWQpKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGV4TmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHJlZ2V4ZXMgPSBBcnJheTxzdHJpbmc+KCk7XG4gICAgICBjb25zdCBpbmRleE5hbWUgPSBpbmRleE5hbWVzW2ldO1xuICAgICAgaWYgKGluZGV4TmFtZSA9PT0gJycpIHtcbiAgICAgICAgcmVnZXhlcy5wdXNoKGAke3RhYmxlTG9naWNhbElkfS4qYCk7XG4gICAgICAgIGlmICh0YWJsZU5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJlZ2V4ZXMucHVzaChgJHt0YWJsZU5hbWV9LipgKTtcbiAgICAgICAgfVxuICAgICAgICBzY2FsYWJsZURpbWVuc2lvbiA9IGBkeW5hbW9kYjp0YWJsZToke2RpbWVuc2lvbn1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVnZXhlcy5wdXNoKGAke3RhYmxlTG9naWNhbElkfS4qaW5kZXhcXC8ke2luZGV4TmFtZX0oPyFbXFxcXHdcXFxcLV9cXFxcLl0pYCk7XG4gICAgICAgIGlmICh0YWJsZU5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJlZ2V4ZXMucHVzaChgJHt0YWJsZU5hbWV9LippbmRleFxcLyR7aW5kZXhOYW1lfSg/IVtcXFxcd1xcXFwtX1xcXFwuXSlgKTtcbiAgICAgICAgfVxuICAgICAgICBzY2FsYWJsZURpbWVuc2lvbiA9IGBkeW5hbW9kYjppbmRleDoke2RpbWVuc2lvbn1gO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKHJlZ2V4ZXMuam9pbignfCcpLCAnZ20nKTtcbiAgICAgIGlmIChcbiAgICAgICAgbm9kZS5zY2FsYWJsZURpbWVuc2lvbiA9PT0gc2NhbGFibGVEaW1lbnNpb24gJiZcbiAgICAgICAgcmVnZXgudGVzdChyZXNvdXJjZUlkKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG4iXX0=