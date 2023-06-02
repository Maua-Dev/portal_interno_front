import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';

import { Construct } from 'constructs';

export class IacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const stage = process.env['GITHUB_REF_NAME'] || 'dev';
    const acmCertificateArn = process.env['ACM_CERTIFICATE_ARN'] || 'arn:aws:acm:us-east-1:123456789012:certificate/12345678-1234-1234-1234-123456789012';
    const alternativeDomain = process.env['ALTERNATIVE_DOMAIN'] || 'onlydevs-dev.devmaua.com';
    const hostedZoneIdValue = process.env['HOSTED_ZONE_ID'] || 'Z1UJRXOUMOOFQ8';
    
    const bucket = new s3.Bucket(this, 'PortalInternoFrontBucket' + stage, {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      accessControl: s3.BucketAccessControl.PRIVATE,
    });

    const oai = new cloudfront.OriginAccessIdentity(this, 'PortalInternoFrontOAI-' + stage, {
      comment: 'OAI for PortalInternoFrontBucket',
    });

    bucket.grantRead(oai);

    const cloudfrontDistribution = new cloudfront.Distribution(this, 'PortalInternoFrontDistribution-' + stage, {
      domainNames: [alternativeDomain],
      certificate: Certificate.fromCertificateArn(this, 'PortalInternoFrontCertificate-' + stage, acmCertificateArn),
      comment: 'portal-interno-front-distribution-' + stage,
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

    const zone = route53.HostedZone.fromHostedZoneAttributes(this, 'PortalInternoFrontHostedZone-' + stage, {
      hostedZoneId: hostedZoneIdValue,
      zoneName: alternativeDomain,
    });
    
    new route53.ARecord(this, 'PortalInternoFrontAliasRecord-' + stage, {
      zone: zone,
      recordName: alternativeDomain,
      target: route53.RecordTarget.fromAlias(new route53Targets.CloudFrontTarget(cloudfrontDistribution)),
    });
    
    new cdk.CfnOutput(this, 'PortalInternoFrontBucketName-' + stage, {
      value: bucket.bucketName,
    });

    new cdk.CfnOutput(this, 'PortalInternoFrontDistributionId-' + stage, {
      value: cloudfrontDistribution.distributionId,
    });

  }
}
