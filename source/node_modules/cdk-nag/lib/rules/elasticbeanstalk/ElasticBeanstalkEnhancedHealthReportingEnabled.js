"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_elasticbeanstalk_1 = require("aws-cdk-lib/aws-elasticbeanstalk");
const nag_rules_1 = require("../../nag-rules");
/**
 * Elastic Beanstalk environments have enhanced health reporting enabled
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_elasticbeanstalk_1.CfnEnvironment) {
        const optionSettings = aws_cdk_lib_1.Stack.of(node).resolve(node.optionSettings);
        if (optionSettings == undefined) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        let found = false;
        for (const optionSetting of optionSettings) {
            const resolvedOptionSetting = aws_cdk_lib_1.Stack.of(node).resolve(optionSetting);
            const namespace = resolvedOptionSetting.namespace;
            const optionName = resolvedOptionSetting.optionName;
            const value = resolvedOptionSetting.value;
            if (namespace === 'aws:elasticbeanstalk:healthreporting:system' &&
                optionName === 'SystemType' &&
                value === 'enhanced') {
                found = true;
                break;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWxhc3RpY0JlYW5zdGFsa0VuaGFuY2VkSGVhbHRoUmVwb3J0aW5nRW5hYmxlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9lbGFzdGljYmVhbnN0YWxrL0VsYXN0aWNCZWFuc3RhbGtFbmhhbmNlZEhlYWx0aFJlcG9ydGluZ0VuYWJsZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0VBR0U7QUFDRiwrQkFBNkI7QUFDN0IsNkNBQWlEO0FBQ2pELDJFQUFrRTtBQUNsRSwrQ0FBb0Q7QUFFcEQ7OztHQUdHO0FBQ0gsa0JBQWUsTUFBTSxDQUFDLGNBQWMsQ0FDbEMsQ0FBQyxJQUFpQixFQUFxQixFQUFFO0lBQ3ZDLElBQUksSUFBSSxZQUFZLHFDQUFjLEVBQUUsQ0FBQztRQUNuQyxNQUFNLGNBQWMsR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ25FLElBQUksY0FBYyxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQ2hDLE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDO1FBQ3pDLENBQUM7UUFDRCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbEIsS0FBSyxNQUFNLGFBQWEsSUFBSSxjQUFjLEVBQUUsQ0FBQztZQUMzQyxNQUFNLHFCQUFxQixHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNwRSxNQUFNLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxTQUFTLENBQUM7WUFDbEQsTUFBTSxVQUFVLEdBQUcscUJBQXFCLENBQUMsVUFBVSxDQUFDO1lBQ3BELE1BQU0sS0FBSyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQztZQUMxQyxJQUNFLFNBQVMsS0FBSyw2Q0FBNkM7Z0JBQzNELFVBQVUsS0FBSyxZQUFZO2dCQUMzQixLQUFLLEtBQUssVUFBVSxFQUNwQixDQUFDO2dCQUNELEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2IsTUFBTTtZQUNSLENBQUM7UUFDSCxDQUFDO1FBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ1gsT0FBTyw2QkFBaUIsQ0FBQyxhQUFhLENBQUM7UUFDekMsQ0FBQztRQUNELE9BQU8sNkJBQWlCLENBQUMsU0FBUyxDQUFDO0lBQ3JDLENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTyw2QkFBaUIsQ0FBQyxjQUFjLENBQUM7SUFDMUMsQ0FBQztBQUNILENBQUMsRUFDRCxNQUFNLEVBQ04sRUFBRSxLQUFLLEVBQUUsSUFBQSxZQUFLLEVBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQ2xDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuQ29weXJpZ2h0IEFtYXpvbi5jb20sIEluYy4gb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5TUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuKi9cbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDZm5SZXNvdXJjZSwgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDZm5FbnZpcm9ubWVudCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1lbGFzdGljYmVhbnN0YWxrJztcbmltcG9ydCB7IE5hZ1J1bGVDb21wbGlhbmNlIH0gZnJvbSAnLi4vLi4vbmFnLXJ1bGVzJztcblxuLyoqXG4gKiBFbGFzdGljIEJlYW5zdGFsayBlbnZpcm9ubWVudHMgaGF2ZSBlbmhhbmNlZCBoZWFsdGggcmVwb3J0aW5nIGVuYWJsZWRcbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5SZXNvdXJjZSB0byBjaGVja1xuICovXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIChub2RlOiBDZm5SZXNvdXJjZSk6IE5hZ1J1bGVDb21wbGlhbmNlID0+IHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENmbkVudmlyb25tZW50KSB7XG4gICAgICBjb25zdCBvcHRpb25TZXR0aW5ncyA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUobm9kZS5vcHRpb25TZXR0aW5ncyk7XG4gICAgICBpZiAob3B0aW9uU2V0dGluZ3MgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgfVxuICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICBmb3IgKGNvbnN0IG9wdGlvblNldHRpbmcgb2Ygb3B0aW9uU2V0dGluZ3MpIHtcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRPcHRpb25TZXR0aW5nID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShvcHRpb25TZXR0aW5nKTtcbiAgICAgICAgY29uc3QgbmFtZXNwYWNlID0gcmVzb2x2ZWRPcHRpb25TZXR0aW5nLm5hbWVzcGFjZTtcbiAgICAgICAgY29uc3Qgb3B0aW9uTmFtZSA9IHJlc29sdmVkT3B0aW9uU2V0dGluZy5vcHRpb25OYW1lO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHJlc29sdmVkT3B0aW9uU2V0dGluZy52YWx1ZTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIG5hbWVzcGFjZSA9PT0gJ2F3czplbGFzdGljYmVhbnN0YWxrOmhlYWx0aHJlcG9ydGluZzpzeXN0ZW0nICYmXG4gICAgICAgICAgb3B0aW9uTmFtZSA9PT0gJ1N5c3RlbVR5cGUnICYmXG4gICAgICAgICAgdmFsdWUgPT09ICdlbmhhbmNlZCdcbiAgICAgICAgKSB7XG4gICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLkNPTVBMSUFOVDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PVF9BUFBMSUNBQkxFO1xuICAgIH1cbiAgfSxcbiAgJ25hbWUnLFxuICB7IHZhbHVlOiBwYXJzZShfX2ZpbGVuYW1lKS5uYW1lIH1cbik7XG4iXX0=