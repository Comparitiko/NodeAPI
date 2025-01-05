import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string({
    required_error: 'The email is required',
    invalid_type_error: 'The email must be a string'
  })
    .email({ message: 'The email is not valid' }),
  password: z.string({
    required_error: 'The password is required',
    invalid_type_error: 'The password must be a string'
  })
    .min(1, { message: 'The password must be at least 1 character long' })
})

export const registerSchema = z.object({
  username: z.string({
    required_error: 'The username is required',
    invalid_type_error: 'The username must be a string'
  })
    .min(2, { message: 'The username must be at least 2 characters long' }),
  email: z.string({
    required_error: 'The email is required',
    invalid_type_error: 'The email must be a string'
  })
    .email({ message: 'The email is not valid' }),
  password: z.string({
    required_error: 'The password is required',
    invalid_type_error: 'The password must be a string'
  })
    .min(8, { message: 'The password must be at least 8 characters long' })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message: 'The password must contain at least one uppercase letter, one lowercase letter, and one number'
    }),
  confirmPassword: z.string({
    required_error: 'The confirm password is required',
    invalid_type_error: 'The confirm password must be a string'
  })
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'The passwords do not match',
      path: ['confirmPassword']
    })
  }
})
