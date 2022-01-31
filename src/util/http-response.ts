import { HttpResponse } from '@aws-sdk/types'

export default function httpResponse(
  statusCode: number,
  body: string,
): HttpResponse {
  return {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    statusCode,
    body,
  }
}
