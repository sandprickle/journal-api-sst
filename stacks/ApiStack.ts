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
      defaultAuthorizationType: sst.ApiAuthorizationType.AWS_IAM,
      defaultFunctionProps: {
        environment: {
          TABLE_NAME: table.tableName,
        },
      },
      routes: {
        'POST /entries': 'src/create.main',
        'GET /entries': 'src/list.main',
      },
    })

    this.api.attachPermissions([table])

    const auth = new sst.Auth(this, 'Auth', {
      cognito: {
        userPool: {
          signInAliases: { email: true },
        },
      },
    })

    auth.attachPermissionsForAuthUsers([this.api])

    this.addOutputs({
      ApiEndpoint: this.api.url,
      UserPoolId: auth.cognitoUserPool?.userPoolId || '',
      IdentityPoolId: auth.cognitoCfnIdentityPool.ref,
      UserPoolClientId: auth.cognitoUserPoolClient?.userPoolClientId || '',
    })
  }
}
