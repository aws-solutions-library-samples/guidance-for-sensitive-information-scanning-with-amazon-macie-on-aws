"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_ec2_1 = require("aws-cdk-lib/aws-ec2");
const nag_rules_1 = require("../../nag-rules");
/**
 * EC2 instances do not have public IPs
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_ec2_1.CfnInstance) {
        const networkInterfaces = aws_cdk_lib_1.Stack.of(node).resolve(node.networkInterfaces);
        if (networkInterfaces != undefined) {
            //Iterate through network interfaces, checking if public IPs are enabled
            for (const networkInterface of networkInterfaces) {
                const resolvedInterface = aws_cdk_lib_1.Stack.of(node).resolve(networkInterface);
                const associatePublicIpAddress = nag_rules_1.NagRules.resolveIfPrimitive(node, resolvedInterface.associatePublicIpAddress);
                if (associatePublicIpAddress === true) {
                    return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
                }
            }
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRUMySW5zdGFuY2VOb1B1YmxpY0lwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3J1bGVzL2VjMi9FQzJJbnN0YW5jZU5vUHVibGljSXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0VBR0U7QUFDRiwrQkFBNkI7QUFDN0IsNkNBQWlEO0FBQ2pELGlEQUFrRDtBQUNsRCwrQ0FBOEQ7QUFFOUQ7OztHQUdHO0FBQ0gsa0JBQWUsTUFBTSxDQUFDLGNBQWMsQ0FDbEMsQ0FBQyxJQUFpQixFQUFxQixFQUFFO0lBQ3ZDLElBQUksSUFBSSxZQUFZLHFCQUFXLEVBQUUsQ0FBQztRQUNoQyxNQUFNLGlCQUFpQixHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN6RSxJQUFJLGlCQUFpQixJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQ25DLHdFQUF3RTtZQUN4RSxLQUFLLE1BQU0sZ0JBQWdCLElBQUksaUJBQWlCLEVBQUUsQ0FBQztnQkFDakQsTUFBTSxpQkFBaUIsR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDbkUsTUFBTSx3QkFBd0IsR0FBRyxvQkFBUSxDQUFDLGtCQUFrQixDQUMxRCxJQUFJLEVBQ0osaUJBQWlCLENBQUMsd0JBQXdCLENBQzNDLENBQUM7Z0JBQ0YsSUFBSSx3QkFBd0IsS0FBSyxJQUFJLEVBQUUsQ0FBQztvQkFDdEMsT0FBTyw2QkFBaUIsQ0FBQyxhQUFhLENBQUM7Z0JBQ3pDLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUNELE9BQU8sNkJBQWlCLENBQUMsU0FBUyxDQUFDO0lBQ3JDLENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTyw2QkFBaUIsQ0FBQyxjQUFjLENBQUM7SUFDMUMsQ0FBQztBQUNILENBQUMsRUFDRCxNQUFNLEVBQ04sRUFBRSxLQUFLLEVBQUUsSUFBQSxZQUFLLEVBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQ2xDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuQ29weXJpZ2h0IEFtYXpvbi5jb20sIEluYy4gb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5TUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuKi9cbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDZm5SZXNvdXJjZSwgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDZm5JbnN0YW5jZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1lYzInO1xuaW1wb3J0IHsgTmFnUnVsZUNvbXBsaWFuY2UsIE5hZ1J1bGVzIH0gZnJvbSAnLi4vLi4vbmFnLXJ1bGVzJztcblxuLyoqXG4gKiBFQzIgaW5zdGFuY2VzIGRvIG5vdCBoYXZlIHB1YmxpYyBJUHNcbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5SZXNvdXJjZSB0byBjaGVja1xuICovXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIChub2RlOiBDZm5SZXNvdXJjZSk6IE5hZ1J1bGVDb21wbGlhbmNlID0+IHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENmbkluc3RhbmNlKSB7XG4gICAgICBjb25zdCBuZXR3b3JrSW50ZXJmYWNlcyA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUobm9kZS5uZXR3b3JrSW50ZXJmYWNlcyk7XG4gICAgICBpZiAobmV0d29ya0ludGVyZmFjZXMgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vSXRlcmF0ZSB0aHJvdWdoIG5ldHdvcmsgaW50ZXJmYWNlcywgY2hlY2tpbmcgaWYgcHVibGljIElQcyBhcmUgZW5hYmxlZFxuICAgICAgICBmb3IgKGNvbnN0IG5ldHdvcmtJbnRlcmZhY2Ugb2YgbmV0d29ya0ludGVyZmFjZXMpIHtcbiAgICAgICAgICBjb25zdCByZXNvbHZlZEludGVyZmFjZSA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUobmV0d29ya0ludGVyZmFjZSk7XG4gICAgICAgICAgY29uc3QgYXNzb2NpYXRlUHVibGljSXBBZGRyZXNzID0gTmFnUnVsZXMucmVzb2x2ZUlmUHJpbWl0aXZlKFxuICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgIHJlc29sdmVkSW50ZXJmYWNlLmFzc29jaWF0ZVB1YmxpY0lwQWRkcmVzc1xuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKGFzc29jaWF0ZVB1YmxpY0lwQWRkcmVzcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PTl9DT01QTElBTlQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuQ09NUExJQU5UO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9UX0FQUExJQ0FCTEU7XG4gICAgfVxuICB9LFxuICAnbmFtZScsXG4gIHsgdmFsdWU6IHBhcnNlKF9fZmlsZW5hbWUpLm5hbWUgfVxuKTtcbiJdfQ==