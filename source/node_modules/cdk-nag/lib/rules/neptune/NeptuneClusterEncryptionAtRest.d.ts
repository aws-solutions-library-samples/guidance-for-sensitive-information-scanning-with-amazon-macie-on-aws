import { CfnResource } from 'aws-cdk-lib';
import { NagRuleCompliance } from '../../nag-rules';
/**
 * Neptune DB clusters have encryption at rest enabled
 * @param node the CfnResource to check
 */
declare const _default: (node: CfnResource) => NagRuleCompliance;
export default _default;
