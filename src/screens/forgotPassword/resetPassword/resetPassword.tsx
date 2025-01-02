import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { BackButton, Button, Form, H2, P, Text, TextField } from '@/components'

import { useResetPassword } from './useResetPassword'
import { useForgotPasswordContext } from '../forgotPassword.context'

export function ResetPassword() {
  const { t } = useTranslation()

  const { prevStep } = useForgotPasswordContext()
  const { methods, handleResetPassword } = useResetPassword()

  return (
    <Form {...methods}>
      <View className="flex flex-1 justify-center p-4 bg-background gap-6" testID="reset-password">
        <BackButton onPress={prevStep} />
        <View>
          <H2>{t('forgotPassword.resetPassword.title')}</H2>
          <P className="text-muted-foreground">{t('forgotPassword.resetPassword.subtitle')}</P>
        </View>
        <View className="gap-4">
          <TextField
            control={methods.control}
            name="password"
            placeholder={t('forgotPassword.resetPassword.passwordPlaceholder')}
            size="lg"
            secureTextEntry={!methods.watch('showPassword')}
            endAdornment={
              <TouchableOpacity
                onPress={() => methods.setValue('showPassword', !methods.watch('showPassword'))}
              >
                {methods.watch('showPassword') ? (
                  <FontAwesome6 name="eye-slash" size={16} color="gray" />
                ) : (
                  <FontAwesome6 name="eye" size={16} color="gray" />
                )}
              </TouchableOpacity>
            }
          />
          <TextField
            control={methods.control}
            name="confirmPassword"
            placeholder={t('forgotPassword.resetPassword.confirmPasswordPlaceholder')}
            size="lg"
            secureTextEntry={!methods.watch('showConfirmPassword')}
            endAdornment={
              <TouchableOpacity
                onPress={() =>
                  methods.setValue('showConfirmPassword', !methods.watch('showConfirmPassword'))
                }
              >
                {methods.watch('showConfirmPassword') ? (
                  <FontAwesome6 name="eye-slash" size={16} color="gray" />
                ) : (
                  <FontAwesome6 name="eye" size={16} color="gray" />
                )}
              </TouchableOpacity>
            }
          />
        </View>
        <View className="gap-4">
          <Button
            testID="reset-password-submit"
            size="lg"
            className="mt-4"
            onPress={methods.handleSubmit(handleResetPassword)}
          >
            <Text>{t('forgotPassword.resetPassword.submit')}</Text>
          </Button>
        </View>
      </View>
    </Form>
  )
}
