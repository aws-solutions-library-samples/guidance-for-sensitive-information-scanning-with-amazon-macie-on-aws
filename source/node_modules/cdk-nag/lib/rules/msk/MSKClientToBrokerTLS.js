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
 * MSK clusters only uses TLS communication between clients and brokers
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_msk_1.CfnCluster) {
        const encryptionInfo = aws_cdk_lib_1.Stack.of(node).resolve(node.encryptionInfo);
        if (encryptionInfo != undefined) {
            const encryptionInTransit = aws_cdk_lib_1.Stack.of(node).resolve(encryptionInfo.encryptionInTransit);
            if (encryptionInTransit != undefined) {
                const clientBroker = nag_rules_1.NagRules.resolveIfPrimitive(node, encryptionInTransit.clientBroker);
                if (clientBroker != undefined && clientBroker != 'TLS') {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTVNLQ2xpZW50VG9Ccm9rZXJUTFMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvbXNrL01TS0NsaWVudFRvQnJva2VyVExTLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7OztFQUdFO0FBQ0YsK0JBQTZCO0FBQzdCLDZDQUFpRDtBQUNqRCxpREFBaUQ7QUFDakQsK0NBQThEO0FBRTlEOzs7R0FHRztBQUNILGtCQUFlLE1BQU0sQ0FBQyxjQUFjLENBQ2xDLENBQUMsSUFBaUIsRUFBcUIsRUFBRTtJQUN2QyxJQUFJLElBQUksWUFBWSxvQkFBVSxFQUFFLENBQUM7UUFDL0IsTUFBTSxjQUFjLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNuRSxJQUFJLGNBQWMsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUNoQyxNQUFNLG1CQUFtQixHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FDaEQsY0FBYyxDQUFDLG1CQUFtQixDQUNuQyxDQUFDO1lBQ0YsSUFBSSxtQkFBbUIsSUFBSSxTQUFTLEVBQUUsQ0FBQztnQkFDckMsTUFBTSxZQUFZLEdBQUcsb0JBQVEsQ0FBQyxrQkFBa0IsQ0FDOUMsSUFBSSxFQUNKLG1CQUFtQixDQUFDLFlBQVksQ0FDakMsQ0FBQztnQkFDRixJQUFJLFlBQVksSUFBSSxTQUFTLElBQUksWUFBWSxJQUFJLEtBQUssRUFBRSxDQUFDO29CQUN2RCxPQUFPLDZCQUFpQixDQUFDLGFBQWEsQ0FBQztnQkFDekMsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyw2QkFBaUIsQ0FBQyxTQUFTLENBQUM7SUFDckMsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLDZCQUFpQixDQUFDLGNBQWMsQ0FBQztJQUMxQyxDQUFDO0FBQ0gsQ0FBQyxFQUNELE1BQU0sRUFDTixFQUFFLEtBQUssRUFBRSxJQUFBLFlBQUssRUFBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FDbEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5Db3B5cmlnaHQgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4qL1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IENmblJlc291cmNlLCBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENmbkNsdXN0ZXIgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbXNrJztcbmltcG9ydCB7IE5hZ1J1bGVDb21wbGlhbmNlLCBOYWdSdWxlcyB9IGZyb20gJy4uLy4uL25hZy1ydWxlcyc7XG5cbi8qKlxuICogTVNLIGNsdXN0ZXJzIG9ubHkgdXNlcyBUTFMgY29tbXVuaWNhdGlvbiBiZXR3ZWVuIGNsaWVudHMgYW5kIGJyb2tlcnNcbiAqIEBwYXJhbSBub2RlIHRoZSBDZm5SZXNvdXJjZSB0byBjaGVja1xuICovXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIChub2RlOiBDZm5SZXNvdXJjZSk6IE5hZ1J1bGVDb21wbGlhbmNlID0+IHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENmbkNsdXN0ZXIpIHtcbiAgICAgIGNvbnN0IGVuY3J5cHRpb25JbmZvID0gU3RhY2sub2Yobm9kZSkucmVzb2x2ZShub2RlLmVuY3J5cHRpb25JbmZvKTtcbiAgICAgIGlmIChlbmNyeXB0aW9uSW5mbyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgZW5jcnlwdGlvbkluVHJhbnNpdCA9IFN0YWNrLm9mKG5vZGUpLnJlc29sdmUoXG4gICAgICAgICAgZW5jcnlwdGlvbkluZm8uZW5jcnlwdGlvbkluVHJhbnNpdFxuICAgICAgICApO1xuICAgICAgICBpZiAoZW5jcnlwdGlvbkluVHJhbnNpdCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zdCBjbGllbnRCcm9rZXIgPSBOYWdSdWxlcy5yZXNvbHZlSWZQcmltaXRpdmUoXG4gICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgZW5jcnlwdGlvbkluVHJhbnNpdC5jbGllbnRCcm9rZXJcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChjbGllbnRCcm9rZXIgIT0gdW5kZWZpbmVkICYmIGNsaWVudEJyb2tlciAhPSAnVExTJykge1xuICAgICAgICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PTl9DT01QTElBTlQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuQ09NUExJQU5UO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9UX0FQUExJQ0FCTEU7XG4gICAgfVxuICB9LFxuICAnbmFtZScsXG4gIHsgdmFsdWU6IHBhcnNlKF9fZmlsZW5hbWUpLm5hbWUgfVxuKTtcbiJdfQ==