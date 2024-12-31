import { z } from 'zod'

export const newSerieSchema = z.object({
  name: z.string({
    required_error: 'El nombre es obligatorio'
  })
    .min(1, { message: 'El nombre es obligatorio' }),
  description: z.string({
    required_error: 'La descripción es obligatoria'
  }).min(1, { message: 'La descripción es obligatoria' }),
  genre: z.string().min(1, { message: 'El género es obligatorio' }),
  rating: z.number().min(1, { message: 'La calificación es obligatoria' }),
  image: z.string().min(1, { message: 'La imagen es obligatoria' }),
  status: z.string().min(1, { message: 'El estado es obligatorio' })
})

export const updateSerieRateSchema = z.object({
  rating: z.number({
    required_error: 'La puntuacion nueva es obligatoria'
  })
    .min(1, { message: 'La calificación es obligatoria' })
    .max(5, { message: 'La calificación no puede ser mayor a 5' })
})
