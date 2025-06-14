"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_backup_1 = require("aws-cdk-lib/aws-backup");
const aws_efs_1 = require("aws-cdk-lib/aws-efs");
const nag_rules_1 = require("../../nag-rules");
/**
 * EFSs are part of AWS Backup plan(s)
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_efs_1.CfnFileSystem) {
        const fileSystemLogicalId = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, node.ref);
        let found = false;
        for (const child of aws_cdk_lib_1.Stack.of(node).node.findAll()) {
            if (child instanceof aws_backup_1.CfnBackupSelection) {
                if (isMatchingSelection(child, fileSystemLogicalId)) {
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
 * Helper function to check whether the Backup Plan Selection contains the given File System
 * @param node the CfnBackupSelection to check
 * @param fileSystemLogicalId the Cfn Logical ID of the File System
 * returns whether the CfnBackupSelection contains the given File System
 */
function isMatchingSelection(node, fileSystemLogicalId) {
    const backupSelection = aws_cdk_lib_1.Stack.of(node).resolve(node.backupSelection);
    const resources = aws_cdk_lib_1.Stack.of(node).resolve(backupSelection.resources);
    if (Array.isArray(resources)) {
        for (const resource of resources) {
            const resolvedResource = JSON.stringify(aws_cdk_lib_1.Stack.of(node).resolve(resource));
            if (new RegExp(`${fileSystemLogicalId}(?![\\w])`).test(resolvedResource)) {
                return true;
            }
        }
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRUZTSW5CYWNrdXBQbGFuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3J1bGVzL2Vmcy9FRlNJbkJhY2t1cFBsYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0VBR0U7QUFDRiwrQkFBNkI7QUFDN0IsNkNBQWlEO0FBQ2pELHVEQUE0RDtBQUM1RCxpREFBb0Q7QUFDcEQsK0NBQThEO0FBRTlEOzs7R0FHRztBQUVILGtCQUFlLE1BQU0sQ0FBQyxjQUFjLENBQ2xDLENBQUMsSUFBaUIsRUFBcUIsRUFBRTtJQUN2QyxJQUFJLElBQUksWUFBWSx1QkFBYSxFQUFFLENBQUM7UUFDbEMsTUFBTSxtQkFBbUIsR0FBRyxvQkFBUSxDQUFDLDRCQUE0QixDQUMvRCxJQUFJLEVBQ0osSUFBSSxDQUFDLEdBQUcsQ0FDVCxDQUFDO1FBQ0YsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLEtBQUssTUFBTSxLQUFLLElBQUksbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7WUFDbEQsSUFBSSxLQUFLLFlBQVksK0JBQWtCLEVBQUUsQ0FBQztnQkFDeEMsSUFBSSxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsbUJBQW1CLENBQUMsRUFBRSxDQUFDO29CQUNwRCxLQUFLLEdBQUcsSUFBSSxDQUFDO29CQUNiLE1BQU07Z0JBQ1IsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ1gsT0FBTyw2QkFBaUIsQ0FBQyxhQUFhLENBQUM7UUFDekMsQ0FBQztRQUNELE9BQU8sNkJBQWlCLENBQUMsU0FBUyxDQUFDO0lBQ3JDLENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTyw2QkFBaUIsQ0FBQyxjQUFjLENBQUM7SUFDMUMsQ0FBQztBQUNILENBQUMsRUFDRCxNQUFNLEVBQ04sRUFBRSxLQUFLLEVBQUUsSUFBQSxZQUFLLEVBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQ2xDLENBQUM7QUFFRjs7Ozs7R0FLRztBQUNILFNBQVMsbUJBQW1CLENBQzFCLElBQXdCLEVBQ3hCLG1CQUEyQjtJQUUzQixNQUFNLGVBQWUsR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3JFLE1BQU0sU0FBUyxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7UUFDN0IsS0FBSyxNQUFNLFFBQVEsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUNqQyxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDMUUsSUFDRSxJQUFJLE1BQU0sQ0FBQyxHQUFHLG1CQUFtQixXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFDcEUsQ0FBQztnQkFDRCxPQUFPLElBQUksQ0FBQztZQUNkLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5Db3B5cmlnaHQgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4qL1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IENmblJlc291cmNlLCBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENmbkJhY2t1cFNlbGVjdGlvbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1iYWNrdXAnO1xuaW1wb3J0IHsgQ2ZuRmlsZVN5c3RlbSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1lZnMnO1xuaW1wb3J0IHsgTmFnUnVsZUNvbXBsaWFuY2UsIE5hZ1J1bGVzIH0gZnJvbSAnLi4vLi4vbmFnLXJ1bGVzJztcblxuLyoqXG4gKiBFRlNzIGFyZSBwYXJ0IG9mIEFXUyBCYWNrdXAgcGxhbihzKVxuICogQHBhcmFtIG5vZGUgdGhlIENmblJlc291cmNlIHRvIGNoZWNrXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmRlZmluZVByb3BlcnR5KFxuICAobm9kZTogQ2ZuUmVzb3VyY2UpOiBOYWdSdWxlQ29tcGxpYW5jZSA9PiB7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBDZm5GaWxlU3lzdGVtKSB7XG4gICAgICBjb25zdCBmaWxlU3lzdGVtTG9naWNhbElkID0gTmFnUnVsZXMucmVzb2x2ZVJlc291cmNlRnJvbUludHJpbnNpYyhcbiAgICAgICAgbm9kZSxcbiAgICAgICAgbm9kZS5yZWZcbiAgICAgICk7XG4gICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgU3RhY2sub2Yobm9kZSkubm9kZS5maW5kQWxsKCkpIHtcbiAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgQ2ZuQmFja3VwU2VsZWN0aW9uKSB7XG4gICAgICAgICAgaWYgKGlzTWF0Y2hpbmdTZWxlY3Rpb24oY2hpbGQsIGZpbGVTeXN0ZW1Mb2dpY2FsSWQpKSB7XG4gICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PTl9DT01QTElBTlQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuQ09NUExJQU5UO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9UX0FQUExJQ0FCTEU7XG4gICAgfVxuICB9LFxuICAnbmFtZScsXG4gIHsgdmFsdWU6IHBhcnNlKF9fZmlsZW5hbWUpLm5hbWUgfVxuKTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY2hlY2sgd2hldGhlciB0aGUgQmFja3VwIFBsYW4gU2VsZWN0aW9uIGNvbnRhaW5zIHRoZSBnaXZlbiBGaWxlIFN5c3RlbVxuICogQHBhcmFtIG5vZGUgdGhlIENmbkJhY2t1cFNlbGVjdGlvbiB0byBjaGVja1xuICogQHBhcmFtIGZpbGVTeXN0ZW1Mb2dpY2FsSWQgdGhlIENmbiBMb2dpY2FsIElEIG9mIHRoZSBGaWxlIFN5c3RlbVxuICogcmV0dXJucyB3aGV0aGVyIHRoZSBDZm5CYWNrdXBTZWxlY3Rpb24gY29udGFpbnMgdGhlIGdpdmVuIEZpbGUgU3lzdGVtXG4gKi9cbmZ1bmN0aW9uIGlzTWF0Y2hpbmdTZWxlY3Rpb24oXG4gIG5vZGU6IENmbkJhY2t1cFNlbGVjdGlvbixcbiAgZmlsZVN5c3RlbUxvZ2ljYWxJZDogc3RyaW5nXG4pOiBib29sZWFuIHtcbiAgY29uc3QgYmFja3VwU2VsZWN0aW9uID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShub2RlLmJhY2t1cFNlbGVjdGlvbik7XG4gIGNvbnN0IHJlc291cmNlcyA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUoYmFja3VwU2VsZWN0aW9uLnJlc291cmNlcyk7XG4gIGlmIChBcnJheS5pc0FycmF5KHJlc291cmNlcykpIHtcbiAgICBmb3IgKGNvbnN0IHJlc291cmNlIG9mIHJlc291cmNlcykge1xuICAgICAgY29uc3QgcmVzb2x2ZWRSZXNvdXJjZSA9IEpTT04uc3RyaW5naWZ5KFN0YWNrLm9mKG5vZGUpLnJlc29sdmUocmVzb3VyY2UpKTtcbiAgICAgIGlmIChcbiAgICAgICAgbmV3IFJlZ0V4cChgJHtmaWxlU3lzdGVtTG9naWNhbElkfSg/IVtcXFxcd10pYCkudGVzdChyZXNvbHZlZFJlc291cmNlKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4iXX0=