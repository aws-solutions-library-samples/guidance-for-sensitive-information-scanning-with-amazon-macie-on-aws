"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_backup_1 = require("aws-cdk-lib/aws-backup");
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
const nag_rules_1 = require("../../nag-rules");
/**
 * DynamoDB tables are part of AWS Backup plan(s)
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_dynamodb_1.CfnTable) {
        const tableLogicalId = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, node.ref);
        const tableName = aws_cdk_lib_1.Stack.of(node).resolve(node.tableName);
        let found = false;
        for (const child of aws_cdk_lib_1.Stack.of(node).node.findAll()) {
            if (child instanceof aws_backup_1.CfnBackupSelection) {
                if (isMatchingSelection(child, tableLogicalId, tableName)) {
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
 * Helper function to check whether the Backup Plan Selection contains the given Table
 * @param node the CfnBackupSelection to check
 * @param tableLogicalId the Cfn Logical ID of the table
 * @param tableName the name of the table
 * returns whether the CfnBackupSelection contains the given Table
 */
function isMatchingSelection(node, tableLogicalId, tableName) {
    const backupSelection = aws_cdk_lib_1.Stack.of(node).resolve(node.backupSelection);
    const resources = aws_cdk_lib_1.Stack.of(node).resolve(backupSelection.resources);
    if (Array.isArray(resources)) {
        for (const resource of resources) {
            const resolvedResource = JSON.stringify(aws_cdk_lib_1.Stack.of(node).resolve(resource));
            if (new RegExp(`${tableLogicalId}(?![\\w])`).test(resolvedResource) ||
                (tableName != undefined &&
                    new RegExp(`table\/${tableName}(?![\\w\\-_\\.])`).test(resolvedResource))) {
                return true;
            }
        }
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHluYW1vREJJbkJhY2t1cFBsYW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvZHluYW1vZGIvRHluYW1vREJJbkJhY2t1cFBsYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0VBR0U7QUFDRiwrQkFBNkI7QUFDN0IsNkNBQWlEO0FBQ2pELHVEQUE0RDtBQUM1RCwyREFBb0Q7QUFDcEQsK0NBQThEO0FBRTlEOzs7R0FHRztBQUVILGtCQUFlLE1BQU0sQ0FBQyxjQUFjLENBQ2xDLENBQUMsSUFBaUIsRUFBcUIsRUFBRTtJQUN2QyxJQUFJLElBQUksWUFBWSx1QkFBUSxFQUFFLENBQUM7UUFDN0IsTUFBTSxjQUFjLEdBQUcsb0JBQVEsQ0FBQyw0QkFBNEIsQ0FDMUQsSUFBSSxFQUNKLElBQUksQ0FBQyxHQUFHLENBQ1QsQ0FBQztRQUNGLE1BQU0sU0FBUyxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLEtBQUssTUFBTSxLQUFLLElBQUksbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7WUFDbEQsSUFBSSxLQUFLLFlBQVksK0JBQWtCLEVBQUUsQ0FBQztnQkFDeEMsSUFBSSxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUM7b0JBQzFELEtBQUssR0FBRyxJQUFJLENBQUM7b0JBQ2IsTUFBTTtnQkFDUixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDWCxPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsT0FBTyw2QkFBaUIsQ0FBQyxTQUFTLENBQUM7SUFDckMsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLDZCQUFpQixDQUFDLGNBQWMsQ0FBQztJQUMxQyxDQUFDO0FBQ0gsQ0FBQyxFQUNELE1BQU0sRUFDTixFQUFFLEtBQUssRUFBRSxJQUFBLFlBQUssRUFBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FDbEMsQ0FBQztBQUVGOzs7Ozs7R0FNRztBQUNILFNBQVMsbUJBQW1CLENBQzFCLElBQXdCLEVBQ3hCLGNBQXNCLEVBQ3RCLFNBQTZCO0lBRTdCLE1BQU0sZUFBZSxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDckUsTUFBTSxTQUFTLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwRSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztRQUM3QixLQUFLLE1BQU0sUUFBUSxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQ2pDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMxRSxJQUNFLElBQUksTUFBTSxDQUFDLEdBQUcsY0FBYyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7Z0JBQy9ELENBQUMsU0FBUyxJQUFJLFNBQVM7b0JBQ3JCLElBQUksTUFBTSxDQUFDLFVBQVUsU0FBUyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksQ0FDcEQsZ0JBQWdCLENBQ2pCLENBQUMsRUFDSixDQUFDO2dCQUNELE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbkNvcHlyaWdodCBBbWF6b24uY29tLCBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiovXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ2ZuUmVzb3VyY2UsIFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ2ZuQmFja3VwU2VsZWN0aW9uIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWJhY2t1cCc7XG5pbXBvcnQgeyBDZm5UYWJsZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1keW5hbW9kYic7XG5pbXBvcnQgeyBOYWdSdWxlQ29tcGxpYW5jZSwgTmFnUnVsZXMgfSBmcm9tICcuLi8uLi9uYWctcnVsZXMnO1xuXG4vKipcbiAqIER5bmFtb0RCIHRhYmxlcyBhcmUgcGFydCBvZiBBV1MgQmFja3VwIHBsYW4ocylcbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5SZXNvdXJjZSB0byBjaGVja1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShcbiAgKG5vZGU6IENmblJlc291cmNlKTogTmFnUnVsZUNvbXBsaWFuY2UgPT4ge1xuICAgIGlmIChub2RlIGluc3RhbmNlb2YgQ2ZuVGFibGUpIHtcbiAgICAgIGNvbnN0IHRhYmxlTG9naWNhbElkID0gTmFnUnVsZXMucmVzb2x2ZVJlc291cmNlRnJvbUludHJpbnNpYyhcbiAgICAgICAgbm9kZSxcbiAgICAgICAgbm9kZS5yZWZcbiAgICAgICk7XG4gICAgICBjb25zdCB0YWJsZU5hbWUgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKG5vZGUudGFibGVOYW1lKTtcbiAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBTdGFjay5vZihub2RlKS5ub2RlLmZpbmRBbGwoKSkge1xuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBDZm5CYWNrdXBTZWxlY3Rpb24pIHtcbiAgICAgICAgICBpZiAoaXNNYXRjaGluZ1NlbGVjdGlvbihjaGlsZCwgdGFibGVMb2dpY2FsSWQsIHRhYmxlTmFtZSkpIHtcbiAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9OX0NPTVBMSUFOVDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5DT01QTElBTlQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT1RfQVBQTElDQUJMRTtcbiAgICB9XG4gIH0sXG4gICduYW1lJyxcbiAgeyB2YWx1ZTogcGFyc2UoX19maWxlbmFtZSkubmFtZSB9XG4pO1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBjaGVjayB3aGV0aGVyIHRoZSBCYWNrdXAgUGxhbiBTZWxlY3Rpb24gY29udGFpbnMgdGhlIGdpdmVuIFRhYmxlXG4gKiBAcGFyYW0gbm9kZSB0aGUgQ2ZuQmFja3VwU2VsZWN0aW9uIHRvIGNoZWNrXG4gKiBAcGFyYW0gdGFibGVMb2dpY2FsSWQgdGhlIENmbiBMb2dpY2FsIElEIG9mIHRoZSB0YWJsZVxuICogQHBhcmFtIHRhYmxlTmFtZSB0aGUgbmFtZSBvZiB0aGUgdGFibGVcbiAqIHJldHVybnMgd2hldGhlciB0aGUgQ2ZuQmFja3VwU2VsZWN0aW9uIGNvbnRhaW5zIHRoZSBnaXZlbiBUYWJsZVxuICovXG5mdW5jdGlvbiBpc01hdGNoaW5nU2VsZWN0aW9uKFxuICBub2RlOiBDZm5CYWNrdXBTZWxlY3Rpb24sXG4gIHRhYmxlTG9naWNhbElkOiBzdHJpbmcsXG4gIHRhYmxlTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkXG4pOiBib29sZWFuIHtcbiAgY29uc3QgYmFja3VwU2VsZWN0aW9uID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShub2RlLmJhY2t1cFNlbGVjdGlvbik7XG4gIGNvbnN0IHJlc291cmNlcyA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUoYmFja3VwU2VsZWN0aW9uLnJlc291cmNlcyk7XG4gIGlmIChBcnJheS5pc0FycmF5KHJlc291cmNlcykpIHtcbiAgICBmb3IgKGNvbnN0IHJlc291cmNlIG9mIHJlc291cmNlcykge1xuICAgICAgY29uc3QgcmVzb2x2ZWRSZXNvdXJjZSA9IEpTT04uc3RyaW5naWZ5KFN0YWNrLm9mKG5vZGUpLnJlc29sdmUocmVzb3VyY2UpKTtcbiAgICAgIGlmIChcbiAgICAgICAgbmV3IFJlZ0V4cChgJHt0YWJsZUxvZ2ljYWxJZH0oPyFbXFxcXHddKWApLnRlc3QocmVzb2x2ZWRSZXNvdXJjZSkgfHxcbiAgICAgICAgKHRhYmxlTmFtZSAhPSB1bmRlZmluZWQgJiZcbiAgICAgICAgICBuZXcgUmVnRXhwKGB0YWJsZVxcLyR7dGFibGVOYW1lfSg/IVtcXFxcd1xcXFwtX1xcXFwuXSlgKS50ZXN0KFxuICAgICAgICAgICAgcmVzb2x2ZWRSZXNvdXJjZVxuICAgICAgICAgICkpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbiJdfQ==