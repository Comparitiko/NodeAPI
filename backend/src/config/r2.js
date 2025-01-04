// Configuration of R2 client using the AWS SDK for JavaScript

import { S3Client } from '@aws-sdk/client-s3'

export class R2Client {
  static #client

  // Initialize the R2 client if it's not already initialized
  static init () {
    if (!R2Client.#client) {
      R2Client.#client = new S3Client({
        region: 'auto',
        endpoint: process.env.R2_ENDPOINT,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
        }
      })
    }

    return R2Client.#client
  }
}
