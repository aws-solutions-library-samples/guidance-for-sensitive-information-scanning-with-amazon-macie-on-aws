import { CfnResource } from 'aws-cdk-lib';
import { NagRuleCompliance } from '../../nag-rules';
/**
 * GraphQL APIs have request leveling logging enabled
 * @param node the CfnResource to check
 */
declare const _default: (node: CfnResource) => NagRuleCompliance;
export default _default;
