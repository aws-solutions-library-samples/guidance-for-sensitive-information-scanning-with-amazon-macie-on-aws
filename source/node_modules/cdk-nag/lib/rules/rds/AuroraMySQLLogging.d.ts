import { CfnResource } from 'aws-cdk-lib';
import { NagRuleResult } from '../../nag-rules';
/**
 * RDS Aurora MySQL serverless clusters have audit, error, general, and slowquery Log Exports enabled
 * @param node the CfnResource to check
 */
declare const _default: (node: CfnResource) => NagRuleResult;
export default _default;
