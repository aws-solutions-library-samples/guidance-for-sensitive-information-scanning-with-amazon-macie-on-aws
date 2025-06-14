"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_backup_1 = require("aws-cdk-lib/aws-backup");
const aws_ec2_1 = require("aws-cdk-lib/aws-ec2");
const nag_rules_1 = require("../../nag-rules");
/**
 * EBS volumes are part of AWS Backup plan(s)
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_ec2_1.CfnVolume) {
        const volumeLogicalId = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, node.ref);
        let found = false;
        for (const child of aws_cdk_lib_1.Stack.of(node).node.findAll()) {
            if (child instanceof aws_backup_1.CfnBackupSelection) {
                if (isMatchingSelection(child, volumeLogicalId)) {
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
 * Helper function to check whether the Backup Plan Selection contains the given volume
 * @param node the CfnBackupSelection to check
 * @param volumeLogicalId the Cfn Logical ID of the volume
 * returns whether the CfnBackupSelection contains the given volume
 */
function isMatchingSelection(node, volumeLogicalId) {
    const backupSelection = aws_cdk_lib_1.Stack.of(node).resolve(node.backupSelection);
    const resources = aws_cdk_lib_1.Stack.of(node).resolve(backupSelection.resources);
    if (Array.isArray(resources)) {
        for (const resource of resources) {
            const resolvedResource = JSON.stringify(aws_cdk_lib_1.Stack.of(node).resolve(resource));
            if (new RegExp(`${volumeLogicalId}(?![\\w])`).test(resolvedResource)) {
                return true;
            }
        }
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRUMyRUJTSW5CYWNrdXBQbGFuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3J1bGVzL2VjMi9FQzJFQlNJbkJhY2t1cFBsYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0VBR0U7QUFDRiwrQkFBNkI7QUFDN0IsNkNBQWlEO0FBQ2pELHVEQUE0RDtBQUM1RCxpREFBZ0Q7QUFDaEQsK0NBQThEO0FBRTlEOzs7R0FHRztBQUVILGtCQUFlLE1BQU0sQ0FBQyxjQUFjLENBQ2xDLENBQUMsSUFBaUIsRUFBcUIsRUFBRTtJQUN2QyxJQUFJLElBQUksWUFBWSxtQkFBUyxFQUFFLENBQUM7UUFDOUIsTUFBTSxlQUFlLEdBQUcsb0JBQVEsQ0FBQyw0QkFBNEIsQ0FDM0QsSUFBSSxFQUNKLElBQUksQ0FBQyxHQUFHLENBQ1QsQ0FBQztRQUNGLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNsQixLQUFLLE1BQU0sS0FBSyxJQUFJLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO1lBQ2xELElBQUksS0FBSyxZQUFZLCtCQUFrQixFQUFFLENBQUM7Z0JBQ3hDLElBQUksbUJBQW1CLENBQUMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxFQUFFLENBQUM7b0JBQ2hELEtBQUssR0FBRyxJQUFJLENBQUM7b0JBQ2IsTUFBTTtnQkFDUixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDWCxPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsT0FBTyw2QkFBaUIsQ0FBQyxTQUFTLENBQUM7SUFDckMsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLDZCQUFpQixDQUFDLGNBQWMsQ0FBQztJQUMxQyxDQUFDO0FBQ0gsQ0FBQyxFQUNELE1BQU0sRUFDTixFQUFFLEtBQUssRUFBRSxJQUFBLFlBQUssRUFBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FDbEMsQ0FBQztBQUVGOzs7OztHQUtHO0FBQ0gsU0FBUyxtQkFBbUIsQ0FDMUIsSUFBd0IsRUFDeEIsZUFBdUI7SUFFdkIsTUFBTSxlQUFlLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNyRSxNQUFNLFNBQVMsR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BFLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1FBQzdCLEtBQUssTUFBTSxRQUFRLElBQUksU0FBUyxFQUFFLENBQUM7WUFDakMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzFFLElBQUksSUFBSSxNQUFNLENBQUMsR0FBRyxlQUFlLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7Z0JBQ3JFLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbkNvcHlyaWdodCBBbWF6b24uY29tLCBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiovXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ2ZuUmVzb3VyY2UsIFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ2ZuQmFja3VwU2VsZWN0aW9uIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWJhY2t1cCc7XG5pbXBvcnQgeyBDZm5Wb2x1bWUgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWMyJztcbmltcG9ydCB7IE5hZ1J1bGVDb21wbGlhbmNlLCBOYWdSdWxlcyB9IGZyb20gJy4uLy4uL25hZy1ydWxlcyc7XG5cbi8qKlxuICogRUJTIHZvbHVtZXMgYXJlIHBhcnQgb2YgQVdTIEJhY2t1cCBwbGFuKHMpXG4gKiBAcGFyYW0gbm9kZSB0aGUgQ2ZuUmVzb3VyY2UgdG8gY2hlY2tcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIChub2RlOiBDZm5SZXNvdXJjZSk6IE5hZ1J1bGVDb21wbGlhbmNlID0+IHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENmblZvbHVtZSkge1xuICAgICAgY29uc3Qgdm9sdW1lTG9naWNhbElkID0gTmFnUnVsZXMucmVzb2x2ZVJlc291cmNlRnJvbUludHJpbnNpYyhcbiAgICAgICAgbm9kZSxcbiAgICAgICAgbm9kZS5yZWZcbiAgICAgICk7XG4gICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgU3RhY2sub2Yobm9kZSkubm9kZS5maW5kQWxsKCkpIHtcbiAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgQ2ZuQmFja3VwU2VsZWN0aW9uKSB7XG4gICAgICAgICAgaWYgKGlzTWF0Y2hpbmdTZWxlY3Rpb24oY2hpbGQsIHZvbHVtZUxvZ2ljYWxJZCkpIHtcbiAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9OX0NPTVBMSUFOVDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5DT01QTElBTlQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT1RfQVBQTElDQUJMRTtcbiAgICB9XG4gIH0sXG4gICduYW1lJyxcbiAgeyB2YWx1ZTogcGFyc2UoX19maWxlbmFtZSkubmFtZSB9XG4pO1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBjaGVjayB3aGV0aGVyIHRoZSBCYWNrdXAgUGxhbiBTZWxlY3Rpb24gY29udGFpbnMgdGhlIGdpdmVuIHZvbHVtZVxuICogQHBhcmFtIG5vZGUgdGhlIENmbkJhY2t1cFNlbGVjdGlvbiB0byBjaGVja1xuICogQHBhcmFtIHZvbHVtZUxvZ2ljYWxJZCB0aGUgQ2ZuIExvZ2ljYWwgSUQgb2YgdGhlIHZvbHVtZVxuICogcmV0dXJucyB3aGV0aGVyIHRoZSBDZm5CYWNrdXBTZWxlY3Rpb24gY29udGFpbnMgdGhlIGdpdmVuIHZvbHVtZVxuICovXG5mdW5jdGlvbiBpc01hdGNoaW5nU2VsZWN0aW9uKFxuICBub2RlOiBDZm5CYWNrdXBTZWxlY3Rpb24sXG4gIHZvbHVtZUxvZ2ljYWxJZDogc3RyaW5nXG4pOiBib29sZWFuIHtcbiAgY29uc3QgYmFja3VwU2VsZWN0aW9uID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShub2RlLmJhY2t1cFNlbGVjdGlvbik7XG4gIGNvbnN0IHJlc291cmNlcyA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUoYmFja3VwU2VsZWN0aW9uLnJlc291cmNlcyk7XG4gIGlmIChBcnJheS5pc0FycmF5KHJlc291cmNlcykpIHtcbiAgICBmb3IgKGNvbnN0IHJlc291cmNlIG9mIHJlc291cmNlcykge1xuICAgICAgY29uc3QgcmVzb2x2ZWRSZXNvdXJjZSA9IEpTT04uc3RyaW5naWZ5KFN0YWNrLm9mKG5vZGUpLnJlc29sdmUocmVzb3VyY2UpKTtcbiAgICAgIGlmIChuZXcgUmVnRXhwKGAke3ZvbHVtZUxvZ2ljYWxJZH0oPyFbXFxcXHddKWApLnRlc3QocmVzb2x2ZWRSZXNvdXJjZSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbiJdfQ==