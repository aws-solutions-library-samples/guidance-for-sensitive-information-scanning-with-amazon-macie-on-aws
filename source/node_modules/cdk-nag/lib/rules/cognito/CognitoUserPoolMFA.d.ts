import { CfnResource } from 'aws-cdk-lib';
import { NagRuleCompliance } from '../../nag-rules';
/**
 * Cognito user pools require MFA
 * @param node the CfnResource to check
 */
declare const _default: (node: CfnResource) => NagRuleCompliance;
export default _default;
