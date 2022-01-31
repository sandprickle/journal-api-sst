import dynamoDb from './util/dynamodb'
import { HttpResponse } from '@aws-sdk/types'
import httpResponse from './util/http-response'
import * as yup from 'yup'

const journalEntrySchema = yup
  .object({
    journalId: yup.string().defined().min(3),
    timestamp: yup.number().defined().required().integer(),
    content: yup.string().defined().required(),
  })
  .noUnknown()

export async function main(event: any): Promise<HttpResponse> {
  const requestBody = JSON.parse(event.body)

  const dataIsInvalid = !journalEntrySchema.isValidSync(requestBody, {
    strict: true,
  })
  if (dataIsInvalid) return httpResponse(400, 'Invalid body')

  try {
    await dynamoDb.put({
      TableName: process.env.TABLE_NAME,
      Item: requestBody,
    })

    return httpResponse(200, JSON.stringify(requestBody))
  } catch (err: any) {
    return httpResponse(500, JSON.stringify(err.message))
  }
}
