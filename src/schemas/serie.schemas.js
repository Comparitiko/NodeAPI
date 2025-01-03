import { z } from 'zod'

export const newSerieSchema = z.object({
  title: z.string({
    required_error: 'The title is required',
    invalid_type_error: 'The title must be a string'
  })
    .min(2, { message: 'The title must be at least 2 characters long' }),
  description: z.string({
    required_error: 'The description is required',
    invalid_type_error: 'The description must be a string'
  }).min(2, { message: 'The description must be at least 2 characters long' }),
  rating: z.number({
    required_error: 'The rating is required',
    invalid_type_error: 'The rating must be a number'
  })
    .min(1, { message: 'The rating must be at least 1' })
    .max(5, { message: 'The rating cannot be bigger than 5' }),
  isMiniSerie: z.boolean({
    required_error: 'isMiniSerie is required',
    invalid_type_error: 'isMiniSerie must be a boolean'
  }),
  numOfSeasons: z.number({
    required_error: 'The number of seasons is required',
    invalid_type_error: 'The number of seasons must be a number'
  })
    .min(1, { message: 'The number of seasons must be at least 1' }),
  year: z.number({
    required_error: 'The year is required',
    invalid_type_error: 'The year must be a number'
  })
    .min(1900, { message: 'The year must be at least 1900' })
    .max(new Date().getFullYear(), { message: 'The year cannot be bigger than the current year' }),
  genres: z.array(
    z.string({
      required_error: 'The genre is required',
      invalid_type_error: 'The genre must be a string'
    }).min(2, { message: 'A genre must be at least 2 characters long' }),
    {
      invalid_type_error: 'The genres must be an array of strings',
      required_error: 'The genres are required'
    }
  ).min(1, { message: 'The genres array must contain at least 1' }),
  image: z.string({
    required_error: 'The image is required',
    invalid_type_error: 'The image must be a string'
  }).url({
    message: 'The image must be a valid URL'
  })
})

export const updateSerieRateSchema = z.object({
  rating: z.number({
    required_error: 'The rating is required',
    invalid_type_error: 'The rating must be a number'
  })
    .min(1, { message: 'The rating must be at least 1' })
    .max(5, { message: 'The rating cannot be bigger than 5' })
})
