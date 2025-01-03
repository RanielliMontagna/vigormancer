import { View } from 'react-native'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { Button, Text } from '@/components'
import { useColorScheme } from '@/hooks'
import { useTranslation } from 'react-i18next'

export function Bmi() {
  const { t } = useTranslation()
  const { isDarkColorScheme } = useColorScheme()

  return (
    <View>
      <View className="flex-row justify-between items-center">
        <Text className="flex-1">{t('progression.bmi.title')}</Text>
        <Button className="gap-2" size="sm">
          <FontAwesome6 name="edit" size={16} color={isDarkColorScheme ? 'black' : 'white'} />
          <Text>{t('progression.bmi.action')}</Text>
        </Button>
      </View>
    </View>
  )
}
