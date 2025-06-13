import { CfnResource } from 'aws-cdk-lib';
import { NagRuleCompliance } from '../../nag-rules';
/**
 * IAM policies do not grant full access, meaning the policy allows a principal to perform all actions on individual resources
 * @param node the CfnResource to check
 */
declare const _default: (node: CfnResource) => NagRuleCompliance;
export default _default;
