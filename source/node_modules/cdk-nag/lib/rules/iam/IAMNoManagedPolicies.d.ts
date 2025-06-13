import { CfnResource } from 'aws-cdk-lib';
import { NagRuleResult } from '../../nag-rules';
/**
 * IAM users, roles, and groups do not use AWS managed policies
 * @param node the CfnResource to check
 */
declare const _default: (node: CfnResource) => NagRuleResult;
export default _default;
