import { model, Schema } from 'mongoose'

const SerieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userRating: {
    type: Number,
    required: true
  },
  isMiniSerie: {
    type: Boolean,
    required: true
  },
  numOfSeasons: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  totalRatingCount: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },

  // Methods
  toJSON: () => ({
    id: this._id,
    title: this.title,
    description: this.description,
    userRating: this.userRating,
    isMiniSerie: this.isMiniSerie,
    numOfSeasons: this.numOfSeasons,
    year: this.year,
    genre: this.genre,
    totalRatingCount: this.totalRatingCount,
    image: this.image,
    userId: this.userId
  })
})

export const Serie = model('series', SerieSchema)
