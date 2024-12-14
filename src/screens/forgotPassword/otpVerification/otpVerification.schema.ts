import z from 'zod'

export const otpVerificationSchema = z.object({
  otp: z.string().min(4, 'Please enter the 4-digit code').max(4, 'Please enter the 4-digit code'),
})

export type OtpVerificationSchema = z.infer<typeof otpVerificationSchema>
