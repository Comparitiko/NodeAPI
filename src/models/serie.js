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
  isMiniserie: {
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
  }
})

export const Serie = model('series', SerieSchema)
