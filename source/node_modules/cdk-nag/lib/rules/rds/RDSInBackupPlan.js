"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_backup_1 = require("aws-cdk-lib/aws-backup");
const aws_rds_1 = require("aws-cdk-lib/aws-rds");
const nag_rules_1 = require("../../nag-rules");
/**
 * RDS DB Instances are part of AWS Backup plan(s)
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_rds_1.CfnDBInstance) {
        const dbLogicalId = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, node.ref);
        let found = false;
        for (const child of aws_cdk_lib_1.Stack.of(node).node.findAll()) {
            if (child instanceof aws_backup_1.CfnBackupSelection) {
                if (isMatchingSelection(child, dbLogicalId)) {
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
 * Helper function to check whether the Backup Plan Selection contains the given database instance
 * @param node the CfnBackupSelection to check
 * @param dbLogicalId the Cfn Logical ID of the database instance
 * returns whether the CfnBackupSelection contains the given database instance
 */
function isMatchingSelection(node, dbLogicalId) {
    const backupSelection = aws_cdk_lib_1.Stack.of(node).resolve(node.backupSelection);
    const resources = aws_cdk_lib_1.Stack.of(node).resolve(backupSelection.resources);
    if (Array.isArray(resources)) {
        for (const resource of resources) {
            const resolvedResource = JSON.stringify(aws_cdk_lib_1.Stack.of(node).resolve(resource));
            if (new RegExp(`${dbLogicalId}(?![\\w])`).test(resolvedResource)) {
                return true;
            }
        }
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUkRTSW5CYWNrdXBQbGFuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3J1bGVzL3Jkcy9SRFNJbkJhY2t1cFBsYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0VBR0U7QUFDRiwrQkFBNkI7QUFDN0IsNkNBQWlEO0FBQ2pELHVEQUE0RDtBQUM1RCxpREFBb0Q7QUFDcEQsK0NBQThEO0FBRTlEOzs7R0FHRztBQUVILGtCQUFlLE1BQU0sQ0FBQyxjQUFjLENBQ2xDLENBQUMsSUFBaUIsRUFBcUIsRUFBRTtJQUN2QyxJQUFJLElBQUksWUFBWSx1QkFBYSxFQUFFLENBQUM7UUFDbEMsTUFBTSxXQUFXLEdBQUcsb0JBQVEsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNsQixLQUFLLE1BQU0sS0FBSyxJQUFJLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO1lBQ2xELElBQUksS0FBSyxZQUFZLCtCQUFrQixFQUFFLENBQUM7Z0JBQ3hDLElBQUksbUJBQW1CLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxFQUFFLENBQUM7b0JBQzVDLEtBQUssR0FBRyxJQUFJLENBQUM7b0JBQ2IsTUFBTTtnQkFDUixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDWCxPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsT0FBTyw2QkFBaUIsQ0FBQyxTQUFTLENBQUM7SUFDckMsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLDZCQUFpQixDQUFDLGNBQWMsQ0FBQztJQUMxQyxDQUFDO0FBQ0gsQ0FBQyxFQUNELE1BQU0sRUFDTixFQUFFLEtBQUssRUFBRSxJQUFBLFlBQUssRUFBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FDbEMsQ0FBQztBQUVGOzs7OztHQUtHO0FBQ0gsU0FBUyxtQkFBbUIsQ0FDMUIsSUFBd0IsRUFDeEIsV0FBbUI7SUFFbkIsTUFBTSxlQUFlLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNyRSxNQUFNLFNBQVMsR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BFLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1FBQzdCLEtBQUssTUFBTSxRQUFRLElBQUksU0FBUyxFQUFFLENBQUM7WUFDakMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzFFLElBQUksSUFBSSxNQUFNLENBQUMsR0FBRyxXQUFXLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7Z0JBQ2pFLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbkNvcHlyaWdodCBBbWF6b24uY29tLCBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiovXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ2ZuUmVzb3VyY2UsIFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ2ZuQmFja3VwU2VsZWN0aW9uIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWJhY2t1cCc7XG5pbXBvcnQgeyBDZm5EQkluc3RhbmNlIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLXJkcyc7XG5pbXBvcnQgeyBOYWdSdWxlQ29tcGxpYW5jZSwgTmFnUnVsZXMgfSBmcm9tICcuLi8uLi9uYWctcnVsZXMnO1xuXG4vKipcbiAqIFJEUyBEQiBJbnN0YW5jZXMgYXJlIHBhcnQgb2YgQVdTIEJhY2t1cCBwbGFuKHMpXG4gKiBAcGFyYW0gbm9kZSB0aGUgQ2ZuUmVzb3VyY2UgdG8gY2hlY2tcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIChub2RlOiBDZm5SZXNvdXJjZSk6IE5hZ1J1bGVDb21wbGlhbmNlID0+IHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENmbkRCSW5zdGFuY2UpIHtcbiAgICAgIGNvbnN0IGRiTG9naWNhbElkID0gTmFnUnVsZXMucmVzb2x2ZVJlc291cmNlRnJvbUludHJpbnNpYyhub2RlLCBub2RlLnJlZik7XG4gICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgU3RhY2sub2Yobm9kZSkubm9kZS5maW5kQWxsKCkpIHtcbiAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgQ2ZuQmFja3VwU2VsZWN0aW9uKSB7XG4gICAgICAgICAgaWYgKGlzTWF0Y2hpbmdTZWxlY3Rpb24oY2hpbGQsIGRiTG9naWNhbElkKSkge1xuICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLkNPTVBMSUFOVDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PVF9BUFBMSUNBQkxFO1xuICAgIH1cbiAgfSxcbiAgJ25hbWUnLFxuICB7IHZhbHVlOiBwYXJzZShfX2ZpbGVuYW1lKS5uYW1lIH1cbik7XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGNoZWNrIHdoZXRoZXIgdGhlIEJhY2t1cCBQbGFuIFNlbGVjdGlvbiBjb250YWlucyB0aGUgZ2l2ZW4gZGF0YWJhc2UgaW5zdGFuY2VcbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5CYWNrdXBTZWxlY3Rpb24gdG8gY2hlY2tcbiAqIEBwYXJhbSBkYkxvZ2ljYWxJZCB0aGUgQ2ZuIExvZ2ljYWwgSUQgb2YgdGhlIGRhdGFiYXNlIGluc3RhbmNlXG4gKiByZXR1cm5zIHdoZXRoZXIgdGhlIENmbkJhY2t1cFNlbGVjdGlvbiBjb250YWlucyB0aGUgZ2l2ZW4gZGF0YWJhc2UgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gaXNNYXRjaGluZ1NlbGVjdGlvbihcbiAgbm9kZTogQ2ZuQmFja3VwU2VsZWN0aW9uLFxuICBkYkxvZ2ljYWxJZDogc3RyaW5nXG4pOiBib29sZWFuIHtcbiAgY29uc3QgYmFja3VwU2VsZWN0aW9uID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShub2RlLmJhY2t1cFNlbGVjdGlvbik7XG4gIGNvbnN0IHJlc291cmNlcyA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUoYmFja3VwU2VsZWN0aW9uLnJlc291cmNlcyk7XG4gIGlmIChBcnJheS5pc0FycmF5KHJlc291cmNlcykpIHtcbiAgICBmb3IgKGNvbnN0IHJlc291cmNlIG9mIHJlc291cmNlcykge1xuICAgICAgY29uc3QgcmVzb2x2ZWRSZXNvdXJjZSA9IEpTT04uc3RyaW5naWZ5KFN0YWNrLm9mKG5vZGUpLnJlc29sdmUocmVzb3VyY2UpKTtcbiAgICAgIGlmIChuZXcgUmVnRXhwKGAke2RiTG9naWNhbElkfSg/IVtcXFxcd10pYCkudGVzdChyZXNvbHZlZFJlc291cmNlKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuIl19