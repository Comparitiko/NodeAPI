import { Serie } from '../models/serie.js'

export class SeriesController {
  static async getAll (req, res) {
    const series = await Serie.find()
    res.json({ series })
  }

  static async create (req, res) {
    const { title, description, genre, rating } = req.body
    const serie = new Serie({ title, description, genre, rating })

    try {
      await serie.save()
      return res.status(201).json({
        message: 'Serie created successfully',
        serie
      })
    } catch (err) {
      res.status(500).json({
        message: 'Error creating serie'
      })
    }
  }

  // TODO hacer bien esto
  static async updateById (req, res) {
    const { id } = req.params
    const { title, description, genre, rating } = req.body
    // Update a serie by id
    const serie = await Serie.findById(id)
    try {
      Serie.findByIdAndUpdate(id, { title, description, genre, rating })
      res.json({ message: 'Serie updated successfully' })
    } catch (err) {
      res.status(500).json({
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
      const seriesByGenre = await Serie.find({ genre })

      return res.json({ series: seriesByGenre })
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error'
      })
    }
  }

  static getOneById (req, res) {
    const { id } = req.params
    // Get a serie by id
    try {
      const serieById = Serie.findById(id)

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
    // Delete a serie by id
    try {
      const serie = await Serie.findByIdAndDelete(id)

      if (!serie) {
        return res.status(404).json({
          message: 'Serie not found'
        })
      }

      return res.json({ message: 'Serie deleted successfully' })
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error'
      })
    }
  }
}
