import { TouchableOpacity, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import { BackButton, Button, Form, H2, P, Text, TextField } from '@/components'

import { useOtpVerification } from './useOtpVerification'
import { useForgotPasswordContext } from '../forgotPassword.context'

export function OtpVerification() {
  const { t } = useTranslation()

  const { prevStep } = useForgotPasswordContext()
  const { methods, handleOtpVerification, handleResendCode } = useOtpVerification()

  return (
    <Form {...methods}>
      <View className="flex flex-1 justify-center p-4 bg-background gap-6">
        <BackButton onPress={prevStep} />
        <View>
          <H2>{t('forgotPassword.otpVerification.title')}</H2>
          <P className="text-muted-foreground">{t('forgotPassword.otpVerification.subtitle')}</P>
        </View>
        <View className="gap-4">
          <TextField
            control={methods.control}
            name="otp"
            placeholder={t('forgotPassword.otpVerification.codePlaceholder')}
            size="lg"
            type="number"
            keyboardType="numeric"
            textContentType="oneTimeCode"
            maxLength={4}
          />
        </View>
        <View className="gap-4">
          <Button size="lg" className="mt-4" onPress={methods.handleSubmit(handleOtpVerification)}>
            <Text>{t('forgotPassword.otpVerification.submit')}</Text>
          </Button>
          <View className="pb-8 justify-center items-center flex flex-row gap-1">
            <Text>{t('forgotPassword.otpVerification.didntReceivedCode')}</Text>
            <TouchableOpacity>
              <Text bold onPress={handleResendCode}>
                {t('forgotPassword.otpVerification.resendCode')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Form>
  )
}
