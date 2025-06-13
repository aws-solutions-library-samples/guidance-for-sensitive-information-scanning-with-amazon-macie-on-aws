"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
const path_1 = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_rds_1 = require("aws-cdk-lib/aws-rds");
const nag_rules_1 = require("../../nag-rules");
/**
 * RDS Aurora MySQL serverless clusters have audit, error, general, and slowquery Log Exports enabled
 * @param node the CfnResource to check
 */
exports.default = Object.defineProperty((node) => {
    if (node instanceof aws_rds_1.CfnDBCluster) {
        const engine = nag_rules_1.NagRules.resolveIfPrimitive(node, node.engine).toLowerCase();
        const engineMode = nag_rules_1.NagRules.resolveIfPrimitive(node, node.engineMode);
        if (engineMode != undefined &&
            engineMode.toLowerCase() == 'serverless' &&
            (engine.toLowerCase() == 'aurora' ||
                engine.toLowerCase() == 'aurora-mysql')) {
            const exports = aws_cdk_lib_1.Stack.of(node).resolve(node.enableCloudwatchLogsExports) ?? [];
            const needed = ['audit', 'error', 'general', 'slowquery'];
            const findings = needed
                .filter((log) => !exports.includes(log))
                .map((log) => `LogExport::${log}`);
            if (findings.length) {
                return findings;
            }
        }
        return nag_rules_1.NagRuleCompliance.COMPLIANT;
    }
    else {
        return nag_rules_1.NagRuleCompliance.NOT_APPLICABLE;
    }
}, 'name', { value: (0, path_1.parse)(__filename).name });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXVyb3JhTXlTUUxMb2dnaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3J1bGVzL3Jkcy9BdXJvcmFNeVNRTExvZ2dpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0VBR0U7QUFDRiwrQkFBNkI7QUFDN0IsNkNBQWlEO0FBQ2pELGlEQUFtRDtBQUNuRCwrQ0FLeUI7QUFFekI7OztHQUdHO0FBQ0gsa0JBQWUsTUFBTSxDQUFDLGNBQWMsQ0FDbEMsQ0FBQyxJQUFpQixFQUFpQixFQUFFO0lBQ25DLElBQUksSUFBSSxZQUFZLHNCQUFZLEVBQUUsQ0FBQztRQUNqQyxNQUFNLE1BQU0sR0FBRyxvQkFBUSxDQUFDLGtCQUFrQixDQUN4QyxJQUFJLEVBQ0osSUFBSSxDQUFDLE1BQU0sQ0FDWixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hCLE1BQU0sVUFBVSxHQUFHLG9CQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0RSxJQUNFLFVBQVUsSUFBSSxTQUFTO1lBQ3ZCLFVBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxZQUFZO1lBQ3hDLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLFFBQVE7Z0JBQy9CLE1BQU0sQ0FBQyxXQUFXLEVBQUUsSUFBSSxjQUFjLENBQUMsRUFDekMsQ0FBQztZQUNELE1BQU0sT0FBTyxHQUNYLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDakUsTUFBTSxNQUFNLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUMxRCxNQUFNLFFBQVEsR0FBb0IsTUFBTTtpQkFDckMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3ZDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNwQixPQUFPLFFBQVEsQ0FBQztZQUNsQixDQUFDO1FBQ0gsQ0FBQztRQUNELE9BQU8sNkJBQWlCLENBQUMsU0FBUyxDQUFDO0lBQ3JDLENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTyw2QkFBaUIsQ0FBQyxjQUFjLENBQUM7SUFDMUMsQ0FBQztBQUNILENBQUMsRUFDRCxNQUFNLEVBQ04sRUFBRSxLQUFLLEVBQUUsSUFBQSxZQUFLLEVBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQ2xDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuQ29weXJpZ2h0IEFtYXpvbi5jb20sIEluYy4gb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5TUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuKi9cbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDZm5SZXNvdXJjZSwgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDZm5EQkNsdXN0ZXIgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtcmRzJztcbmltcG9ydCB7XG4gIE5hZ1J1bGVDb21wbGlhbmNlLFxuICBOYWdSdWxlRmluZGluZ3MsXG4gIE5hZ1J1bGVSZXN1bHQsXG4gIE5hZ1J1bGVzLFxufSBmcm9tICcuLi8uLi9uYWctcnVsZXMnO1xuXG4vKipcbiAqIFJEUyBBdXJvcmEgTXlTUUwgc2VydmVybGVzcyBjbHVzdGVycyBoYXZlIGF1ZGl0LCBlcnJvciwgZ2VuZXJhbCwgYW5kIHNsb3dxdWVyeSBMb2cgRXhwb3J0cyBlbmFibGVkXG4gKiBAcGFyYW0gbm9kZSB0aGUgQ2ZuUmVzb3VyY2UgdG8gY2hlY2tcbiAqL1xuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmRlZmluZVByb3BlcnR5KFxuICAobm9kZTogQ2ZuUmVzb3VyY2UpOiBOYWdSdWxlUmVzdWx0ID0+IHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENmbkRCQ2x1c3Rlcikge1xuICAgICAgY29uc3QgZW5naW5lID0gTmFnUnVsZXMucmVzb2x2ZUlmUHJpbWl0aXZlKFxuICAgICAgICBub2RlLFxuICAgICAgICBub2RlLmVuZ2luZVxuICAgICAgKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgZW5naW5lTW9kZSA9IE5hZ1J1bGVzLnJlc29sdmVJZlByaW1pdGl2ZShub2RlLCBub2RlLmVuZ2luZU1vZGUpO1xuICAgICAgaWYgKFxuICAgICAgICBlbmdpbmVNb2RlICE9IHVuZGVmaW5lZCAmJlxuICAgICAgICBlbmdpbmVNb2RlLnRvTG93ZXJDYXNlKCkgPT0gJ3NlcnZlcmxlc3MnICYmXG4gICAgICAgIChlbmdpbmUudG9Mb3dlckNhc2UoKSA9PSAnYXVyb3JhJyB8fFxuICAgICAgICAgIGVuZ2luZS50b0xvd2VyQ2FzZSgpID09ICdhdXJvcmEtbXlzcWwnKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGV4cG9ydHMgPVxuICAgICAgICAgIFN0YWNrLm9mKG5vZGUpLnJlc29sdmUobm9kZS5lbmFibGVDbG91ZHdhdGNoTG9nc0V4cG9ydHMpID8/IFtdO1xuICAgICAgICBjb25zdCBuZWVkZWQgPSBbJ2F1ZGl0JywgJ2Vycm9yJywgJ2dlbmVyYWwnLCAnc2xvd3F1ZXJ5J107XG4gICAgICAgIGNvbnN0IGZpbmRpbmdzOiBOYWdSdWxlRmluZGluZ3MgPSBuZWVkZWRcbiAgICAgICAgICAuZmlsdGVyKChsb2cpID0+ICFleHBvcnRzLmluY2x1ZGVzKGxvZykpXG4gICAgICAgICAgLm1hcCgobG9nKSA9PiBgTG9nRXhwb3J0Ojoke2xvZ31gKTtcbiAgICAgICAgaWYgKGZpbmRpbmdzLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiBmaW5kaW5ncztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLkNPTVBMSUFOVDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE5hZ1J1bGVDb21wbGlhbmNlLk5PVF9BUFBMSUNBQkxFO1xuICAgIH1cbiAgfSxcbiAgJ25hbWUnLFxuICB7IHZhbHVlOiBwYXJzZShfX2ZpbGVuYW1lKS5uYW1lIH1cbik7XG4iXX0=