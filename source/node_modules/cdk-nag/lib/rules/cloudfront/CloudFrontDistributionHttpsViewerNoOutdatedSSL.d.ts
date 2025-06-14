import { CfnResource } from 'aws-cdk-lib';
import { NagRuleCompliance } from '../../nag-rules';
/**
 *  CloudFront distributions use a security policy with minimum TLSv1.1 or TLSv1.2 and appropriate security ciphers for HTTPS viewer connections
 * @param node the CfnResource to check
 */
declare const _default: (node: CfnResource) => NagRuleCompliance;
export default _default;
