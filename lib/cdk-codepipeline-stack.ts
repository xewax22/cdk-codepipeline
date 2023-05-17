import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { CodePipeline,CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

export class CdkCodepipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const cicdpipeline = new CodePipeline(this, 'cicdpipeline',{
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('xewax/cdk-codepipeline','main'),
        commands: ['npm ci','npm run build','npx cdk synth'],
      }),
    } )
    // example resource
    // const queue = new sqs.Queue(this, 'CdkCodepipelineQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
