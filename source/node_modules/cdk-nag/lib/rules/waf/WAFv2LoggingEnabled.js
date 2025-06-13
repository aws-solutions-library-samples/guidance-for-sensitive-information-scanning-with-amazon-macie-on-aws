"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_wafv2_1 = require("aws-cdk-lib/aws-wafv2");
const nag_rules_1 = require("../../nag-rules");
/**
 * WAFv2 web ACLs have logging enabled
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_wafv2_1.CfnWebACL) {
        const webAclLogicalId = nag_rules_1.NagRules.resolveResourceFromIntrinsic(node, node.ref);
        const webAclName = aws_cdk_lib_1.Stack.of(node).resolve(node.name);
        let found = false;
        for (const child of aws_cdk_lib_1.Stack.of(node).node.findAll()) {
            if (child instanceof aws_wafv2_1.CfnLoggingConfiguration) {
                if (isMatchingLoggingConfiguration(child, webAclLogicalId, webAclName)) {
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
 * Helper function to check whether the Logging Configuration contains the given Web ACL
 * @param node the CfnLoggingConfiguration to check
 * @param webAclLogicalId the Cfn Logical ID of the Web ACL
 * @param webAclName the name of the Web ACL
 * returns whether the CfnLoggingConfiguration contains the given Web ACL
 */
function isMatchingLoggingConfiguration(node, webAclLogicalId, webAclName) {
    const resourceArn = JSON.stringify(aws_cdk_lib_1.Stack.of(node).resolve(node.resourceArn));
    if (new RegExp(`${webAclLogicalId}(?![\\w])`).test(resourceArn) ||
        (webAclName != undefined &&
            new RegExp(`webacl\/${webAclName}(?![\\w\\-_\\.])`).test(resourceArn))) {
        return true;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV0FGdjJMb2dnaW5nRW5hYmxlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy93YWYvV0FGdjJMb2dnaW5nRW5hYmxlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7RUFHRTtBQUNGLCtCQUE2QjtBQUM3Qiw2Q0FBaUQ7QUFDakQscURBQTJFO0FBQzNFLCtDQUE4RDtBQUU5RDs7O0dBR0c7QUFDSCxrQkFBZSxNQUFNLENBQUMsY0FBYyxDQUNsQyxDQUFDLElBQWlCLEVBQXFCLEVBQUU7SUFDdkMsSUFBSSxJQUFJLFlBQVkscUJBQVMsRUFBRSxDQUFDO1FBQzlCLE1BQU0sZUFBZSxHQUFHLG9CQUFRLENBQUMsNEJBQTRCLENBQzNELElBQUksRUFDSixJQUFJLENBQUMsR0FBRyxDQUNULENBQUM7UUFDRixNQUFNLFVBQVUsR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNsQixLQUFLLE1BQU0sS0FBSyxJQUFJLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO1lBQ2xELElBQUksS0FBSyxZQUFZLG1DQUF1QixFQUFFLENBQUM7Z0JBQzdDLElBQ0UsOEJBQThCLENBQUMsS0FBSyxFQUFFLGVBQWUsRUFBRSxVQUFVLENBQUMsRUFDbEUsQ0FBQztvQkFDRCxLQUFLLEdBQUcsSUFBSSxDQUFDO29CQUNiLE1BQU07Z0JBQ1IsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ1gsT0FBTyw2QkFBaUIsQ0FBQyxhQUFhLENBQUM7UUFDekMsQ0FBQztRQUNELE9BQU8sNkJBQWlCLENBQUMsU0FBUyxDQUFDO0lBQ3JDLENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTyw2QkFBaUIsQ0FBQyxjQUFjLENBQUM7SUFDMUMsQ0FBQztBQUNILENBQUMsRUFDRCxNQUFNLEVBQ04sRUFBRSxLQUFLLEVBQUUsSUFBQSxZQUFLLEVBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQ2xDLENBQUM7QUFFRjs7Ozs7O0dBTUc7QUFDSCxTQUFTLDhCQUE4QixDQUNyQyxJQUE2QixFQUM3QixlQUF1QixFQUN2QixVQUE4QjtJQUU5QixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUM3RSxJQUNFLElBQUksTUFBTSxDQUFDLEdBQUcsZUFBZSxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzNELENBQUMsVUFBVSxJQUFJLFNBQVM7WUFDdEIsSUFBSSxNQUFNLENBQUMsV0FBVyxVQUFVLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQ3hFLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuQ29weXJpZ2h0IEFtYXpvbi5jb20sIEluYy4gb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5TUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuKi9cbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDZm5SZXNvdXJjZSwgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDZm5XZWJBQ0wsIENmbkxvZ2dpbmdDb25maWd1cmF0aW9uIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLXdhZnYyJztcbmltcG9ydCB7IE5hZ1J1bGVDb21wbGlhbmNlLCBOYWdSdWxlcyB9IGZyb20gJy4uLy4uL25hZy1ydWxlcyc7XG5cbi8qKlxuICogV0FGdjIgd2ViIEFDTHMgaGF2ZSBsb2dnaW5nIGVuYWJsZWRcbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5SZXNvdXJjZSB0byBjaGVja1xuICovXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIChub2RlOiBDZm5SZXNvdXJjZSk6IE5hZ1J1bGVDb21wbGlhbmNlID0+IHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENmbldlYkFDTCkge1xuICAgICAgY29uc3Qgd2ViQWNsTG9naWNhbElkID0gTmFnUnVsZXMucmVzb2x2ZVJlc291cmNlRnJvbUludHJpbnNpYyhcbiAgICAgICAgbm9kZSxcbiAgICAgICAgbm9kZS5yZWZcbiAgICAgICk7XG4gICAgICBjb25zdCB3ZWJBY2xOYW1lID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShub2RlLm5hbWUpO1xuICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIFN0YWNrLm9mKG5vZGUpLm5vZGUuZmluZEFsbCgpKSB7XG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIENmbkxvZ2dpbmdDb25maWd1cmF0aW9uKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgaXNNYXRjaGluZ0xvZ2dpbmdDb25maWd1cmF0aW9uKGNoaWxkLCB3ZWJBY2xMb2dpY2FsSWQsIHdlYkFjbE5hbWUpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PTl9DT01QTElBTlQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuQ09NUExJQU5UO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9UX0FQUExJQ0FCTEU7XG4gICAgfVxuICB9LFxuICAnbmFtZScsXG4gIHsgdmFsdWU6IHBhcnNlKF9fZmlsZW5hbWUpLm5hbWUgfVxuKTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY2hlY2sgd2hldGhlciB0aGUgTG9nZ2luZyBDb25maWd1cmF0aW9uIGNvbnRhaW5zIHRoZSBnaXZlbiBXZWIgQUNMXG4gKiBAcGFyYW0gbm9kZSB0aGUgQ2ZuTG9nZ2luZ0NvbmZpZ3VyYXRpb24gdG8gY2hlY2tcbiAqIEBwYXJhbSB3ZWJBY2xMb2dpY2FsSWQgdGhlIENmbiBMb2dpY2FsIElEIG9mIHRoZSBXZWIgQUNMXG4gKiBAcGFyYW0gd2ViQWNsTmFtZSB0aGUgbmFtZSBvZiB0aGUgV2ViIEFDTFxuICogcmV0dXJucyB3aGV0aGVyIHRoZSBDZm5Mb2dnaW5nQ29uZmlndXJhdGlvbiBjb250YWlucyB0aGUgZ2l2ZW4gV2ViIEFDTFxuICovXG5mdW5jdGlvbiBpc01hdGNoaW5nTG9nZ2luZ0NvbmZpZ3VyYXRpb24oXG4gIG5vZGU6IENmbkxvZ2dpbmdDb25maWd1cmF0aW9uLFxuICB3ZWJBY2xMb2dpY2FsSWQ6IHN0cmluZyxcbiAgd2ViQWNsTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkXG4pOiBib29sZWFuIHtcbiAgY29uc3QgcmVzb3VyY2VBcm4gPSBKU09OLnN0cmluZ2lmeShTdGFjay5vZihub2RlKS5yZXNvbHZlKG5vZGUucmVzb3VyY2VBcm4pKTtcbiAgaWYgKFxuICAgIG5ldyBSZWdFeHAoYCR7d2ViQWNsTG9naWNhbElkfSg/IVtcXFxcd10pYCkudGVzdChyZXNvdXJjZUFybikgfHxcbiAgICAod2ViQWNsTmFtZSAhPSB1bmRlZmluZWQgJiZcbiAgICAgIG5ldyBSZWdFeHAoYHdlYmFjbFxcLyR7d2ViQWNsTmFtZX0oPyFbXFxcXHdcXFxcLV9cXFxcLl0pYCkudGVzdChyZXNvdXJjZUFybikpXG4gICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbiJdfQ==