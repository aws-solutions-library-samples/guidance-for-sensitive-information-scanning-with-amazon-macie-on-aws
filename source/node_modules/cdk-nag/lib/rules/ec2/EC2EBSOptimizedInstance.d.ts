import { CfnResource } from 'aws-cdk-lib';
import { NagRuleCompliance } from '../../nag-rules';
/**
 * EC2 instance types that support EBS optimization and are not EBS optimized by default have EBS optimization enabled
 * https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-optimized.html#previous
 *  @param node the CfnResource to check
 */
declare const _default: (node: CfnResource) => NagRuleCompliance;
export default _default;
