"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const nag_rules_1 = require("../../nag-rules");
/**
 * Lambda function permissions do not grant public access
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_lambda_1.CfnPermission) {
        if (aws_cdk_lib_1.Stack.of(node).resolve(node.principal) === '*' &&
            node.principalOrgId === undefined &&
            node.sourceAccount === undefined &&
            node.sourceArn === undefined) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFtYmRhRnVuY3Rpb25QdWJsaWNBY2Nlc3NQcm9oaWJpdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3J1bGVzL2xhbWJkYS9MYW1iZGFGdW5jdGlvblB1YmxpY0FjY2Vzc1Byb2hpYml0ZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0VBR0U7QUFDRiwrQkFBNkI7QUFDN0IsNkNBQWlEO0FBQ2pELHVEQUF1RDtBQUN2RCwrQ0FBb0Q7QUFFcEQ7OztHQUdHO0FBQ0gsa0JBQWUsTUFBTSxDQUFDLGNBQWMsQ0FDbEMsQ0FBQyxJQUFpQixFQUFxQixFQUFFO0lBQ3ZDLElBQUksSUFBSSxZQUFZLDBCQUFhLEVBQUUsQ0FBQztRQUNsQyxJQUNFLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRztZQUM5QyxJQUFJLENBQUMsY0FBYyxLQUFLLFNBQVM7WUFDakMsSUFBSSxDQUFDLGFBQWEsS0FBSyxTQUFTO1lBQ2hDLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUM1QixDQUFDO1lBQ0QsT0FBTyw2QkFBaUIsQ0FBQyxhQUFhLENBQUM7UUFDekMsQ0FBQztRQUNELE9BQU8sNkJBQWlCLENBQUMsU0FBUyxDQUFDO0lBQ3JDLENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTyw2QkFBaUIsQ0FBQyxjQUFjLENBQUM7SUFDMUMsQ0FBQztBQUNILENBQUMsRUFDRCxNQUFNLEVBQ04sRUFBRSxLQUFLLEVBQUUsSUFBQSxZQUFLLEVBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQ2xDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuQ29weXJpZ2h0IEFtYXpvbi5jb20sIEluYy4gb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5TUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuKi9cbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDZm5SZXNvdXJjZSwgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDZm5QZXJtaXNzaW9uIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSc7XG5pbXBvcnQgeyBOYWdSdWxlQ29tcGxpYW5jZSB9IGZyb20gJy4uLy4uL25hZy1ydWxlcyc7XG5cbi8qKlxuICogTGFtYmRhIGZ1bmN0aW9uIHBlcm1pc3Npb25zIGRvIG5vdCBncmFudCBwdWJsaWMgYWNjZXNzXG4gKiBAcGFyYW0gbm9kZSB0aGUgQ2ZuUmVzb3VyY2UgdG8gY2hlY2tcbiAqL1xuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmRlZmluZVByb3BlcnR5KFxuICAobm9kZTogQ2ZuUmVzb3VyY2UpOiBOYWdSdWxlQ29tcGxpYW5jZSA9PiB7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBDZm5QZXJtaXNzaW9uKSB7XG4gICAgICBpZiAoXG4gICAgICAgIFN0YWNrLm9mKG5vZGUpLnJlc29sdmUobm9kZS5wcmluY2lwYWwpID09PSAnKicgJiZcbiAgICAgICAgbm9kZS5wcmluY2lwYWxPcmdJZCA9PT0gdW5kZWZpbmVkICYmXG4gICAgICAgIG5vZGUuc291cmNlQWNjb3VudCA9PT0gdW5kZWZpbmVkICYmXG4gICAgICAgIG5vZGUuc291cmNlQXJuID09PSB1bmRlZmluZWRcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9OX0NPTVBMSUFOVDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5DT01QTElBTlQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT1RfQVBQTElDQUJMRTtcbiAgICB9XG4gIH0sXG4gICduYW1lJyxcbiAgeyB2YWx1ZTogcGFyc2UoX19maWxlbmFtZSkubmFtZSB9XG4pO1xuIl19