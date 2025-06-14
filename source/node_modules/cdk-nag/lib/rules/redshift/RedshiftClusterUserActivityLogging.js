"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_redshift_1 = require("aws-cdk-lib/aws-redshift");
const nag_rules_1 = require("../../nag-rules");
/**
 * Redshift clusters have user user activity logging enabled
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_redshift_1.CfnCluster) {
        const clusterParameterGroupName = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, node.clusterParameterGroupName);
        if (clusterParameterGroupName === undefined) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        let found = false;
        for (const child of aws_cdk_lib_1.Stack.of(node).node.findAll()) {
            if (child instanceof aws_redshift_1.CfnClusterParameterGroup) {
                const childParameterGroupName = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, child.ref);
                if (childParameterGroupName === clusterParameterGroupName) {
                    found = isCompliantClusterParameterGroup(child);
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
 * Helper function to check whether a given cluster parameter group is compliant
 * @param node the CfnClusterParameterGroup to check
 * returns whether the Cluster Parameter group is compliant
 */
function isCompliantClusterParameterGroup(node) {
    const resolvedParameters = aws_cdk_lib_1.Stack.of(node).resolve(node.parameters);
    if (resolvedParameters == undefined) {
        return false;
    }
    for (const parameter of resolvedParameters) {
        const resolvedParam = aws_cdk_lib_1.Stack.of(node).resolve(parameter);
        if (resolvedParam.parameterName === 'enable_user_activity_logging' &&
            resolvedParam.parameterValue === 'true') {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVkc2hpZnRDbHVzdGVyVXNlckFjdGl2aXR5TG9nZ2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9yZWRzaGlmdC9SZWRzaGlmdENsdXN0ZXJVc2VyQWN0aXZpdHlMb2dnaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7OztFQUdFO0FBQ0YsK0JBQTZCO0FBQzdCLDZDQUFpRDtBQUNqRCwyREFBZ0Y7QUFDaEYsK0NBQThEO0FBRTlEOzs7R0FHRztBQUNILGtCQUFlLE1BQU0sQ0FBQyxjQUFjLENBQ2xDLENBQUMsSUFBaUIsRUFBcUIsRUFBRTtJQUN2QyxJQUFJLElBQUksWUFBWSx5QkFBVSxFQUFFLENBQUM7UUFDL0IsTUFBTSx5QkFBeUIsR0FBRyxvQkFBUSxDQUFDLDRCQUE0QixDQUNyRSxJQUFJLEVBQ0osSUFBSSxDQUFDLHlCQUF5QixDQUMvQixDQUFDO1FBQ0YsSUFBSSx5QkFBeUIsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUM1QyxPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLEtBQUssTUFBTSxLQUFLLElBQUksbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7WUFDbEQsSUFBSSxLQUFLLFlBQVksdUNBQXdCLEVBQUUsQ0FBQztnQkFDOUMsTUFBTSx1QkFBdUIsR0FBRyxvQkFBUSxDQUFDLDRCQUE0QixDQUNuRSxJQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsQ0FDVixDQUFDO2dCQUNGLElBQUksdUJBQXVCLEtBQUsseUJBQXlCLEVBQUUsQ0FBQztvQkFDMUQsS0FBSyxHQUFHLGdDQUFnQyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNoRCxNQUFNO2dCQUNSLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUNELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNYLE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDO1FBQ3pDLENBQUM7UUFDRCxPQUFPLDZCQUFpQixDQUFDLFNBQVMsQ0FBQztJQUNyQyxDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sNkJBQWlCLENBQUMsY0FBYyxDQUFDO0lBQzFDLENBQUM7QUFDSCxDQUFDLEVBQ0QsTUFBTSxFQUNOLEVBQUUsS0FBSyxFQUFFLElBQUEsWUFBSyxFQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUNsQyxDQUFDO0FBRUY7Ozs7R0FJRztBQUNILFNBQVMsZ0NBQWdDLENBQ3ZDLElBQThCO0lBRTlCLE1BQU0sa0JBQWtCLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNuRSxJQUFJLGtCQUFrQixJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQ3BDLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNELEtBQUssTUFBTSxTQUFTLElBQUksa0JBQWtCLEVBQUUsQ0FBQztRQUMzQyxNQUFNLGFBQWEsR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEQsSUFDRSxhQUFhLENBQUMsYUFBYSxLQUFLLDhCQUE4QjtZQUM5RCxhQUFhLENBQUMsY0FBYyxLQUFLLE1BQU0sRUFDdkMsQ0FBQztZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuQ29weXJpZ2h0IEFtYXpvbi5jb20sIEluYy4gb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5TUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuKi9cbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDZm5SZXNvdXJjZSwgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDZm5DbHVzdGVyLCBDZm5DbHVzdGVyUGFyYW1ldGVyR3JvdXAgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtcmVkc2hpZnQnO1xuaW1wb3J0IHsgTmFnUnVsZUNvbXBsaWFuY2UsIE5hZ1J1bGVzIH0gZnJvbSAnLi4vLi4vbmFnLXJ1bGVzJztcblxuLyoqXG4gKiBSZWRzaGlmdCBjbHVzdGVycyBoYXZlIHVzZXIgdXNlciBhY3Rpdml0eSBsb2dnaW5nIGVuYWJsZWRcbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5SZXNvdXJjZSB0byBjaGVja1xuICovXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIChub2RlOiBDZm5SZXNvdXJjZSk6IE5hZ1J1bGVDb21wbGlhbmNlID0+IHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENmbkNsdXN0ZXIpIHtcbiAgICAgIGNvbnN0IGNsdXN0ZXJQYXJhbWV0ZXJHcm91cE5hbWUgPSBOYWdSdWxlcy5yZXNvbHZlUmVzb3VyY2VGcm9tSW50cmluc2ljKFxuICAgICAgICBub2RlLFxuICAgICAgICBub2RlLmNsdXN0ZXJQYXJhbWV0ZXJHcm91cE5hbWVcbiAgICAgICk7XG4gICAgICBpZiAoY2x1c3RlclBhcmFtZXRlckdyb3VwTmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgfVxuICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIFN0YWNrLm9mKG5vZGUpLm5vZGUuZmluZEFsbCgpKSB7XG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIENmbkNsdXN0ZXJQYXJhbWV0ZXJHcm91cCkge1xuICAgICAgICAgIGNvbnN0IGNoaWxkUGFyYW1ldGVyR3JvdXBOYW1lID0gTmFnUnVsZXMucmVzb2x2ZVJlc291cmNlRnJvbUludHJpbnNpYyhcbiAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICBjaGlsZC5yZWZcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChjaGlsZFBhcmFtZXRlckdyb3VwTmFtZSA9PT0gY2x1c3RlclBhcmFtZXRlckdyb3VwTmFtZSkge1xuICAgICAgICAgICAgZm91bmQgPSBpc0NvbXBsaWFudENsdXN0ZXJQYXJhbWV0ZXJHcm91cChjaGlsZCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PTl9DT01QTElBTlQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuQ09NUExJQU5UO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9UX0FQUExJQ0FCTEU7XG4gICAgfVxuICB9LFxuICAnbmFtZScsXG4gIHsgdmFsdWU6IHBhcnNlKF9fZmlsZW5hbWUpLm5hbWUgfVxuKTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY2hlY2sgd2hldGhlciBhIGdpdmVuIGNsdXN0ZXIgcGFyYW1ldGVyIGdyb3VwIGlzIGNvbXBsaWFudFxuICogQHBhcmFtIG5vZGUgdGhlIENmbkNsdXN0ZXJQYXJhbWV0ZXJHcm91cCB0byBjaGVja1xuICogcmV0dXJucyB3aGV0aGVyIHRoZSBDbHVzdGVyIFBhcmFtZXRlciBncm91cCBpcyBjb21wbGlhbnRcbiAqL1xuZnVuY3Rpb24gaXNDb21wbGlhbnRDbHVzdGVyUGFyYW1ldGVyR3JvdXAoXG4gIG5vZGU6IENmbkNsdXN0ZXJQYXJhbWV0ZXJHcm91cFxuKTogYm9vbGVhbiB7XG4gIGNvbnN0IHJlc29sdmVkUGFyYW1ldGVycyA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUobm9kZS5wYXJhbWV0ZXJzKTtcbiAgaWYgKHJlc29sdmVkUGFyYW1ldGVycyA9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZm9yIChjb25zdCBwYXJhbWV0ZXIgb2YgcmVzb2x2ZWRQYXJhbWV0ZXJzKSB7XG4gICAgY29uc3QgcmVzb2x2ZWRQYXJhbSA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUocGFyYW1ldGVyKTtcbiAgICBpZiAoXG4gICAgICByZXNvbHZlZFBhcmFtLnBhcmFtZXRlck5hbWUgPT09ICdlbmFibGVfdXNlcl9hY3Rpdml0eV9sb2dnaW5nJyAmJlxuICAgICAgcmVzb2x2ZWRQYXJhbS5wYXJhbWV0ZXJWYWx1ZSA9PT0gJ3RydWUnXG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuIl19