#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { IacStack } from '../lib/iac-stack';

const app = new cdk.App();

const env = {
  account: process.env.AWS_ACCOUNT_ID,
  region: process.env.AWS_REGION
}

const stage = process.env['GITHUB_REF_NAME'] || 'dev';
const acmCertificateArn = process.env['ACM_CERTIFICATE_ARN'] || 'arn:aws:acm:us-east-1:123456789012:certificate/12345678-1234-1234-1234-123456789012';
const alternativeDomain = process.env['ALTERNATIVE_DOMAIN'] || 'onlydevs-dev.devmaua.com';
const hostedZoneIdValue = process.env['HOSTED_ZONE_ID'] || 'Z1UJRXOUMOOFQ8';


const stackName = process.env.STACK_NAME || 'PortalInternoStackDev'

new IacStack(app, stackName, stage, acmCertificateArn, alternativeDomain, hostedZoneIdValue,{
  env: env
});