"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_cloudfront_1 = require("aws-cdk-lib/aws-cloudfront");
const nag_rules_1 = require("../../nag-rules");
/**
 * CloudFront distributions do not use SSLv3 or TLSv1 for communication to the origin
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_cloudfront_1.CfnDistribution) {
        const distributionConfig = aws_cdk_lib_1.Stack.of(node).resolve(node.distributionConfig);
        if (distributionConfig.origins != undefined) {
            const origins = aws_cdk_lib_1.Stack.of(node).resolve(distributionConfig.origins);
            for (const origin of origins) {
                const resolvedOrigin = aws_cdk_lib_1.Stack.of(node).resolve(origin);
                if (resolvedOrigin.customOriginConfig != undefined) {
                    const customOriginConfig = aws_cdk_lib_1.Stack.of(node).resolve(resolvedOrigin.customOriginConfig);
                    const originProtocolPolicy = nag_rules_1.NagRules.resolveIfPrimitive(node, customOriginConfig.originProtocolPolicy);
                    if (originProtocolPolicy != aws_cloudfront_1.OriginProtocolPolicy.HTTPS_ONLY) {
                        return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
                    }
                    if (customOriginConfig.originSslProtocols == undefined) {
                        return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
                    }
                    const outdatedValues = [
                        aws_cloudfront_1.SecurityPolicyProtocol.SSL_V3,
                        aws_cloudfront_1.SecurityPolicyProtocol.TLS_V1,
                    ];
                    const originSslProtocols = (aws_cdk_lib_1.Stack.of(node).resolve(customOriginConfig.originSslProtocols));
                    const lowerCaseProtocols = originSslProtocols.map((i) => {
                        return i.toLowerCase();
                    });
                    for (const outdated of outdatedValues) {
                        if (lowerCaseProtocols.includes(outdated.toLowerCase())) {
                            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
                        }
                    }
                }
            }
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xvdWRGcm9udERpc3RyaWJ1dGlvbk5vT3V0ZGF0ZWRTU0wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvY2xvdWRmcm9udC9DbG91ZEZyb250RGlzdHJpYnV0aW9uTm9PdXRkYXRlZFNTTC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7RUFHRTtBQUNGLCtCQUE2QjtBQUM3Qiw2Q0FBaUQ7QUFDakQsK0RBSW9DO0FBQ3BDLCtDQUE4RDtBQUU5RDs7O0dBR0c7QUFDSCxrQkFBZSxNQUFNLENBQUMsY0FBYyxDQUNsQyxDQUFDLElBQWlCLEVBQXFCLEVBQUU7SUFDdkMsSUFBSSxJQUFJLFlBQVksZ0NBQWUsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sa0JBQWtCLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUMvQyxJQUFJLENBQUMsa0JBQWtCLENBQ3hCLENBQUM7UUFDRixJQUFJLGtCQUFrQixDQUFDLE9BQU8sSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUM1QyxNQUFNLE9BQU8sR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkUsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUUsQ0FBQztnQkFDN0IsTUFBTSxjQUFjLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLGNBQWMsQ0FBQyxrQkFBa0IsSUFBSSxTQUFTLEVBQUUsQ0FBQztvQkFDbkQsTUFBTSxrQkFBa0IsR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQy9DLGNBQWMsQ0FBQyxrQkFBa0IsQ0FDbEMsQ0FBQztvQkFDRixNQUFNLG9CQUFvQixHQUFHLG9CQUFRLENBQUMsa0JBQWtCLENBQ3RELElBQUksRUFDSixrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FDeEMsQ0FBQztvQkFDRixJQUFJLG9CQUFvQixJQUFJLHFDQUFvQixDQUFDLFVBQVUsRUFBRSxDQUFDO3dCQUM1RCxPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztvQkFDekMsQ0FBQztvQkFDRCxJQUFJLGtCQUFrQixDQUFDLGtCQUFrQixJQUFJLFNBQVMsRUFBRSxDQUFDO3dCQUN2RCxPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztvQkFDekMsQ0FBQztvQkFDRCxNQUFNLGNBQWMsR0FBRzt3QkFDckIsdUNBQXNCLENBQUMsTUFBTTt3QkFDN0IsdUNBQXNCLENBQUMsTUFBTTtxQkFDOUIsQ0FBQztvQkFDRixNQUFNLGtCQUFrQixHQUFhLENBQ25DLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUM5RCxDQUFDO29CQUNGLE1BQU0sa0JBQWtCLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7d0JBQ3RELE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUN6QixDQUFDLENBQUMsQ0FBQztvQkFDSCxLQUFLLE1BQU0sUUFBUSxJQUFJLGNBQWMsRUFBRSxDQUFDO3dCQUN0QyxJQUFJLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDOzRCQUN4RCxPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQzt3QkFDekMsQ0FBQztvQkFDSCxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUNELE9BQU8sNkJBQWlCLENBQUMsU0FBUyxDQUFDO0lBQ3JDLENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTyw2QkFBaUIsQ0FBQyxjQUFjLENBQUM7SUFDMUMsQ0FBQztBQUNILENBQUMsRUFDRCxNQUFNLEVBQ04sRUFBRSxLQUFLLEVBQUUsSUFBQSxZQUFLLEVBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQ2xDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuQ29weXJpZ2h0IEFtYXpvbi5jb20sIEluYy4gb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5TUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuKi9cbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDZm5SZXNvdXJjZSwgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQge1xuICBDZm5EaXN0cmlidXRpb24sXG4gIE9yaWdpblByb3RvY29sUG9saWN5LFxuICBTZWN1cml0eVBvbGljeVByb3RvY29sLFxufSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtY2xvdWRmcm9udCc7XG5pbXBvcnQgeyBOYWdSdWxlQ29tcGxpYW5jZSwgTmFnUnVsZXMgfSBmcm9tICcuLi8uLi9uYWctcnVsZXMnO1xuXG4vKipcbiAqIENsb3VkRnJvbnQgZGlzdHJpYnV0aW9ucyBkbyBub3QgdXNlIFNTTHYzIG9yIFRMU3YxIGZvciBjb21tdW5pY2F0aW9uIHRvIHRoZSBvcmlnaW5cbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5SZXNvdXJjZSB0byBjaGVja1xuICovXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIChub2RlOiBDZm5SZXNvdXJjZSk6IE5hZ1J1bGVDb21wbGlhbmNlID0+IHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENmbkRpc3RyaWJ1dGlvbikge1xuICAgICAgY29uc3QgZGlzdHJpYnV0aW9uQ29uZmlnID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShcbiAgICAgICAgbm9kZS5kaXN0cmlidXRpb25Db25maWdcbiAgICAgICk7XG4gICAgICBpZiAoZGlzdHJpYnV0aW9uQ29uZmlnLm9yaWdpbnMgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IG9yaWdpbnMgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKGRpc3RyaWJ1dGlvbkNvbmZpZy5vcmlnaW5zKTtcbiAgICAgICAgZm9yIChjb25zdCBvcmlnaW4gb2Ygb3JpZ2lucykge1xuICAgICAgICAgIGNvbnN0IHJlc29sdmVkT3JpZ2luID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShvcmlnaW4pO1xuICAgICAgICAgIGlmIChyZXNvbHZlZE9yaWdpbi5jdXN0b21PcmlnaW5Db25maWcgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBjdXN0b21PcmlnaW5Db25maWcgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKFxuICAgICAgICAgICAgICByZXNvbHZlZE9yaWdpbi5jdXN0b21PcmlnaW5Db25maWdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBvcmlnaW5Qcm90b2NvbFBvbGljeSA9IE5hZ1J1bGVzLnJlc29sdmVJZlByaW1pdGl2ZShcbiAgICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgICAgY3VzdG9tT3JpZ2luQ29uZmlnLm9yaWdpblByb3RvY29sUG9saWN5XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKG9yaWdpblByb3RvY29sUG9saWN5ICE9IE9yaWdpblByb3RvY29sUG9saWN5LkhUVFBTX09OTFkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PTl9DT01QTElBTlQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3VzdG9tT3JpZ2luQ29uZmlnLm9yaWdpblNzbFByb3RvY29scyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PTl9DT01QTElBTlQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBvdXRkYXRlZFZhbHVlcyA9IFtcbiAgICAgICAgICAgICAgU2VjdXJpdHlQb2xpY3lQcm90b2NvbC5TU0xfVjMsXG4gICAgICAgICAgICAgIFNlY3VyaXR5UG9saWN5UHJvdG9jb2wuVExTX1YxLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGNvbnN0IG9yaWdpblNzbFByb3RvY29scyA9IDxzdHJpbmdbXT4oXG4gICAgICAgICAgICAgIFN0YWNrLm9mKG5vZGUpLnJlc29sdmUoY3VzdG9tT3JpZ2luQ29uZmlnLm9yaWdpblNzbFByb3RvY29scylcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBsb3dlckNhc2VQcm90b2NvbHMgPSBvcmlnaW5Tc2xQcm90b2NvbHMubWFwKChpKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgb3V0ZGF0ZWQgb2Ygb3V0ZGF0ZWRWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgaWYgKGxvd2VyQ2FzZVByb3RvY29scy5pbmNsdWRlcyhvdXRkYXRlZC50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuQ09NUExJQU5UO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9UX0FQUExJQ0FCTEU7XG4gICAgfVxuICB9LFxuICAnbmFtZScsXG4gIHsgdmFsdWU6IHBhcnNlKF9fZmlsZW5hbWUpLm5hbWUgfVxuKTtcbiJdfQ==