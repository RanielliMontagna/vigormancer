import { z } from 'zod'
import { useForm } from 'react-hook-form'
import Toast from 'react-native-toast-message'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForgotPasswordContext } from '../forgotPassword.context'

export function useOtpVerification() {
  const { t } = useTranslation()
  const { email, nextStep } = useForgotPasswordContext()

  const otpVerificationSchema = z.object({
    otp: z
      .string()
      .min(4, t('validation.requiredCode', { length: 4 }))
      .max(4, t('validation.requiredCode', { length: 4 })),
  })

  type OtpVerificationSchema = z.infer<typeof otpVerificationSchema>

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
