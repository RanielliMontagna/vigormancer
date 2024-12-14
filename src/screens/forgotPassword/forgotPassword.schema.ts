import z from 'zod'

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Please enter your email').email('Please enter a valid email'),
})

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
