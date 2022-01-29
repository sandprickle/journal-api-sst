import { Template } from 'aws-cdk-lib/assertions'
import * as sst from '@serverless-stack/resources'
import StorageStack from '../stacks/StorageStack'

test('Storage Stack', () => {
  const app = new sst.App()

  const stack = new StorageStack(app, 'test-storage-stack')

  const template = Template.fromStack(stack)
  template.resourceCountIs('AWS::DynamoDB::Table', 1)
})
