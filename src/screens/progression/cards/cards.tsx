import { useQuery } from '@tanstack/react-query'
import { useUser } from '@clerk/clerk-expo'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { H2, P } from '@/components'
import { useColorScheme } from '@/hooks'
import { getUserStreak } from '@/db'

export function Cards() {
  const { isDarkColorScheme } = useColorScheme()
  const { t } = useTranslation()
  const { user } = useUser()

  const streakQuery = useQuery({
    queryKey: ['streak'],
    queryFn: () => getUserStreak(user.id),
    gcTime: 0,
  })

  const streakCount = streakQuery.data?.currentStreak ?? 0

  return (
    <View className="flex-row gap-4 justify-center">
      <View className="flex-col flex-1 bg-card rounded-xl items-center justify-center py-4">
        <View className="flex-row gap-2 items-center">
          <FontAwesome6 name="dumbbell" size={18} color={isDarkColorScheme ? 'white' : 'black'} />
          <H2>24</H2>
        </View>
        <P className="text-muted-foreground text-center">{t('progression.cards.workouts')}</P>
      </View>
      <View className="flex-col flex-1 bg-card rounded-xl items-center justify-center">
        <View className="flex-row gap-2 items-center">
          <FontAwesome6 name="fire" size={18} color={isDarkColorScheme ? 'white' : 'black'} />
          <H2>{streakCount}</H2>
        </View>
        <P className="text-muted-foreground text-center">{t('progression.cards.streak')}</P>
      </View>
    </View>
  )
}
