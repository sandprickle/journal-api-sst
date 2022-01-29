import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import { HttpMessage } from '@aws-sdk/types'

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}))

export async function main(event: HttpMessage) {
  const data = JSON.parse(event.body)

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      journalId: data.journalId,
      timestamp: data.timestamp,
      content: data.content,
    },
  }

  try {
    await ddbDocClient.send(new PutCommand(params))
    return {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    }
  } catch (err: any) {
    console.error(err)

    return {
      statuscode: 500,
      body: JSON.stringify(err.message),
    }
  }
}
