import { CfnResource } from 'aws-cdk-lib';
import { NagRuleCompliance } from '../../nag-rules';
/**
 * EC2 instances have all common TCP ports restricted for ingress IPv4 traffic
 * https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/default-custom-security-groups.html
 * @param node the CfnResource to check
 */
declare const _default: (node: CfnResource) => NagRuleCompliance;
export default _default;
