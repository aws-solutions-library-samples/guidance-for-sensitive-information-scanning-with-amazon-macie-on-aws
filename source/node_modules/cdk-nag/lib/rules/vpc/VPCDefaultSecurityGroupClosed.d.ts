import { CfnResource } from 'aws-cdk-lib';
import { NagRuleCompliance } from '../../nag-rules';
/**
 * VPCs have their default security group closed
 * VPCs created via CloudFormation will not have their default security group closed.
 * The L2 VPC Construct provides a way to remmediate this via a custom resource.
 * @see https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html#DefaultSecurityGroup
 * @see https://github.com/aws/aws-cdk/pull/25297
 * @param node the CfnResource to check
 */
declare const _default: (node: CfnResource) => NagRuleCompliance;
export default _default;
