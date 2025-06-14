/**
 * Macie finding types and interfaces
 */

/**
 * Macie finding structure (simplified from AWS SDK)
 */
export interface MacieFinding {
  id: string;
  accountId: string;
  archived: boolean;
  category: string;
  classificationDetails?: {
    jobArn: string;
    jobId: string;
    result?: {
      status?: {
        code: string;
        reason?: string;
      };
      sensitiveData?: Array<{
        category: string;
        detections?: Array<{
          type: string;
          count: number;
        }>;
        totalCount: number;
      }>;
    };
  };
  count: number;
  createdAt: string;
  description: string;
  partition: string;
  region: string;
  resourcesAffected?: {
    s3Bucket?: {
      arn: string;
      name: string;
      owner?: {
        displayName: string;
        id: string;
      };
      tags?: Array<{
        key: string;
        value: string;
      }>;
    };
    s3Object?: {
      bucketArn: string;
      eTag: string;
      key: string;
      lastModified: string;
      size: number;
      storageClass: string;
      tags?: Array<{
        key: string;
        value: string;
      }>;
    };
  };
  sample: boolean;
  schemaVersion: string;
  severity?: {
    description: string;
    score: number;
  };
  title: string;
  type: string;
  updatedAt: string;
}

/**
 * Pagination parameters for findings retrieval
 */
export interface FindingsPaginationParams {
  maxResults?: number;
  nextToken?: string;
}
