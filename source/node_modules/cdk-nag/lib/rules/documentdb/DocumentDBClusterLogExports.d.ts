import { CfnResource } from 'aws-cdk-lib';
import { NagRuleResult } from '../../nag-rules';
/**
 * Document DB clusters have authenticate, createIndex, and dropCollection Log Exports enabled
 * @param node the CfnResource to check
 */
declare const _default: (node: CfnResource) => NagRuleResult;
export default _default;
