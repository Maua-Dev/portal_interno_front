import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class IacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const bucket = new s3.Bucket(this, 'PortalInternoFrontBucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      accessControl: s3.BucketAccessControl.PRIVATE,
    });

    const oai = new cloudfront.OriginAccessIdentity(this, 'PortalInternoFrontOAI', {
      comment: 'OAI for PortalInternoFrontBucket',
    });

    bucket.grantRead(oai);

    const cloudfrontDistribution = new cloudfront.Distribution(this, 'PortalInternoFrontDistribution', {
      comment: 'portal-interno-front-distribution',
      defaultBehavior: {
        origin: new origins.S3Origin(bucket,{
          originAccessIdentity: oai,
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
      },
      defaultRootObject: 'index.html',
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
    });

    new cdk.CfnOutput(this, 'PortalInternoFrontBucketName', {
      value: bucket.bucketName,
    });

    new cdk.CfnOutput(this, 'PortalInternoFrontDistributionId', {
      value: cloudfrontDistribution.distributionId,
    });

  }
}
