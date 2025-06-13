import { CfnResource } from 'aws-cdk-lib';
import { NagRuleResult } from '../../nag-rules';
/**
 * Non-Aurora RDS DB instances and Aurora clusters are configured to export all possible log types to CloudWatch
 * @param node the CfnResource to check
 */
declare const _default: (node: CfnResource) => NagRuleResult;
export default _default;
