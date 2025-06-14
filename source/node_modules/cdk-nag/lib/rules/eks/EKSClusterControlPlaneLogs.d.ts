import { CfnResource } from 'aws-cdk-lib';
import { NagRuleResult } from '../../nag-rules';
/**
 * EKS Clusters publish 'api', 'audit', 'authenticator, 'controllerManager', and 'scheduler' control plane logs
 * @param node the CfnResource to check
 */
declare const _default: (node: CfnResource) => NagRuleResult;
export default _default;
