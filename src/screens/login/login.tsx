import { TouchableOpacity, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useLogin } from './useLogin'

import { Button, Form, H2, P, Text, TextField } from '@/components'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { useColorScheme } from '@/hooks'

export function Login() {
  const { t } = useTranslation()
  const { methods, handleLogin, handleGoogleLogin, handleGoToForgotPassword, handleGoToSignup } =
    useLogin()
  const { isDarkColorScheme } = useColorScheme()

  return (
    <Form {...methods}>
      <View className="flex flex-1 justify-center p-4 bg-background gap-6">
        <View className="flex flex-row gap-2 items-center mb-4">
          <FontAwesome6 name="dumbbell" size={24} color={isDarkColorScheme ? 'white' : 'black'} />
          <View className="flex flex-row">
            <Text className="font-bold text-3xl">Vigor</Text>
            <Text className="text-3xl">mancer</Text>
          </View>
        </View>
        <View>
          <H2>{t('login.title')}</H2>
          <P className="text-muted-foreground">{t('login.subtitle')}</P>
        </View>
        <View className="gap-4">
          <TextField
            control={methods.control}
            name="email"
            placeholder={t('login.emailPlaceholder')}
            size="lg"
          />
          <TextField
            control={methods.control}
            name="password"
            placeholder={t('login.passwordPlaceholder')}
            type="password"
            secureTextEntry={!methods.watch('showPassword')}
            size="lg"
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
          <View className="flex items-end">
            <TouchableOpacity onPress={handleGoToForgotPassword}>
              <Text className="text-sm text-muted-foreground">{t('login.forgotPassword')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="gap-2">
          <Button size="lg" className="mt-4" onPress={methods.handleSubmit(handleLogin)}>
            <Text>{t('login.submit')}</Text>
          </Button>
          <View className="flex flex-row items-center gap-2">
            <View className="flex-1 border-t border-border" />
            <Text>
              <P>{t('login.or')}</P>
            </Text>
            <View className="flex-1 border-t border-border" />
          </View>
          <Button
            size="lg"
            variant="outline"
            startIcon={
              <FontAwesome6 name="google" size={16} color={isDarkColorScheme ? 'white' : 'black'} />
            }
            onPress={handleGoogleLogin}
          >
            <Text>{t('login.googleLogin')}</Text>
          </Button>
        </View>
        <View className="pb-8 justify-center items-center flex flex-row gap-1">
          <Text>{t('login.dontHaveAccount')}</Text>
          <TouchableOpacity>
            <Text className="font-bold" onPress={handleGoToSignup}>
              {t('login.signup')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Form>
  )
}
