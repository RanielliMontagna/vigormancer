import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'

import { BackButton, Button, Form, H2, P, Text, TextField } from '@/components'

import { useSendCode } from './useSendCode'
import { useForgotPasswordContext } from '../forgotPassword.context'

export function SendCode() {
  const { t } = useTranslation()

  const { prevStep } = useForgotPasswordContext()
  const { methods, handleBack, handleSendCode } = useSendCode()

  return (
    <Form {...methods}>
      <View className="flex flex-1 justify-center p-4 bg-background gap-6" testID="send-code">
        <BackButton onPress={prevStep} />
        <View>
          <H2>{t('forgotPassword.sendCode.title')}</H2>
          <P className="text-muted-foreground">{t('forgotPassword.sendCode.subtitle')}</P>
        </View>
        <View className="gap-4">
          <TextField
            testID="send-code-email"
            control={methods.control}
            name="email"
            placeholder="Enter your email"
            size="lg"
          />
        </View>
        <View className="gap-4">
          <Button
            testID="send-code-submit"
            size="lg"
            className="mt-4"
            onPress={methods.handleSubmit(handleSendCode)}
          >
            <Text>{t('forgotPassword.sendCode.submit')}</Text>
          </Button>
          <View className="pb-8 justify-center items-center flex flex-row gap-1">
            <Text>{t('forgotPassword.sendCode.rememberPassword')}</Text>
            <TouchableOpacity>
              <Text bold onPress={handleBack} testID="back-button">
                {t('forgotPassword.sendCode.login')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Form>
  )
}
