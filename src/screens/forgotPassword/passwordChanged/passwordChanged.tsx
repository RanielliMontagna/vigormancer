import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { useForgotPasswordContext } from '../forgotPassword.context'
import { Button, H2, P, Text } from '@/components'

import colors from 'tailwindcss/colors'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

export function PasswordChanged() {
  const { t } = useTranslation()
  const { nextStep } = useForgotPasswordContext()

  return (
    <View className="flex flex-1 justify-center p-4 bg-background gap-10">
      <View className="flex justify-center items-center text-center">
        <MaterialCommunityIcons name="check-decagram" size={100} color={colors.green[400]} />
      </View>
      <View className="gap-1">
        <H2 className="text-center">{t('forgotPassword.passwordChanged.title')}</H2>
        <P className="text-center text-muted-foreground">
          {t('forgotPassword.passwordChanged.subtitle')}
        </P>
      </View>
      <View>
        <Button size="lg" onPress={nextStep}>
          <Text>{t('forgotPassword.passwordChanged.submit')}</Text>
        </Button>
      </View>
    </View>
  )
}
