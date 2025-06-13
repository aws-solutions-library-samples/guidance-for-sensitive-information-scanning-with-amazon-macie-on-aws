/*
 * Generated type guards for "macie-job-request.ts".
 * WARNING: Do not manually change this file.
 */
import { MacieJobRequest, MacieJobSuccessResponse, MacieJobErrorResponse, MacieJobResponse } from "./macie-job-request";

export function isMacieJobRequest(obj: unknown): obj is MacieJobRequest {
    const typedObj = obj as MacieJobRequest
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        (typeof typedObj["allowListIds"] === "undefined" ||
            Array.isArray(typedObj["allowListIds"]) &&
            typedObj["allowListIds"].every((e: any) =>
                typeof e === "string"
            )) &&
        (typeof typedObj["clientToken"] === "undefined" ||
            typeof typedObj["clientToken"] === "string") &&
        (typeof typedObj["customDataIdentifierIds"] === "undefined" ||
            Array.isArray(typedObj["customDataIdentifierIds"]) &&
            typedObj["customDataIdentifierIds"].every((e: any) =>
                typeof e === "string"
            )) &&
        (typeof typedObj["description"] === "undefined" ||
            typeof typedObj["description"] === "string") &&
        (typeof typedObj["initialRun"] === "undefined" ||
            typedObj["initialRun"] === false ||
            typedObj["initialRun"] === true) &&
        (typeof typedObj["jobType"] === "undefined" ||
            typedObj["jobType"] === "ONE_TIME" ||
            typedObj["jobType"] === "SCHEDULED") &&
        (typeof typedObj["managedDataIdentifierIds"] === "undefined" ||
            Array.isArray(typedObj["managedDataIdentifierIds"]) &&
            typedObj["managedDataIdentifierIds"].every((e: any) =>
                typeof e === "string"
            )) &&
        (typeof typedObj["managedDataIdentifierSelector"] === "undefined" ||
            typedObj["managedDataIdentifierSelector"] === "ALL" ||
            typedObj["managedDataIdentifierSelector"] === "EXCLUDE" ||
            typedObj["managedDataIdentifierSelector"] === "INCLUDE" ||
            typedObj["managedDataIdentifierSelector"] === "NONE" ||
            typedObj["managedDataIdentifierSelector"] === "RECOMMENDED") &&
        (typeof typedObj["name"] === "undefined" ||
            typeof typedObj["name"] === "string") &&
        (typeof typedObj["s3JobDefinition"] === "undefined" ||
            (typedObj["s3JobDefinition"] !== null &&
                typeof typedObj["s3JobDefinition"] === "object" ||
                typeof typedObj["s3JobDefinition"] === "function") &&
            (typeof typedObj["s3JobDefinition"]["bucketCriteria"] === "undefined" ||
                (typedObj["s3JobDefinition"]["bucketCriteria"] !== null &&
                    typeof typedObj["s3JobDefinition"]["bucketCriteria"] === "object" ||
                    typeof typedObj["s3JobDefinition"]["bucketCriteria"] === "function") &&
                (typeof typedObj["s3JobDefinition"]["bucketCriteria"]["excludes"] === "undefined" ||
                    (typedObj["s3JobDefinition"]["bucketCriteria"]["excludes"] !== null &&
                        typeof typedObj["s3JobDefinition"]["bucketCriteria"]["excludes"] === "object" ||
                        typeof typedObj["s3JobDefinition"]["bucketCriteria"]["excludes"] === "function") &&
                    (typeof typedObj["s3JobDefinition"]["bucketCriteria"]["excludes"]["and"] === "undefined" ||
                        Array.isArray(typedObj["s3JobDefinition"]["bucketCriteria"]["excludes"]["and"]) &&
                        typedObj["s3JobDefinition"]["bucketCriteria"]["excludes"]["and"].every((e: any) =>
                            (e !== null &&
                                typeof e === "object" ||
                                typeof e === "function") &&
                            (typeof e["simpleCriterion"] === "undefined" ||
                                (e["simpleCriterion"] !== null &&
                                    typeof e["simpleCriterion"] === "object" ||
                                    typeof e["simpleCriterion"] === "function") &&
                                (typeof e["simpleCriterion"]["comparator"] === "undefined" ||
                                    e["simpleCriterion"]["comparator"] === "CONTAINS" ||
                                    e["simpleCriterion"]["comparator"] === "EQ" ||
                                    e["simpleCriterion"]["comparator"] === "GT" ||
                                    e["simpleCriterion"]["comparator"] === "GTE" ||
                                    e["simpleCriterion"]["comparator"] === "LT" ||
                                    e["simpleCriterion"]["comparator"] === "LTE" ||
                                    e["simpleCriterion"]["comparator"] === "NE" ||
                                    e["simpleCriterion"]["comparator"] === "STARTS_WITH") &&
                                (typeof e["simpleCriterion"]["key"] === "undefined" ||
                                    e["simpleCriterion"]["key"] === "ACCOUNT_ID" ||
                                    e["simpleCriterion"]["key"] === "S3_BUCKET_EFFECTIVE_PERMISSION" ||
                                    e["simpleCriterion"]["key"] === "S3_BUCKET_NAME" ||
                                    e["simpleCriterion"]["key"] === "S3_BUCKET_SHARED_ACCESS") &&
                                (typeof e["simpleCriterion"]["values"] === "undefined" ||
                                    Array.isArray(e["simpleCriterion"]["values"]) &&
                                    e["simpleCriterion"]["values"].every((e: any) =>
                                        typeof e === "string"
                                    ))) &&
                            (typeof e["tagCriterion"] === "undefined" ||
                                (e["tagCriterion"] !== null &&
                                    typeof e["tagCriterion"] === "object" ||
                                    typeof e["tagCriterion"] === "function") &&
                                (typeof e["tagCriterion"]["comparator"] === "undefined" ||
                                    e["tagCriterion"]["comparator"] === "CONTAINS" ||
                                    e["tagCriterion"]["comparator"] === "EQ" ||
                                    e["tagCriterion"]["comparator"] === "GT" ||
                                    e["tagCriterion"]["comparator"] === "GTE" ||
                                    e["tagCriterion"]["comparator"] === "LT" ||
                                    e["tagCriterion"]["comparator"] === "LTE" ||
                                    e["tagCriterion"]["comparator"] === "NE" ||
                                    e["tagCriterion"]["comparator"] === "STARTS_WITH") &&
                                (typeof e["tagCriterion"]["tagValues"] === "undefined" ||
                                    Array.isArray(e["tagCriterion"]["tagValues"]) &&
                                    e["tagCriterion"]["tagValues"].every((e: any) =>
                                        (e !== null &&
                                            typeof e === "object" ||
                                            typeof e === "function") &&
                                        (typeof e["key"] === "undefined" ||
                                            typeof e["key"] === "string") &&
                                        (typeof e["value"] === "undefined" ||
                                            typeof e["value"] === "string")
                                    )))
                        ))) &&
                (typeof typedObj["s3JobDefinition"]["bucketCriteria"]["includes"] === "undefined" ||
                    (typedObj["s3JobDefinition"]["bucketCriteria"]["includes"] !== null &&
                        typeof typedObj["s3JobDefinition"]["bucketCriteria"]["includes"] === "object" ||
                        typeof typedObj["s3JobDefinition"]["bucketCriteria"]["includes"] === "function") &&
                    (typeof typedObj["s3JobDefinition"]["bucketCriteria"]["includes"]["and"] === "undefined" ||
                        Array.isArray(typedObj["s3JobDefinition"]["bucketCriteria"]["includes"]["and"]) &&
                        typedObj["s3JobDefinition"]["bucketCriteria"]["includes"]["and"].every((e: any) =>
                            (e !== null &&
                                typeof e === "object" ||
                                typeof e === "function") &&
                            (typeof e["simpleCriterion"] === "undefined" ||
                                (e["simpleCriterion"] !== null &&
                                    typeof e["simpleCriterion"] === "object" ||
                                    typeof e["simpleCriterion"] === "function") &&
                                (typeof e["simpleCriterion"]["comparator"] === "undefined" ||
                                    e["simpleCriterion"]["comparator"] === "CONTAINS" ||
                                    e["simpleCriterion"]["comparator"] === "EQ" ||
                                    e["simpleCriterion"]["comparator"] === "GT" ||
                                    e["simpleCriterion"]["comparator"] === "GTE" ||
                                    e["simpleCriterion"]["comparator"] === "LT" ||
                                    e["simpleCriterion"]["comparator"] === "LTE" ||
                                    e["simpleCriterion"]["comparator"] === "NE" ||
                                    e["simpleCriterion"]["comparator"] === "STARTS_WITH") &&
                                (typeof e["simpleCriterion"]["key"] === "undefined" ||
                                    e["simpleCriterion"]["key"] === "ACCOUNT_ID" ||
                                    e["simpleCriterion"]["key"] === "S3_BUCKET_EFFECTIVE_PERMISSION" ||
                                    e["simpleCriterion"]["key"] === "S3_BUCKET_NAME" ||
                                    e["simpleCriterion"]["key"] === "S3_BUCKET_SHARED_ACCESS") &&
                                (typeof e["simpleCriterion"]["values"] === "undefined" ||
                                    Array.isArray(e["simpleCriterion"]["values"]) &&
                                    e["simpleCriterion"]["values"].every((e: any) =>
                                        typeof e === "string"
                                    ))) &&
                            (typeof e["tagCriterion"] === "undefined" ||
                                (e["tagCriterion"] !== null &&
                                    typeof e["tagCriterion"] === "object" ||
                                    typeof e["tagCriterion"] === "function") &&
                                (typeof e["tagCriterion"]["comparator"] === "undefined" ||
                                    e["tagCriterion"]["comparator"] === "CONTAINS" ||
                                    e["tagCriterion"]["comparator"] === "EQ" ||
                                    e["tagCriterion"]["comparator"] === "GT" ||
                                    e["tagCriterion"]["comparator"] === "GTE" ||
                                    e["tagCriterion"]["comparator"] === "LT" ||
                                    e["tagCriterion"]["comparator"] === "LTE" ||
                                    e["tagCriterion"]["comparator"] === "NE" ||
                                    e["tagCriterion"]["comparator"] === "STARTS_WITH") &&
                                (typeof e["tagCriterion"]["tagValues"] === "undefined" ||
                                    Array.isArray(e["tagCriterion"]["tagValues"]) &&
                                    e["tagCriterion"]["tagValues"].every((e: any) =>
                                        (e !== null &&
                                            typeof e === "object" ||
                                            typeof e === "function") &&
                                        (typeof e["key"] === "undefined" ||
                                            typeof e["key"] === "string") &&
                                        (typeof e["value"] === "undefined" ||
                                            typeof e["value"] === "string")
                                    )))
                        )))) &&
            (typeof typedObj["s3JobDefinition"]["bucketDefinitions"] === "undefined" ||
                Array.isArray(typedObj["s3JobDefinition"]["bucketDefinitions"]) &&
                typedObj["s3JobDefinition"]["bucketDefinitions"].every((e: any) =>
                    (e !== null &&
                        typeof e === "object" ||
                        typeof e === "function") &&
                    (typeof e["accountId"] === "undefined" ||
                        typeof e["accountId"] === "string") &&
                    (typeof e["buckets"] === "undefined" ||
                        Array.isArray(e["buckets"]) &&
                        e["buckets"].every((e: any) =>
                            typeof e === "string"
                        ))
                )) &&
            (typeof typedObj["s3JobDefinition"]["scoping"] === "undefined" ||
                (typedObj["s3JobDefinition"]["scoping"] !== null &&
                    typeof typedObj["s3JobDefinition"]["scoping"] === "object" ||
                    typeof typedObj["s3JobDefinition"]["scoping"] === "function") &&
                (typeof typedObj["s3JobDefinition"]["scoping"]["excludes"] === "undefined" ||
                    (typedObj["s3JobDefinition"]["scoping"]["excludes"] !== null &&
                        typeof typedObj["s3JobDefinition"]["scoping"]["excludes"] === "object" ||
                        typeof typedObj["s3JobDefinition"]["scoping"]["excludes"] === "function") &&
                    (typeof typedObj["s3JobDefinition"]["scoping"]["excludes"]["and"] === "undefined" ||
                        Array.isArray(typedObj["s3JobDefinition"]["scoping"]["excludes"]["and"]) &&
                        typedObj["s3JobDefinition"]["scoping"]["excludes"]["and"].every((e: any) =>
                            (e !== null &&
                                typeof e === "object" ||
                                typeof e === "function") &&
                            (typeof e["simpleScopeTerm"] === "undefined" ||
                                (e["simpleScopeTerm"] !== null &&
                                    typeof e["simpleScopeTerm"] === "object" ||
                                    typeof e["simpleScopeTerm"] === "function") &&
                                (typeof e["simpleScopeTerm"]["comparator"] === "undefined" ||
                                    e["simpleScopeTerm"]["comparator"] === "CONTAINS" ||
                                    e["simpleScopeTerm"]["comparator"] === "EQ" ||
                                    e["simpleScopeTerm"]["comparator"] === "GT" ||
                                    e["simpleScopeTerm"]["comparator"] === "GTE" ||
                                    e["simpleScopeTerm"]["comparator"] === "LT" ||
                                    e["simpleScopeTerm"]["comparator"] === "LTE" ||
                                    e["simpleScopeTerm"]["comparator"] === "NE" ||
                                    e["simpleScopeTerm"]["comparator"] === "STARTS_WITH") &&
                                (typeof e["simpleScopeTerm"]["key"] === "undefined" ||
                                    e["simpleScopeTerm"]["key"] === "OBJECT_EXTENSION" ||
                                    e["simpleScopeTerm"]["key"] === "OBJECT_KEY" ||
                                    e["simpleScopeTerm"]["key"] === "OBJECT_LAST_MODIFIED_DATE" ||
                                    e["simpleScopeTerm"]["key"] === "OBJECT_SIZE") &&
                                (typeof e["simpleScopeTerm"]["values"] === "undefined" ||
                                    Array.isArray(e["simpleScopeTerm"]["values"]) &&
                                    e["simpleScopeTerm"]["values"].every((e: any) =>
                                        typeof e === "string"
                                    ))) &&
                            (typeof e["tagScopeTerm"] === "undefined" ||
                                (e["tagScopeTerm"] !== null &&
                                    typeof e["tagScopeTerm"] === "object" ||
                                    typeof e["tagScopeTerm"] === "function") &&
                                (typeof e["tagScopeTerm"]["comparator"] === "undefined" ||
                                    e["tagScopeTerm"]["comparator"] === "CONTAINS" ||
                                    e["tagScopeTerm"]["comparator"] === "EQ" ||
                                    e["tagScopeTerm"]["comparator"] === "GT" ||
                                    e["tagScopeTerm"]["comparator"] === "GTE" ||
                                    e["tagScopeTerm"]["comparator"] === "LT" ||
                                    e["tagScopeTerm"]["comparator"] === "LTE" ||
                                    e["tagScopeTerm"]["comparator"] === "NE" ||
                                    e["tagScopeTerm"]["comparator"] === "STARTS_WITH") &&
                                (typeof e["tagScopeTerm"]["key"] === "undefined" ||
                                    typeof e["tagScopeTerm"]["key"] === "string") &&
                                (typeof e["tagScopeTerm"]["tagValues"] === "undefined" ||
                                    Array.isArray(e["tagScopeTerm"]["tagValues"]) &&
                                    e["tagScopeTerm"]["tagValues"].every((e: any) =>
                                        (e !== null &&
                                            typeof e === "object" ||
                                            typeof e === "function") &&
                                        (typeof e["key"] === "undefined" ||
                                            typeof e["key"] === "string") &&
                                        (typeof e["value"] === "undefined" ||
                                            typeof e["value"] === "string")
                                    )) &&
                                (typeof e["tagScopeTerm"]["target"] === "undefined" ||
                                    e["tagScopeTerm"]["target"] === "S3_OBJECT"))
                        ))) &&
                (typeof typedObj["s3JobDefinition"]["scoping"]["includes"] === "undefined" ||
                    (typedObj["s3JobDefinition"]["scoping"]["includes"] !== null &&
                        typeof typedObj["s3JobDefinition"]["scoping"]["includes"] === "object" ||
                        typeof typedObj["s3JobDefinition"]["scoping"]["includes"] === "function") &&
                    (typeof typedObj["s3JobDefinition"]["scoping"]["includes"]["and"] === "undefined" ||
                        Array.isArray(typedObj["s3JobDefinition"]["scoping"]["includes"]["and"]) &&
                        typedObj["s3JobDefinition"]["scoping"]["includes"]["and"].every((e: any) =>
                            (e !== null &&
                                typeof e === "object" ||
                                typeof e === "function") &&
                            (typeof e["simpleScopeTerm"] === "undefined" ||
                                (e["simpleScopeTerm"] !== null &&
                                    typeof e["simpleScopeTerm"] === "object" ||
                                    typeof e["simpleScopeTerm"] === "function") &&
                                (typeof e["simpleScopeTerm"]["comparator"] === "undefined" ||
                                    e["simpleScopeTerm"]["comparator"] === "CONTAINS" ||
                                    e["simpleScopeTerm"]["comparator"] === "EQ" ||
                                    e["simpleScopeTerm"]["comparator"] === "GT" ||
                                    e["simpleScopeTerm"]["comparator"] === "GTE" ||
                                    e["simpleScopeTerm"]["comparator"] === "LT" ||
                                    e["simpleScopeTerm"]["comparator"] === "LTE" ||
                                    e["simpleScopeTerm"]["comparator"] === "NE" ||
                                    e["simpleScopeTerm"]["comparator"] === "STARTS_WITH") &&
                                (typeof e["simpleScopeTerm"]["key"] === "undefined" ||
                                    e["simpleScopeTerm"]["key"] === "OBJECT_EXTENSION" ||
                                    e["simpleScopeTerm"]["key"] === "OBJECT_KEY" ||
                                    e["simpleScopeTerm"]["key"] === "OBJECT_LAST_MODIFIED_DATE" ||
                                    e["simpleScopeTerm"]["key"] === "OBJECT_SIZE") &&
                                (typeof e["simpleScopeTerm"]["values"] === "undefined" ||
                                    Array.isArray(e["simpleScopeTerm"]["values"]) &&
                                    e["simpleScopeTerm"]["values"].every((e: any) =>
                                        typeof e === "string"
                                    ))) &&
                            (typeof e["tagScopeTerm"] === "undefined" ||
                                (e["tagScopeTerm"] !== null &&
                                    typeof e["tagScopeTerm"] === "object" ||
                                    typeof e["tagScopeTerm"] === "function") &&
                                (typeof e["tagScopeTerm"]["comparator"] === "undefined" ||
                                    e["tagScopeTerm"]["comparator"] === "CONTAINS" ||
                                    e["tagScopeTerm"]["comparator"] === "EQ" ||
                                    e["tagScopeTerm"]["comparator"] === "GT" ||
                                    e["tagScopeTerm"]["comparator"] === "GTE" ||
                                    e["tagScopeTerm"]["comparator"] === "LT" ||
                                    e["tagScopeTerm"]["comparator"] === "LTE" ||
                                    e["tagScopeTerm"]["comparator"] === "NE" ||
                                    e["tagScopeTerm"]["comparator"] === "STARTS_WITH") &&
                                (typeof e["tagScopeTerm"]["key"] === "undefined" ||
                                    typeof e["tagScopeTerm"]["key"] === "string") &&
                                (typeof e["tagScopeTerm"]["tagValues"] === "undefined" ||
                                    Array.isArray(e["tagScopeTerm"]["tagValues"]) &&
                                    e["tagScopeTerm"]["tagValues"].every((e: any) =>
                                        (e !== null &&
                                            typeof e === "object" ||
                                            typeof e === "function") &&
                                        (typeof e["key"] === "undefined" ||
                                            typeof e["key"] === "string") &&
                                        (typeof e["value"] === "undefined" ||
                                            typeof e["value"] === "string")
                                    )) &&
                                (typeof e["tagScopeTerm"]["target"] === "undefined" ||
                                    e["tagScopeTerm"]["target"] === "S3_OBJECT"))
                        ))))) &&
        (typeof typedObj["samplingPercentage"] === "undefined" ||
            typeof typedObj["samplingPercentage"] === "number") &&
        (typeof typedObj["scheduleFrequency"] === "undefined" ||
            (typedObj["scheduleFrequency"] !== null &&
                typeof typedObj["scheduleFrequency"] === "object" ||
                typeof typedObj["scheduleFrequency"] === "function") &&
            (typeof typedObj["scheduleFrequency"]["dailySchedule"] === "undefined" ||
                (typedObj["scheduleFrequency"]["dailySchedule"] !== null &&
                    typeof typedObj["scheduleFrequency"]["dailySchedule"] === "object" ||
                    typeof typedObj["scheduleFrequency"]["dailySchedule"] === "function")) &&
            (typeof typedObj["scheduleFrequency"]["monthlySchedule"] === "undefined" ||
                (typedObj["scheduleFrequency"]["monthlySchedule"] !== null &&
                    typeof typedObj["scheduleFrequency"]["monthlySchedule"] === "object" ||
                    typeof typedObj["scheduleFrequency"]["monthlySchedule"] === "function") &&
                (typeof typedObj["scheduleFrequency"]["monthlySchedule"]["dayOfMonth"] === "undefined" ||
                    typeof typedObj["scheduleFrequency"]["monthlySchedule"]["dayOfMonth"] === "number")) &&
            (typeof typedObj["scheduleFrequency"]["weeklySchedule"] === "undefined" ||
                (typedObj["scheduleFrequency"]["weeklySchedule"] !== null &&
                    typeof typedObj["scheduleFrequency"]["weeklySchedule"] === "object" ||
                    typeof typedObj["scheduleFrequency"]["weeklySchedule"] === "function") &&
                (typeof typedObj["scheduleFrequency"]["weeklySchedule"]["dayOfWeek"] === "undefined" ||
                    typedObj["scheduleFrequency"]["weeklySchedule"]["dayOfWeek"] === "FRIDAY" ||
                    typedObj["scheduleFrequency"]["weeklySchedule"]["dayOfWeek"] === "MONDAY" ||
                    typedObj["scheduleFrequency"]["weeklySchedule"]["dayOfWeek"] === "SATURDAY" ||
                    typedObj["scheduleFrequency"]["weeklySchedule"]["dayOfWeek"] === "SUNDAY" ||
                    typedObj["scheduleFrequency"]["weeklySchedule"]["dayOfWeek"] === "THURSDAY" ||
                    typedObj["scheduleFrequency"]["weeklySchedule"]["dayOfWeek"] === "TUESDAY" ||
                    typedObj["scheduleFrequency"]["weeklySchedule"]["dayOfWeek"] === "WEDNESDAY"))) &&
        (typeof typedObj["tags"] === "undefined" ||
            (typedObj["tags"] !== null &&
                typeof typedObj["tags"] === "object" ||
                typeof typedObj["tags"] === "function") &&
            Object.entries<any>(typedObj["tags"])
                .every(([key, value]) => (typeof value === "string" &&
                    typeof key === "string")))
    )
}

export function isMacieJobSuccessResponse(obj: unknown): obj is MacieJobSuccessResponse {
    const typedObj = obj as MacieJobSuccessResponse
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["success"] === true &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["jobId"] === "string" &&
        typeof typedObj["data"]["jobArn"] === "string" &&
        typeof typedObj["data"]["requestId"] === "string"
    )
}

export function isMacieJobErrorResponse(obj: unknown): obj is MacieJobErrorResponse {
    const typedObj = obj as MacieJobErrorResponse
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["success"] === false &&
        (typedObj["error"] !== null &&
            typeof typedObj["error"] === "object" ||
            typeof typedObj["error"] === "function") &&
        typeof typedObj["error"]["type"] === "string" &&
        typeof typedObj["error"]["message"] === "string" &&
        typeof typedObj["error"]["requestId"] === "string"
    )
}

export function isMacieJobResponse(obj: unknown): obj is MacieJobResponse {
    const typedObj = obj as MacieJobResponse
    return (
        (isMacieJobSuccessResponse(typedObj) as boolean ||
            isMacieJobErrorResponse(typedObj) as boolean)
    )
}
