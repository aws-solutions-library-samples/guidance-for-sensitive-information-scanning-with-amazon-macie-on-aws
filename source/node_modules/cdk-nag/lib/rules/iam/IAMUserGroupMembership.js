"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
const nag_rules_1 = require("../../nag-rules");
/**
 * IAM users are assigned to at least one group
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_iam_1.CfnUser) {
        const userGroup = aws_cdk_lib_1.Stack.of(node).resolve(node.groups);
        if (userGroup == undefined) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSUFNVXNlckdyb3VwTWVtYmVyc2hpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9pYW0vSUFNVXNlckdyb3VwTWVtYmVyc2hpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7RUFHRTtBQUNGLCtCQUE2QjtBQUM3Qiw2Q0FBaUQ7QUFDakQsaURBQThDO0FBQzlDLCtDQUFvRDtBQUVwRDs7O0dBR0c7QUFDSCxrQkFBZSxNQUFNLENBQUMsY0FBYyxDQUNsQyxDQUFDLElBQWlCLEVBQXFCLEVBQUU7SUFDdkMsSUFBSSxJQUFJLFlBQVksaUJBQU8sRUFBRSxDQUFDO1FBQzVCLE1BQU0sU0FBUyxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEQsSUFBSSxTQUFTLElBQUksU0FBUyxFQUFFLENBQUM7WUFDM0IsT0FBTyw2QkFBaUIsQ0FBQyxhQUFhLENBQUM7UUFDekMsQ0FBQztRQUNELE9BQU8sNkJBQWlCLENBQUMsU0FBUyxDQUFDO0lBQ3JDLENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTyw2QkFBaUIsQ0FBQyxjQUFjLENBQUM7SUFDMUMsQ0FBQztBQUNILENBQUMsRUFDRCxNQUFNLEVBQ04sRUFBRSxLQUFLLEVBQUUsSUFBQSxZQUFLLEVBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQ2xDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuQ29weXJpZ2h0IEFtYXpvbi5jb20sIEluYy4gb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5TUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuKi9cbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDZm5SZXNvdXJjZSwgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDZm5Vc2VyIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG5pbXBvcnQgeyBOYWdSdWxlQ29tcGxpYW5jZSB9IGZyb20gJy4uLy4uL25hZy1ydWxlcyc7XG5cbi8qKlxuICogSUFNIHVzZXJzIGFyZSBhc3NpZ25lZCB0byBhdCBsZWFzdCBvbmUgZ3JvdXBcbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5SZXNvdXJjZSB0byBjaGVja1xuICovXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIChub2RlOiBDZm5SZXNvdXJjZSk6IE5hZ1J1bGVDb21wbGlhbmNlID0+IHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENmblVzZXIpIHtcbiAgICAgIGNvbnN0IHVzZXJHcm91cCA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUobm9kZS5ncm91cHMpO1xuICAgICAgaWYgKHVzZXJHcm91cCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PTl9DT01QTElBTlQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuQ09NUExJQU5UO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9UX0FQUExJQ0FCTEU7XG4gICAgfVxuICB9LFxuICAnbmFtZScsXG4gIHsgdmFsdWU6IHBhcnNlKF9fZmlsZW5hbWUpLm5hbWUgfVxuKTtcbiJdfQ==