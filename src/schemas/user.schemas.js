import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string()
    .email({ message: 'El email debe de ser válido' }),
  password: z.string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
})

export const registerSchema = z.object({
  username: z.string()
    .min(1, { message: 'El nombre de usuario es obligatorio' }),
  email: z.string()
    .min(1, { message: 'El email es obligatorio' })
    .email({ message: 'El email debe de ser válido' }),
  password: z.string()
    .min(8, { message: 'La contraseña debe de ser minimo de 8 caracteres' })
})
