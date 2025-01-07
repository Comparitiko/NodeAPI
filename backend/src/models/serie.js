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
  genres: {
    type: [String],
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
  totalVotes: {
    type: Number,
    default: 0,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  }
})

// Method to remove __v, userId and change the _id to id
SerieSchema.method('toJSON', function () {
  const { __v, _id, userId, ...Object } = this.toObject()
  Object.id = _id
  return Object
})

export const Serie = model('series', SerieSchema)
