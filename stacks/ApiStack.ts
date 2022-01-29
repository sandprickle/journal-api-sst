import * as sst from '@serverless-stack/resources'

export default class ApiStack extends sst.Stack {
  api

  constructor(
    scope: sst.App,
    id: string,
    table: sst.Table,
    props?: sst.StackProps,
  ) {
    super(scope, id, props)
    this.api = new sst.Api(this, 'Api', {
      defaultFunctionProps: {
        environment: {
          TABLE_NAME: table.tableName,
        },
      },
      routes: {
        'POST /entries': 'src/create.main',
      },
    })

    this.api.attachPermissions([table])

    this.addOutputs({
      ApiEndpoint: this.api.url,
    })
  }
}
