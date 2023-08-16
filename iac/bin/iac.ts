#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { IacStack } from '../lib/iac-stack'

const app = new cdk.App()

const env = {
  account: import.meta.env.AWS_ACCOUNT_ID,
  region: import.meta.env.AWS_REGION
}

const stackName = import.meta.env.STACK_NAME || 'PortalInternoStackDev'

new IacStack(app, stackName, {
  env: env
})
