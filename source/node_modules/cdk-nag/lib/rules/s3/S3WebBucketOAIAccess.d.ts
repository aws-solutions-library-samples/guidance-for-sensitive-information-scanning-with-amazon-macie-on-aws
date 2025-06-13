import { CfnResource } from 'aws-cdk-lib';
import { NagRuleCompliance } from '../../nag-rules';
/**
 * S3 static website buckets do not have an open world bucket policy and use CloudFront Origin Access Identities in the bucket policy for limited getObject and/or putObject permissions
 * @param node the CfnResource to check
 */
declare const _default: (node: CfnResource) => NagRuleCompliance;
export default _default;
