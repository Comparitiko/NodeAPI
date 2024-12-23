import { Serie } from '../models/serie.js'

export class SeriesController {
  static async getAll (req, res) {
    const series = await Serie.find()
    res.json(series)
  }

  static async create (req, res) {
    const { title, description, genre, rating } = req.body
    const serie = new Serie({ title, description, genre, rating })

    try {
      await serie.save()
      res.status(201).json({
        message: 'Serie created successfully',
        serie
      })
    } catch (err) {
      res.status(500).json({
        message: 'Error creating serie'
      })
    }
  }

  static updateById (req, res) {

  }

  static getTopRated (req, res) {

  }

  static getOneByGenre (req, res) {

  }

  static getOneById (req, res) {

  }

  static deleteOneById (req, res) {

  }
}
