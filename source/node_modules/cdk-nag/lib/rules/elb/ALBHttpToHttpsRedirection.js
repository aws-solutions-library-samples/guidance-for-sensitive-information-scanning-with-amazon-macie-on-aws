"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_elasticloadbalancingv2_1 = require("aws-cdk-lib/aws-elasticloadbalancingv2");
const nag_rules_1 = require("../../nag-rules");
/**
 * ALB HTTP listeners are configured to redirect to HTTPS
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_elasticloadbalancingv2_1.CfnListener) {
        let found = false;
        const protocol = nag_rules_1.NagRules.resolveIfPrimitive(node, node.protocol);
        const actions = aws_cdk_lib_1.Stack.of(node).resolve(node.defaultActions);
        if (protocol == 'HTTP') {
            for (const action of actions) {
                if (action.type == 'redirect' &&
                    action.redirectConfig.protocol == 'HTTPS') {
                    found = true;
                }
            }
            if (!found)
                return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQUxCSHR0cFRvSHR0cHNSZWRpcmVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9lbGIvQUxCSHR0cFRvSHR0cHNSZWRpcmVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7RUFHRTtBQUNGLCtCQUE2QjtBQUM3Qiw2Q0FBaUQ7QUFDakQsdUZBQXFFO0FBQ3JFLCtDQUE4RDtBQUU5RDs7O0dBR0c7QUFDSCxrQkFBZSxNQUFNLENBQUMsY0FBYyxDQUNsQyxDQUFDLElBQWlCLEVBQXFCLEVBQUU7SUFDdkMsSUFBSSxJQUFJLFlBQVksd0NBQVcsRUFBRSxDQUFDO1FBQ2hDLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNsQixNQUFNLFFBQVEsR0FBRyxvQkFBUSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEUsTUFBTSxPQUFPLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUU1RCxJQUFJLFFBQVEsSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUN2QixLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRSxDQUFDO2dCQUM3QixJQUNFLE1BQU0sQ0FBQyxJQUFJLElBQUksVUFBVTtvQkFDekIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLElBQUksT0FBTyxFQUN6QyxDQUFDO29CQUNELEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2YsQ0FBQztZQUNILENBQUM7WUFDRCxJQUFJLENBQUMsS0FBSztnQkFBRSxPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztRQUNyRCxDQUFDO1FBQ0QsT0FBTyw2QkFBaUIsQ0FBQyxTQUFTLENBQUM7SUFDckMsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLDZCQUFpQixDQUFDLGNBQWMsQ0FBQztJQUMxQyxDQUFDO0FBQ0gsQ0FBQyxFQUNELE1BQU0sRUFDTixFQUFFLEtBQUssRUFBRSxJQUFBLFlBQUssRUFBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FDbEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5Db3B5cmlnaHQgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4qL1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IENmblJlc291cmNlLCBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENmbkxpc3RlbmVyIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWVsYXN0aWNsb2FkYmFsYW5jaW5ndjInO1xuaW1wb3J0IHsgTmFnUnVsZUNvbXBsaWFuY2UsIE5hZ1J1bGVzIH0gZnJvbSAnLi4vLi4vbmFnLXJ1bGVzJztcblxuLyoqXG4gKiBBTEIgSFRUUCBsaXN0ZW5lcnMgYXJlIGNvbmZpZ3VyZWQgdG8gcmVkaXJlY3QgdG8gSFRUUFNcbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5SZXNvdXJjZSB0byBjaGVja1xuICovXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIChub2RlOiBDZm5SZXNvdXJjZSk6IE5hZ1J1bGVDb21wbGlhbmNlID0+IHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENmbkxpc3RlbmVyKSB7XG4gICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgIGNvbnN0IHByb3RvY29sID0gTmFnUnVsZXMucmVzb2x2ZUlmUHJpbWl0aXZlKG5vZGUsIG5vZGUucHJvdG9jb2wpO1xuICAgICAgY29uc3QgYWN0aW9ucyA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUobm9kZS5kZWZhdWx0QWN0aW9ucyk7XG5cbiAgICAgIGlmIChwcm90b2NvbCA9PSAnSFRUUCcpIHtcbiAgICAgICAgZm9yIChjb25zdCBhY3Rpb24gb2YgYWN0aW9ucykge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGFjdGlvbi50eXBlID09ICdyZWRpcmVjdCcgJiZcbiAgICAgICAgICAgIGFjdGlvbi5yZWRpcmVjdENvbmZpZy5wcm90b2NvbCA9PSAnSFRUUFMnXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghZm91bmQpIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLkNPTVBMSUFOVDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PVF9BUFBMSUNBQkxFO1xuICAgIH1cbiAgfSxcbiAgJ25hbWUnLFxuICB7IHZhbHVlOiBwYXJzZShfX2ZpbGVuYW1lKS5uYW1lIH1cbik7XG4iXX0=