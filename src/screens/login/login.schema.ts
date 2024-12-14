import z from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'Please enter your email').email('Please enter a valid email'),
  password: z.string().min(1, 'Please enter your password'),
  showPassword: z.boolean().default(false),
})

export type LoginSchema = z.infer<typeof loginSchema>
