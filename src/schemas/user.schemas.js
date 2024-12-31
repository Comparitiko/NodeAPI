import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string({
    required_error: 'El email es obligatorio'
  })
    .email({ message: 'El email debe de ser válido' }),
  password: z.string({
    required_error: 'La contraseña es obligatoria'
  })
    .min(1, { message: 'La contraseña debe de ser minimo de 1 caracter' })
})

export const registerSchema = z.object({
  username: z.string({
    required_error: 'El nombre de usuario es obligatorio'
  })
    .min(2, { message: 'El nombre de usuario debe de tener al menos 2 caracteres' }),
  email: z.string({
    required_error: 'El email es obligatorio'
  })
    .email({ message: 'El email debe de ser válido' }),
  password: z.string({
    required_error: 'La contraseña es obligatoria'
  })
    .min(8, { message: 'La contraseña debe de ser minimo de 8 caracteres' })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message: 'La contraseña debe de tener al menos 8 caracteres y contener al menos una letra y un número'
    })
})
