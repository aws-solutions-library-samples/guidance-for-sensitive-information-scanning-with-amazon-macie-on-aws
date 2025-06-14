"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_codebuild_1 = require("aws-cdk-lib/aws-codebuild");
const nag_rules_1 = require("../../nag-rules");
/**
 * Codebuild projects with a GitHub or BitBucket source repository utilize OAUTH
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_codebuild_1.CfnProject) {
        //Check for the presence of OAUTH
        const projectSource = aws_cdk_lib_1.Stack.of(node).resolve(node.source);
        const projectAuth = aws_cdk_lib_1.Stack.of(node).resolve(projectSource.auth);
        if (projectAuth == undefined) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        else {
            const projectAuthType = nag_rules_1.NagRules.resolveIfPrimitive(node, projectAuth.type);
            if (projectAuthType != 'OAUTH') {
                return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
            }
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29kZUJ1aWxkUHJvamVjdFNvdXJjZVJlcG9VcmwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvY29kZWJ1aWxkL0NvZGVCdWlsZFByb2plY3RTb3VyY2VSZXBvVXJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7OztFQUdFO0FBQ0YsK0JBQTZCO0FBQzdCLDZDQUFpRDtBQUNqRCw2REFBdUQ7QUFDdkQsK0NBQThEO0FBRTlEOzs7R0FHRztBQUNILGtCQUFlLE1BQU0sQ0FBQyxjQUFjLENBQ2xDLENBQUMsSUFBaUIsRUFBcUIsRUFBRTtJQUN2QyxJQUFJLElBQUksWUFBWSwwQkFBVSxFQUFFLENBQUM7UUFDL0IsaUNBQWlDO1FBQ2pDLE1BQU0sYUFBYSxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUQsTUFBTSxXQUFXLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvRCxJQUFJLFdBQVcsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUM3QixPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztRQUN6QyxDQUFDO2FBQU0sQ0FBQztZQUNOLE1BQU0sZUFBZSxHQUFHLG9CQUFRLENBQUMsa0JBQWtCLENBQ2pELElBQUksRUFDSixXQUFXLENBQUMsSUFBSSxDQUNqQixDQUFDO1lBQ0YsSUFBSSxlQUFlLElBQUksT0FBTyxFQUFFLENBQUM7Z0JBQy9CLE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDO1lBQ3pDLENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyw2QkFBaUIsQ0FBQyxTQUFTLENBQUM7SUFDckMsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLDZCQUFpQixDQUFDLGNBQWMsQ0FBQztJQUMxQyxDQUFDO0FBQ0gsQ0FBQyxFQUNELE1BQU0sRUFDTixFQUFFLEtBQUssRUFBRSxJQUFBLFlBQUssRUFBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FDbEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5Db3B5cmlnaHQgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4qL1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IENmblJlc291cmNlLCBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENmblByb2plY3QgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtY29kZWJ1aWxkJztcbmltcG9ydCB7IE5hZ1J1bGVDb21wbGlhbmNlLCBOYWdSdWxlcyB9IGZyb20gJy4uLy4uL25hZy1ydWxlcyc7XG5cbi8qKlxuICogQ29kZWJ1aWxkIHByb2plY3RzIHdpdGggYSBHaXRIdWIgb3IgQml0QnVja2V0IHNvdXJjZSByZXBvc2l0b3J5IHV0aWxpemUgT0FVVEhcbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5SZXNvdXJjZSB0byBjaGVja1xuICovXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIChub2RlOiBDZm5SZXNvdXJjZSk6IE5hZ1J1bGVDb21wbGlhbmNlID0+IHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENmblByb2plY3QpIHtcbiAgICAgIC8vQ2hlY2sgZm9yIHRoZSBwcmVzZW5jZSBvZiBPQVVUSFxuICAgICAgY29uc3QgcHJvamVjdFNvdXJjZSA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUobm9kZS5zb3VyY2UpO1xuICAgICAgY29uc3QgcHJvamVjdEF1dGggPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKHByb2plY3RTb3VyY2UuYXV0aCk7XG4gICAgICBpZiAocHJvamVjdEF1dGggPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcHJvamVjdEF1dGhUeXBlID0gTmFnUnVsZXMucmVzb2x2ZUlmUHJpbWl0aXZlKFxuICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgcHJvamVjdEF1dGgudHlwZVxuICAgICAgICApO1xuICAgICAgICBpZiAocHJvamVjdEF1dGhUeXBlICE9ICdPQVVUSCcpIHtcbiAgICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9OX0NPTVBMSUFOVDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLkNPTVBMSUFOVDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PVF9BUFBMSUNBQkxFO1xuICAgIH1cbiAgfSxcbiAgJ25hbWUnLFxuICB7IHZhbHVlOiBwYXJzZShfX2ZpbGVuYW1lKS5uYW1lIH1cbik7XG4iXX0=