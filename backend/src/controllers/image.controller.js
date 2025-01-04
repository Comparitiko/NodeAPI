import { PutObjectCommand } from '@aws-sdk/client-s3'
import { R2Client } from '../config/r2.js'

export class ImageController {
  static async upload (req, res) {
    const file = req.file

    if (!file) {
      return res.status(400).json({ message: 'There is no file to upload.' })
    }

    // Validate file type
    if (!file.mimetype.startsWith('image/')) {
      return res.status(400).send('Only image files are allowed.')
    }

    const uploadParams = {
      Bucket: process.env.R2_BUCKET_NAME, // Name of the bucket
      Key: file.originalname, // Name of the file in the bucket
      Body: file.buffer, // File content
      ContentType: file.mimetype // Mime type of the file
    }

    try {
      const command = new PutObjectCommand(uploadParams)
      await R2Client.init().send(command)

      const R2DOMAIN = process.env.R2_DOMAIN

      res.status(200).json({
        message: 'File uploaded successfully',
        url: `https://${R2DOMAIN}/${file.originalname}`
      })
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Internal server error' })
    }
  }
}
