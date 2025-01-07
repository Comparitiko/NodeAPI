import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string({
    required_error: 'El email es obligatorio',
    invalid_type_error: 'El email debe ser un texto'
  })
    .email({ message: 'El email no es válido' }),
  password: z.string({
    required_error: 'La contraseña es obligatoria',
    invalid_type_error: 'La contraseña debe ser un texto'
  })
    .min(1, { message: 'La contraseña debe tener al menos 1 caracter' })
})

export const registerSchema = z.object({
  username: z.string({
    required_error: 'El nombre de usuario es obligatorio',
    invalid_type_error: 'El nombre de usuario debe ser un texto'
  })
    .min(2, { message: 'El nombre de usuario debe tener al menos 2 caracteres' }),
  email: z.string({
    required_error: 'El email es obligatorio',
    invalid_type_error: 'El email debe ser un texto'
  })
    .email({ message: 'El email no es válido' }),
  password: z.string({
    required_error: 'La contraseña es obligatoria',
    invalid_type_error: 'La contraseña debe ser un texto'
  })
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número'
    }),
  confirmPassword: z.string({
    required_error: 'La confirmación de contraseña es obligatoria',
    invalid_type_error: 'La confirmación de contraseña debe ser un texto'
  })
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Las contraseñas no coinciden',
      path: ['confirmPassword']
    })
  }
})
