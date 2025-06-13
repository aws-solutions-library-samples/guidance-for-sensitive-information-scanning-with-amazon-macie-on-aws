import { CfnResource } from 'aws-cdk-lib';
import { NagRuleCompliance } from '../../nag-rules';
/**
 * CloudFront Streaming distributions use an origin access identity for S3 origins
 * Only applying to CloudFront Streaming distributions because CloudFront distributions should use origin access control instead
 * @param node the CfnResource to check
 */
declare const _default: (node: CfnResource) => NagRuleCompliance;
export default _default;
