"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_msk_1 = require("aws-cdk-lib/aws-msk");
const nag_rules_1 = require("../../nag-rules");
/**
 * MSK clusters use TLS communication between brokers
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_msk_1.CfnCluster) {
        const encryptionInfo = aws_cdk_lib_1.Stack.of(node).resolve(node.encryptionInfo);
        if (encryptionInfo != undefined) {
            const encryptionInTransit = aws_cdk_lib_1.Stack.of(node).resolve(encryptionInfo.encryptionInTransit);
            if (encryptionInTransit != undefined) {
                const inCluster = nag_rules_1.NagRules.resolveIfPrimitive(node, encryptionInTransit.inCluster);
                if (inCluster === false) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTVNLQnJva2VyVG9Ccm9rZXJUTFMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvbXNrL01TS0Jyb2tlclRvQnJva2VyVExTLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7OztFQUdFO0FBQ0YsK0JBQTZCO0FBQzdCLDZDQUFpRDtBQUNqRCxpREFBaUQ7QUFDakQsK0NBQThEO0FBRTlEOzs7R0FHRztBQUNILGtCQUFlLE1BQU0sQ0FBQyxjQUFjLENBQ2xDLENBQUMsSUFBaUIsRUFBcUIsRUFBRTtJQUN2QyxJQUFJLElBQUksWUFBWSxvQkFBVSxFQUFFLENBQUM7UUFDL0IsTUFBTSxjQUFjLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNuRSxJQUFJLGNBQWMsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUNoQyxNQUFNLG1CQUFtQixHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FDaEQsY0FBYyxDQUFDLG1CQUFtQixDQUNuQyxDQUFDO1lBQ0YsSUFBSSxtQkFBbUIsSUFBSSxTQUFTLEVBQUUsQ0FBQztnQkFDckMsTUFBTSxTQUFTLEdBQUcsb0JBQVEsQ0FBQyxrQkFBa0IsQ0FDM0MsSUFBSSxFQUNKLG1CQUFtQixDQUFDLFNBQVMsQ0FDOUIsQ0FBQztnQkFDRixJQUFJLFNBQVMsS0FBSyxLQUFLLEVBQUUsQ0FBQztvQkFDeEIsT0FBTyw2QkFBaUIsQ0FBQyxhQUFhLENBQUM7Z0JBQ3pDLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUNELE9BQU8sNkJBQWlCLENBQUMsU0FBUyxDQUFDO0lBQ3JDLENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTyw2QkFBaUIsQ0FBQyxjQUFjLENBQUM7SUFDMUMsQ0FBQztBQUNILENBQUMsRUFDRCxNQUFNLEVBQ04sRUFBRSxLQUFLLEVBQUUsSUFBQSxZQUFLLEVBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQ2xDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuQ29weXJpZ2h0IEFtYXpvbi5jb20sIEluYy4gb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5TUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuKi9cbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDZm5SZXNvdXJjZSwgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDZm5DbHVzdGVyIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLW1zayc7XG5pbXBvcnQgeyBOYWdSdWxlQ29tcGxpYW5jZSwgTmFnUnVsZXMgfSBmcm9tICcuLi8uLi9uYWctcnVsZXMnO1xuXG4vKipcbiAqIE1TSyBjbHVzdGVycyB1c2UgVExTIGNvbW11bmljYXRpb24gYmV0d2VlbiBicm9rZXJzXG4gKiBAcGFyYW0gbm9kZSB0aGUgQ2ZuUmVzb3VyY2UgdG8gY2hlY2tcbiAqL1xuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmRlZmluZVByb3BlcnR5KFxuICAobm9kZTogQ2ZuUmVzb3VyY2UpOiBOYWdSdWxlQ29tcGxpYW5jZSA9PiB7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBDZm5DbHVzdGVyKSB7XG4gICAgICBjb25zdCBlbmNyeXB0aW9uSW5mbyA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUobm9kZS5lbmNyeXB0aW9uSW5mbyk7XG4gICAgICBpZiAoZW5jcnlwdGlvbkluZm8gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGVuY3J5cHRpb25JblRyYW5zaXQgPSBTdGFjay5vZihub2RlKS5yZXNvbHZlKFxuICAgICAgICAgIGVuY3J5cHRpb25JbmZvLmVuY3J5cHRpb25JblRyYW5zaXRcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGVuY3J5cHRpb25JblRyYW5zaXQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc3QgaW5DbHVzdGVyID0gTmFnUnVsZXMucmVzb2x2ZUlmUHJpbWl0aXZlKFxuICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgIGVuY3J5cHRpb25JblRyYW5zaXQuaW5DbHVzdGVyXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoaW5DbHVzdGVyID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PTl9DT01QTElBTlQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuQ09NUExJQU5UO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9UX0FQUExJQ0FCTEU7XG4gICAgfVxuICB9LFxuICAnbmFtZScsXG4gIHsgdmFsdWU6IHBhcnNlKF9fZmlsZW5hbWUpLm5hbWUgfVxuKTtcbiJdfQ==