import { CfnResource } from 'aws-cdk-lib';
import { NagRuleCompliance } from '../../nag-rules';
/**
 * Cognito user pools have password policies that minimally specify a password length of at least 8 characters, as well as requiring uppercase, numeric, and special characters
 * @param node the CfnResource to check
 */
declare const _default: (node: CfnResource) => NagRuleCompliance;
export default _default;
