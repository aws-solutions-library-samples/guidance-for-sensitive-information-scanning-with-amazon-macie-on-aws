"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const nag_rules_1 = require("../../nag-rules");
/**
 * Non-container Lambda functions are configured to use the latest runtime version
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_lambda_1.CfnFunction) {
        const runtime = nag_rules_1.NagRules.resolveIfPrimitive(node, node.runtime);
        if (!runtime) {
            // Runtime is not required for container lambdas, in this case, not applicable
            return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
        }
        const exp = /^([a-z]+)(\d+(\.?\d+|\.x)?)?.*$/;
        const m = runtime.match(exp);
        if (!m) {
            throw Error(`The Lambda runtime "${runtime}" does not match the expected regular expression, therefore the rule could not be validated.`);
        }
        const runtimeFamily = m[1];
        if (runtimeFamily === 'provided') {
            return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
        }
        // We'll pull the versions which CDK knows about to ensure we don't throw complaints
        // about a runtime version which isn't available for use in the users CDK library.
        const familyVersions = aws_lambda_1.Runtime.ALL.filter((rt) => rt.toString().indexOf(runtimeFamily) === 0)
            .map((rt) => {
            let match = rt.toString().match(exp);
            return {
                value: rt.toString(),
                family: match[1],
                version: match[2] ?? '0',
            };
        })
            .sort((a, b) => {
            return a.version.localeCompare(b.version, undefined, {
                numeric: true,
                sensitivity: 'base',
            });
        });
        if (familyVersions.length === 0) {
            throw Error(`Unable to find families for Lambda runtime "${runtime}", therefore the rule could not be validated.`);
        }
        const latestFamilyVersion = familyVersions.pop().value;
        if (runtime !== latestFamilyVersion.toString()) {
            return nag_rules_1.NagRuleCompliance.NON_COMPLIANT;
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFtYmRhTGF0ZXN0VmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9sYW1iZGEvTGFtYmRhTGF0ZXN0VmVyc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7RUFHRTtBQUNGLCtCQUE2QjtBQUU3Qix1REFBOEQ7QUFDOUQsK0NBQThEO0FBRTlEOzs7R0FHRztBQUNILGtCQUFlLE1BQU0sQ0FBQyxjQUFjLENBQ2xDLENBQUMsSUFBaUIsRUFBcUIsRUFBRTtJQUN2QyxJQUFJLElBQUksWUFBWSx3QkFBVyxFQUFFLENBQUM7UUFDaEMsTUFBTSxPQUFPLEdBQUcsb0JBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNiLDhFQUE4RTtZQUM5RSxPQUFPLDZCQUFpQixDQUFDLGNBQWMsQ0FBQztRQUMxQyxDQUFDO1FBRUQsTUFBTSxHQUFHLEdBQUcsaUNBQWlDLENBQUM7UUFDOUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU3QixJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDUCxNQUFNLEtBQUssQ0FDVCx1QkFBdUIsT0FBTyw4RkFBOEYsQ0FDN0gsQ0FBQztRQUNKLENBQUM7UUFFRCxNQUFNLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBSSxhQUFhLEtBQUssVUFBVSxFQUFFLENBQUM7WUFDakMsT0FBTyw2QkFBaUIsQ0FBQyxjQUFjLENBQUM7UUFDMUMsQ0FBQztRQUVELG9GQUFvRjtRQUNwRixrRkFBa0Y7UUFDbEYsTUFBTSxjQUFjLEdBQUcsb0JBQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUN2QyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQ25EO2FBQ0UsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7WUFDVixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JDLE9BQU87Z0JBQ0wsS0FBSyxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3BCLE1BQU0sRUFBRSxLQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsS0FBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUc7YUFDMUIsQ0FBQztRQUNKLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNiLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUU7Z0JBQ25ELE9BQU8sRUFBRSxJQUFJO2dCQUNiLFdBQVcsRUFBRSxNQUFNO2FBQ3BCLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUwsSUFBSSxjQUFjLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ2hDLE1BQU0sS0FBSyxDQUNULCtDQUErQyxPQUFPLCtDQUErQyxDQUN0RyxDQUFDO1FBQ0osQ0FBQztRQUVELE1BQU0sbUJBQW1CLEdBQUcsY0FBYyxDQUFDLEdBQUcsRUFBRyxDQUFDLEtBQUssQ0FBQztRQUV4RCxJQUFJLE9BQU8sS0FBSyxtQkFBb0IsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO1lBQ2hELE9BQU8sNkJBQWlCLENBQUMsYUFBYSxDQUFDO1FBQ3pDLENBQUM7UUFFRCxPQUFPLDZCQUFpQixDQUFDLFNBQVMsQ0FBQztJQUNyQyxDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sNkJBQWlCLENBQUMsY0FBYyxDQUFDO0lBQzFDLENBQUM7QUFDSCxDQUFDLEVBQ0QsTUFBTSxFQUNOLEVBQUUsS0FBSyxFQUFFLElBQUEsWUFBSyxFQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUNsQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbkNvcHlyaWdodCBBbWF6b24uY29tLCBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiovXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ2ZuUmVzb3VyY2UgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDZm5GdW5jdGlvbiwgUnVudGltZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnO1xuaW1wb3J0IHsgTmFnUnVsZUNvbXBsaWFuY2UsIE5hZ1J1bGVzIH0gZnJvbSAnLi4vLi4vbmFnLXJ1bGVzJztcblxuLyoqXG4gKiBOb24tY29udGFpbmVyIExhbWJkYSBmdW5jdGlvbnMgYXJlIGNvbmZpZ3VyZWQgdG8gdXNlIHRoZSBsYXRlc3QgcnVudGltZSB2ZXJzaW9uXG4gKiBAcGFyYW0gbm9kZSB0aGUgQ2ZuUmVzb3VyY2UgdG8gY2hlY2tcbiAqL1xuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmRlZmluZVByb3BlcnR5KFxuICAobm9kZTogQ2ZuUmVzb3VyY2UpOiBOYWdSdWxlQ29tcGxpYW5jZSA9PiB7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBDZm5GdW5jdGlvbikge1xuICAgICAgY29uc3QgcnVudGltZSA9IE5hZ1J1bGVzLnJlc29sdmVJZlByaW1pdGl2ZShub2RlLCBub2RlLnJ1bnRpbWUpO1xuICAgICAgaWYgKCFydW50aW1lKSB7XG4gICAgICAgIC8vIFJ1bnRpbWUgaXMgbm90IHJlcXVpcmVkIGZvciBjb250YWluZXIgbGFtYmRhcywgaW4gdGhpcyBjYXNlLCBub3QgYXBwbGljYWJsZVxuICAgICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9UX0FQUExJQ0FCTEU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGV4cCA9IC9eKFthLXpdKykoXFxkKyhcXC4/XFxkK3xcXC54KT8pPy4qJC87XG4gICAgICBjb25zdCBtID0gcnVudGltZS5tYXRjaChleHApO1xuXG4gICAgICBpZiAoIW0pIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgYFRoZSBMYW1iZGEgcnVudGltZSBcIiR7cnVudGltZX1cIiBkb2VzIG5vdCBtYXRjaCB0aGUgZXhwZWN0ZWQgcmVndWxhciBleHByZXNzaW9uLCB0aGVyZWZvcmUgdGhlIHJ1bGUgY291bGQgbm90IGJlIHZhbGlkYXRlZC5gXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJ1bnRpbWVGYW1pbHkgPSBtWzFdO1xuICAgICAgaWYgKHJ1bnRpbWVGYW1pbHkgPT09ICdwcm92aWRlZCcpIHtcbiAgICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PVF9BUFBMSUNBQkxFO1xuICAgICAgfVxuXG4gICAgICAvLyBXZSdsbCBwdWxsIHRoZSB2ZXJzaW9ucyB3aGljaCBDREsga25vd3MgYWJvdXQgdG8gZW5zdXJlIHdlIGRvbid0IHRocm93IGNvbXBsYWludHNcbiAgICAgIC8vIGFib3V0IGEgcnVudGltZSB2ZXJzaW9uIHdoaWNoIGlzbid0IGF2YWlsYWJsZSBmb3IgdXNlIGluIHRoZSB1c2VycyBDREsgbGlicmFyeS5cbiAgICAgIGNvbnN0IGZhbWlseVZlcnNpb25zID0gUnVudGltZS5BTEwuZmlsdGVyKFxuICAgICAgICAocnQpID0+IHJ0LnRvU3RyaW5nKCkuaW5kZXhPZihydW50aW1lRmFtaWx5KSA9PT0gMFxuICAgICAgKVxuICAgICAgICAubWFwKChydCkgPT4ge1xuICAgICAgICAgIGxldCBtYXRjaCA9IHJ0LnRvU3RyaW5nKCkubWF0Y2goZXhwKTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJ0LnRvU3RyaW5nKCksXG4gICAgICAgICAgICBmYW1pbHk6IG1hdGNoIVsxXSxcbiAgICAgICAgICAgIHZlcnNpb246IG1hdGNoIVsyXSA/PyAnMCcsXG4gICAgICAgICAgfTtcbiAgICAgICAgfSlcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICByZXR1cm4gYS52ZXJzaW9uLmxvY2FsZUNvbXBhcmUoYi52ZXJzaW9uLCB1bmRlZmluZWQsIHtcbiAgICAgICAgICAgIG51bWVyaWM6IHRydWUsXG4gICAgICAgICAgICBzZW5zaXRpdml0eTogJ2Jhc2UnLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgaWYgKGZhbWlseVZlcnNpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICBgVW5hYmxlIHRvIGZpbmQgZmFtaWxpZXMgZm9yIExhbWJkYSBydW50aW1lIFwiJHtydW50aW1lfVwiLCB0aGVyZWZvcmUgdGhlIHJ1bGUgY291bGQgbm90IGJlIHZhbGlkYXRlZC5gXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxhdGVzdEZhbWlseVZlcnNpb24gPSBmYW1pbHlWZXJzaW9ucy5wb3AoKSEudmFsdWU7XG5cbiAgICAgIGlmIChydW50aW1lICE9PSBsYXRlc3RGYW1pbHlWZXJzaW9uIS50b1N0cmluZygpKSB7XG4gICAgICAgIHJldHVybiBOYWdSdWxlQ29tcGxpYW5jZS5OT05fQ09NUExJQU5UO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuQ09NUExJQU5UO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTmFnUnVsZUNvbXBsaWFuY2UuTk9UX0FQUExJQ0FCTEU7XG4gICAgfVxuICB9LFxuICAnbmFtZScsXG4gIHsgdmFsdWU6IHBhcnNlKF9fZmlsZW5hbWUpLm5hbWUgfVxuKTtcbiJdfQ==