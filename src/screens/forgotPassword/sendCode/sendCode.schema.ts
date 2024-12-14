import z from 'zod'

export const sendCodeSchema = z.object({
  email: z.string().min(1, 'Please enter your email').email('Please enter a valid email'),
})

export type SendCodeSchema = z.infer<typeof sendCodeSchema>
