import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { otpVerificationSchema, OtpVerificationSchema } from './otpVerification.schema'
import { useForgotPasswordContext } from '../forgotPassword.context'

export function useOtpVerification() {
  const { nextStep } = useForgotPasswordContext()

  const methods = useForm<OtpVerificationSchema>({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: { otp: '' },
  })

  function handleOtpVerification(data: OtpVerificationSchema) {
    console.log(data)

    //TODO: Verify OTP

    nextStep()
  }

  function handleResendCode() {
    console.log('Resend code')

    //TODO: Resend code
  }

  return { methods, handleOtpVerification, handleResendCode }
}
