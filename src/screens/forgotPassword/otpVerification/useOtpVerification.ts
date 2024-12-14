import { useForm } from 'react-hook-form'
import Toast from 'react-native-toast-message'
import { zodResolver } from '@hookform/resolvers/zod'

import { otpVerificationSchema, OtpVerificationSchema } from './otpVerification.schema'
import { useForgotPasswordContext } from '../forgotPassword.context'

export function useOtpVerification() {
  const { email, nextStep } = useForgotPasswordContext()

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
    try {
      console.log(email)
      //TODO: Resend code

      Toast.show({
        text1: 'Code resent',
        text2: 'Please check your email',
        type: 'success',
      })
    } catch (error) {
      console.error(error)
    }
  }

  return { methods, handleOtpVerification, handleResendCode }
}
