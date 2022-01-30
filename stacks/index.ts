import StorageStack from './StorageStack'
import ApiStack from './ApiStack'
import * as sst from '@serverless-stack/resources'

export default function main(app: sst.App): void {
  app.setDefaultFunctionProps({
    runtime: 'nodejs14.x',
  })

  const storageStack = new StorageStack(app, 'storage')
  new ApiStack(app, 'api', storageStack.table)
}
