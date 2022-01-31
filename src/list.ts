import dynamoDb from './util/dynamodb'
import { HttpResponse } from '@aws-sdk/types'
import httpResponse from './util/http-response'
import * as yup from 'yup'

const journalIdSchema = yup.string().defined().min(3)

export async function main(event: any): Promise<HttpResponse> {
  const qs = event.queryStringParameters

  const journalIdMissing = !qs || !qs.journal_id
  if (journalIdMissing) return httpResponse(404, 'I need a journal ID!')

  const journalIdIsInvalid = !journalIdSchema.isValidSync(qs.journal_id)
  if (journalIdIsInvalid) return httpResponse(400, 'Invalid journal ID!')

  try {
    const result = await dynamoDb
      .query({
        TableName: process.env.TABLE_NAME,
        ExpressionAttributeValues: {
          ':id': qs.journal_id,
        },
        KeyConditionExpression: 'journalId = :id',
      })
      .then((res) => res.Items)

    return httpResponse(200, JSON.stringify(result))
  } catch (err: any) {
    return httpResponse(500, JSON.stringify(err.message))
  }
}
