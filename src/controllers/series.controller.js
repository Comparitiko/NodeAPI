import { Serie } from '../models/serie.js'
import { Types } from 'mongoose'

export class SeriesController {
  static async getAll (req, res) {
    const series = await Serie.find()
    res.json({ series })
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
      userId
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
      return res.status(404).json({
        message: 'Serie not found'
      })
    }

    // Update the serie rating
    serie.totalRatingCount = serie.totalRatingCount + rating

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

      if (seriesTopRated.length === 0) {
        return res.status(404).json({
          message: 'There are no series rated'
        })
      }

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

      if (seriesByGenre.length === 0) {
        return res.status(404).json({
          message: 'There are no series with this genre'
        })
      }

      return res.json({ series: seriesByGenre })
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error'
      })
    }
  }

  static async getOneById (req, res) {
    const { id } = req.params
    // Get a serie by id
    try {
      const serieById = await Serie.findById(id)

      res.json({ serie: serieById })
    } catch (err) {
      return res.status(404).json({
        message: 'Serie not found'
      })
    }
  }

  static async deleteOneById (req, res) {
    const { id } = req.params
    // Delete a serie by id
    try {
      await Serie.findByIdAndDelete(id)

      return res.json({ message: 'Serie deleted successfully' })
    } catch (err) {
      return res.status(404).json({
        message: 'Serie not found'
      })
    }
  }
}
