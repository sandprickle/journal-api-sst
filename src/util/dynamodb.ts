import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandInput,
  QueryCommand,
  QueryCommandInput,
} from '@aws-sdk/lib-dynamodb'

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}))

export default {
  put(params: PutCommandInput) {
    return ddbDocClient.send(new PutCommand(params))
  },

  query(params: QueryCommandInput) {
    return ddbDocClient.send(new QueryCommand(params))
  },
}
