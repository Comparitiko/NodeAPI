import { Types } from 'mongoose'
import { Serie } from '../models/serie.js'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { R2Client } from '../config/r2.js'

export class SeriesController {
  static async getAll (req, res) {
    try {
      const series = await Serie.find()
      res.json({ series })
    } catch (err) {
      res.status(500).json({
        message: 'Internal server error'
      })
    }
  }

  static async create (req, res) {
    let { title, description, rating, isMiniSerie, numOfSeasons, year, genres, image } = req.body

    // Convert genres to lowercase
    genres = genres.map((genre) => genre.toLowerCase())

    const userId = req.user.id
    const serie = await new Serie({
      title,
      description,
      userRating: rating,
      isMiniSerie,
      numOfSeasons,
      year,
      genres,
      totalRatingCount: rating,
      image,
      userId,
      totalVotes: 1
    })

    try {
      await serie.save()
      return res.status(201).json({
        message: 'Serie created successfully',
        serie: serie.toJSON()
      })
    } catch (err) {
      res.status(500).json({
        message: 'Internal server error'
      })
    }
  }

  static async updateById (req, res) {
    const { id } = req.params
    const { rating } = req.body

    // Check if the id is a valid ObjectId
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid id'
      })
    }

    // Search a serie by id
    let serie
    try {
      serie = await Serie.findById(id)
    } catch (err) {
      console.error(err)
      return res.status(500).json({
        message: 'Internal server error'
      })
    }

    if (!serie) {
      return res.status(404).json({
        message: 'Serie not found'
      })
    }

    // Update the serie rating and increment the total votes by 1
    serie.totalRatingCount = serie.totalRatingCount + rating
    serie.totalVotes = serie.totalVotes + 1

    // Save the serie to the database
    try {
      await serie.save()
      return res.status(200).json({
        message: 'Rating updated successfully',
        serie
      })
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error'
      })
    }
  }

  static async getTopRated (req, res) {
    // Get the top 10 rated series
    try {
      const seriesTopRated = await Serie.find().sort({ rating: -1 }).limit(10)

      return res.json({ series: seriesTopRated })
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error'
      })
    }
  }

  static async getAllByGenre (req, res) {
    const { genre } = req.params
    // Get all series by genre
    try {
      // Filter by one genre
      const seriesByGenre = await Serie.find({ genres: genre })

      return res.json({ series: seriesByGenre })
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error'
      })
    }
  }

  static async getOneById (req, res) {
    const { id } = req.params

    // Check if the id is a valid ObjectId
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid id'
      })
    }

    // Get a serie by id
    try {
      const serieById = await Serie.findById(id)

      if (!serieById) {
        return res.status(404).json({
          message: 'Serie not found'
        })
      }

      res.json({ serie: serieById })
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error'
      })
    }
  }

  static async deleteOneById (req, res) {
    const { id } = req.params

    // Check if the id is a valid ObjectId
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid id'
      })
    }

    // Delete a serie_image and serie by serie id
    try {
      // Get serie info by id
      const serie = await Serie.findById(id)

      if (!serie) {
        return res.status(404).json({
          message: 'Serie not found'
        })
      }

      // Get serie image name
      const fileName = serie.image.split('/').pop()

      const deleteParams = {
        Bucket: process.env.R2_BUCKET_NAME, // Name of the bucket
        Key: fileName // Name of the file in the bucket
      }

      // Delete serie image from R2
      const command = new DeleteObjectCommand(deleteParams)
      await R2Client.init().send(command)

      // Delete serie from database
      await Serie.deleteOne({ _id: serie._id })

      return res.json({ message: 'Serie deleted successfully' })
    } catch (err) {
      console.error(err)
      return res.status(500).json({
        message: 'Internal server error'
      })
    }
  }

  static async getAllByUser (req, res) {
    const { user } = req

    try {
      const seriesByUser = await Serie.find({ userId: user.id })

      return res.json({ series: seriesByUser })
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error'
      })
    }
  }
}
