import { View } from 'react-native'
import { useTranslation } from 'react-i18next'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import colors from 'tailwindcss/colors'

import { BackButton, Button, Form, H2, P, Text, TextField } from '@/components'
import { useColorScheme } from '@/hooks'

import { useVerifyCode } from './useVerifyCode'

export function VerifyCode() {
  const { t } = useTranslation()

  const { methods, onVerifyPress } = useVerifyCode()
  const { isDarkColorScheme } = useColorScheme()

  return (
    <Form {...methods}>
      <View className="flex flex-1 p-4 bg-background gap-6">
        <BackButton />
        <View className="flex flex-row gap-2 items-center mb-4">
          <FontAwesome6
            name="dumbbell"
            size={24}
            color={isDarkColorScheme ? colors.white : colors.black}
          />
          <View className="flex flex-row">
            <Text bold className="text-3xl">
              Vigor
            </Text>
            <Text className="text-3xl">mancer</Text>
          </View>
        </View>
        <View>
          <H2>{t('signup.codeTitle')}</H2>
          <P className="text-muted-foreground">{t('signup.codeSubtitle')}</P>
        </View>
        <View className="gap-4">
          <TextField
            control={methods.control}
            name="code"
            placeholder={t('signup.codePlaceholder')}
            keyboardType="numeric"
            textContentType="oneTimeCode"
            maxLength={6}
          />
        </View>
        <View className="gap-2">
          <Button size="lg" className="mt-4" onPress={methods.handleSubmit(onVerifyPress)}>
            <Text>{t('signup.submit')}</Text>
          </Button>
        </View>
      </View>
    </Form>
  )
}
