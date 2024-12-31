import { View } from 'react-native'

import { SendCode } from './sendCode/sendCode'
import { OtpVerification } from './otpVerification/otpVerification'
import { ResetPassword } from './resetPassword/resetPassword'

import {
  ForgotPasswordProvider,
  StepForgotPassword,
  useForgotPasswordContext,
} from './forgotPassword.context'
import { PasswordChanged } from './passwordChanged/passwordChanged'

function ForgotPassword() {
  const { step } = useForgotPasswordContext()

  return (
    <View className="flex flex-1 justify-center p-4 bg-background gap-6" testID="forgot-password">
      {step === StepForgotPassword.SEND_CODE && <SendCode />}
      {step === StepForgotPassword.OTP_VERIFICATION && <OtpVerification />}
      {step === StepForgotPassword.RESET_PASSWORD && <ResetPassword />}
      {step === StepForgotPassword.SUCCESS && <PasswordChanged />}
    </View>
  )
}

function ForgotPasswordWrapper() {
  return (
    <ForgotPasswordProvider>
      <ForgotPassword />
    </ForgotPasswordProvider>
  )
}

export { ForgotPasswordWrapper as ForgotPassword }
