import { Macie2Client, ListFindingsCommand, GetFindingsCommand } from '@aws-sdk/client-macie2';
import { MacieFinding, FindingsPaginationParams } from '../types/macie-finding';
import { Logger } from '../../shared/utils/logger';

/**
 * Paginated findings result
 */
export interface PaginatedFindingsResult {
  findings: MacieFinding[];
  nextToken?: string;
  totalCount: number;
}

/**
 * Utility class for retrieving Macie findings with pagination
 */
export class MacieFindingsRetriever {
  private client: Macie2Client;
  private logger: Logger;

  constructor(logger: Logger, region?: string) {
    this.logger = logger;
    this.client = new Macie2Client({
      region: region || process.env.AWS_REGION || 'us-east-1'
    });
  }


  /**
   * Transform AWS SDK finding to our interface
   */
  private transformFinding(awsFinding: any): MacieFinding {
    return {
      id: awsFinding.id || '',
      accountId: awsFinding.accountId || '',
      archived: awsFinding.archived || false,
      category: awsFinding.category || '',
      classificationDetails: awsFinding.classificationDetails ? {
        jobArn: awsFinding.classificationDetails.jobArn || '',
        jobId: awsFinding.classificationDetails.jobId || '',
        result: awsFinding.classificationDetails.result ? {
          status: awsFinding.classificationDetails.result.status ? {
            code: awsFinding.classificationDetails.result.status.code || '',
            reason: awsFinding.classificationDetails.result.status.reason
          } : undefined,
          sensitiveData: awsFinding.classificationDetails.result.sensitiveData?.map((data: any) => ({
            category: data.category || '',
            detections: data.detections?.map((detection: any) => ({
              type: detection.type || '',
              count: detection.count || 0
            })) || [],
            totalCount: data.totalCount || 0
          })) || []
        } : undefined
      } : undefined,
      count: awsFinding.count || 0,
      createdAt: awsFinding.createdAt || '',
      description: awsFinding.description || '',
      partition: awsFinding.partition || '',
      region: awsFinding.region || '',
      resourcesAffected: awsFinding.resourcesAffected ? {
        s3Bucket: awsFinding.resourcesAffected.s3Bucket ? {
          arn: awsFinding.resourcesAffected.s3Bucket.arn || '',
          name: awsFinding.resourcesAffected.s3Bucket.name || '',
          owner: awsFinding.resourcesAffected.s3Bucket.owner ? {
            displayName: awsFinding.resourcesAffected.s3Bucket.owner.displayName || '',
            id: awsFinding.resourcesAffected.s3Bucket.owner.id || ''
          } : undefined,
          tags: awsFinding.resourcesAffected.s3Bucket.tags?.map((tag: any) => ({
            key: tag.key || '',
            value: tag.value || ''
          })) || []
        } : undefined,
        s3Object: awsFinding.resourcesAffected.s3Object ? {
          bucketArn: awsFinding.resourcesAffected.s3Object.bucketArn || '',
          eTag: awsFinding.resourcesAffected.s3Object.eTag || '',
          key: awsFinding.resourcesAffected.s3Object.key || '',
          lastModified: awsFinding.resourcesAffected.s3Object.lastModified || '',
          size: awsFinding.resourcesAffected.s3Object.size || 0,
          storageClass: awsFinding.resourcesAffected.s3Object.storageClass || '',
          tags: awsFinding.resourcesAffected.s3Object.tags?.map((tag: any) => ({
            key: tag.key || '',
            value: tag.value || ''
          })) || []
        } : undefined
      } : undefined,
      sample: awsFinding.sample || false,
      schemaVersion: awsFinding.schemaVersion || '',
      severity: awsFinding.severity ? {
        description: awsFinding.severity.description || '',
        score: awsFinding.severity.score || 0
      } : undefined,
      title: awsFinding.title || '',
      type: awsFinding.type || '',
      updatedAt: awsFinding.updatedAt || ''
    };
  }

  /**
   * Retrieve findings for a specific Macie job with pagination support
   */
  async getFindingsForJobPaginated(
    jobId: string, 
    maxResults: number = 50, 
    nextToken?: string
  ): Promise<PaginatedFindingsResult> {
    this.logger.info('Starting paginated findings retrieval', { 
      jobId,
      maxResults,
      hasNextToken: !!nextToken
    });

    try {
      // Step 1: List finding IDs for this job with pagination
      const listStartTime = Date.now();
      const listCommand = new ListFindingsCommand({
        findingCriteria: {
          criterion: {
            'classificationDetails.jobId': {
              eq: [jobId]
            }
          }
        },
        maxResults: Math.min(maxResults, 50), // AWS API maximum is 50
        nextToken: nextToken
      });

      const listResponse = await this.client.send(listCommand);
      const listDuration = Date.now() - listStartTime;

      this.logger.logApiResponse('Macie2', 'ListFindings', listResponse, listDuration);

      if (!listResponse.findingIds || listResponse.findingIds.length === 0) {
        this.logger.info('No findings found for job', { jobId });
        
        return {
          findings: [],
          nextToken: undefined,
          totalCount: 0
        };
      }

      // Step 2: Get detailed findings information
      const getStartTime = Date.now();
      const getCommand = new GetFindingsCommand({
        findingIds: listResponse.findingIds
      });

      const getResponse = await this.client.send(getCommand);
      const getDuration = Date.now() - getStartTime;

      this.logger.logApiResponse('Macie2', 'GetFindings', getResponse, getDuration);

      // Transform AWS SDK findings to our interface
      const transformedFindings = getResponse.findings 
        ? getResponse.findings.map(finding => this.transformFinding(finding))
        : [];

      this.logger.info('Completed paginated findings retrieval', {
        jobId,
        findingsReturned: transformedFindings.length,
        hasNextToken: !!listResponse.nextToken
      });

      return {
        findings: transformedFindings,
        nextToken: listResponse.nextToken,
        totalCount: transformedFindings.length
      };

    } catch (error: any) {
      this.logger.error('Failed to retrieve paginated findings', error, { jobId, maxResults });
      throw error;
    }
  }

}
