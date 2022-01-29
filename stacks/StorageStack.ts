import * as sst from '@serverless-stack/resources'

export default class StorageStack extends sst.Stack {
  table: sst.Table

  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props)

    this.table = new sst.Table(this, 'JournalEntries', {
      fields: {
        journalId: sst.TableFieldType.STRING,
        timestamp: sst.TableFieldType.NUMBER,
      },
      primaryIndex: { partitionKey: 'journalId', sortKey: 'timestamp' },
    })
  }
}
