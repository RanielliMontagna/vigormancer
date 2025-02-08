import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import colors from 'tailwindcss/colors'

import { Button, Form, H2, Logo, P, Text, TextField } from '@/components'
import { useColorScheme } from '@/hooks'

import { useSignup } from './useSignup'

export function SignUp() {
  const { t } = useTranslation()

  const { methods, handleBack, onSignUpPress, handleGoogleSignup } = useSignup()
  const { isDarkColorScheme } = useColorScheme()

  return (
    <Form {...methods}>
      <View className="flex flex-1 p-4 bg-background gap-6" testID="sign-up">
        <View>
          <TouchableOpacity
            onPress={handleBack}
            className="border border-border rounded-xl w-12 h-12 justify-center items-center pr-[2px]"
          >
            <FontAwesome6
              name="angle-left"
              size={24}
              color={isDarkColorScheme ? colors.white : colors.black}
            />
          </TouchableOpacity>
        </View>
        <View className="flex flex-row gap-2 items-center mb-4">
          <Logo orientation="horizontal" />
        </View>
        <View>
          <H2>{t('signup.title')}</H2>
          <P className="text-muted-foreground">{t('signup.subtitle')}</P>
        </View>
        <View className="gap-4">
          <TextField
            testID="username"
            control={methods.control}
            name="username"
            placeholder={t('signup.usernamePlaceholder')}
            size="lg"
          />
          <TextField
            testID="email"
            control={methods.control}
            name="email"
            placeholder={t('signup.emailPlaceholder')}
            size="lg"
          />
          <TextField
            testID="password"
            control={methods.control}
            name="password"
            placeholder={t('signup.passwordPlaceholder')}
            type="password"
            secureTextEntry={!methods.watch('showPassword')}
            size="lg"
            endAdornment={
              <TouchableOpacity
                testID="toggle-password"
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
            testID="confirm-password"
            control={methods.control}
            name="confirmPassword"
            placeholder={t('signup.confirmPasswordPlaceholder')}
            type="password"
            secureTextEntry={!methods.watch('showConfirmPassword')}
            size="lg"
            endAdornment={
              <TouchableOpacity
                testID="toggle-confirm-password"
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
        <View className="gap-2">
          <Button
            testID="sign-up-button"
            size="lg"
            className="mt-4"
            onPress={methods.handleSubmit(onSignUpPress)}
          >
            <Text>{t('signup.submit')}</Text>
          </Button>
          <View className="flex flex-row items-center gap-2">
            <View className="flex-1 border-t border-border" />
            <Text>
              <P>{t('signup.or')}</P>
            </Text>
            <View className="flex-1 border-t border-border" />
          </View>
          <Button
            testID="google-signup"
            size="lg"
            variant="outline"
            startIcon={
              <FontAwesome6
                name="google"
                size={16}
                color={isDarkColorScheme ? colors.white : colors.black}
              />
            }
            onPress={handleGoogleSignup}
          >
            <Text>{t('signup.googleSignup')}</Text>
          </Button>
        </View>
        <View className="pb-8 justify-center items-center flex flex-row ">
          <Text>{t('signup.alreadyHaveAccount')} </Text>
          <TouchableOpacity>
            <Text bold onPress={handleBack} testID="back-to-login">
              {t('signup.login')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Form>
  )
}
