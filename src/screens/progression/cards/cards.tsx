import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { H2, P } from '@/components'
import { useColorScheme } from '@/hooks'

export function Cards() {
  const { isDarkColorScheme } = useColorScheme()
  const { t } = useTranslation()

  return (
    <View className="flex-row bg-primary-foreground rounded-xl justify-center gap-16 py-4 elevation-sm">
      <View className="flex-col">
        <View className="flex-row gap-2 items-center">
          <FontAwesome6 name="dumbbell" size={18} color={isDarkColorScheme ? 'white' : 'black'} />
          <H2>24</H2>
        </View>
        <P className="text-muted-foreground text-center">{t('progression.cards.workouts')}</P>
      </View>
      <View className="flex-col">
        <View className="flex-row gap-2 items-center">
          <FontAwesome6 name="fire" size={18} color={isDarkColorScheme ? 'white' : 'black'} />
          <H2>24</H2>
        </View>
        <P className="text-muted-foreground text-center">{t('progression.cards.streak')}</P>
      </View>
    </View>
  )
}
