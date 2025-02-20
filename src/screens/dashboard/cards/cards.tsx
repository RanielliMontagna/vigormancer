import { View } from 'react-native'
import colors from 'tailwindcss/colors'
import { useUser } from '@clerk/clerk-expo'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'

import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { useColorScheme } from '@/hooks'
import { Card, CardContent, H2, P, Text } from '@/components'
import { getLatestWeight, getUserStreak } from '@/db'
import { getWeightDifferenceLastWeek } from '@/db/controllers/user/get-weight-difference-last-week'
import { cn } from '@/utils'

export function DashboardCards() {
  const { isDarkColorScheme } = useColorScheme()
  const { user } = useUser()
  const { t } = useTranslation()

  const weightQuery = useQuery({
    queryKey: ['weight'],
    queryFn: () => getLatestWeight(user.id),
    gcTime: 0,
  })

  const weightDifferenceLastWeekQuery = useQuery({
    queryKey: ['weightDifferenceLastWeek'],
    queryFn: () => getWeightDifferenceLastWeek(user.id),
    gcTime: 0,
  })

  const streakQuery = useQuery({
    queryKey: ['streak'],
    queryFn: () => getUserStreak(user.id),
    gcTime: 0,
  })

  const streakCount = streakQuery.data?.currentStreak ?? 0
  const difference = weightDifferenceLastWeekQuery.data

  return (
    <View className="gap-4">
      <Card className="bg-card">
        <CardContent>
          <View className="flex-row items-center gap-2">
            <View className="justify-center items-center p-2">
              <FontAwesome6 name="fire" size={32} color={colors.red[500]} />
            </View>
            <View>
              <View className="flex-row items-end gap-1">
                <H2 className="mb-[-4px]">{streakCount}</H2>
                <Text className="text-sm p-0 m-0">
                  {t('dashboard.streak', { count: streakCount })}
                </Text>
              </View>
              <P className="flex-1 text-sm text-muted-foreground">
                {t('dashboard.streakMessage', { count: streakCount })}
              </P>
            </View>
          </View>
        </CardContent>
      </Card>
      <Card className="bg-card">
        <CardContent>
          <View className="flex-row items-center gap-2">
            <View className="justify-center items-center p-2">
              <FontAwesome5
                name="weight"
                size={32}
                color={isDarkColorScheme ? colors.white : colors.black}
              />
            </View>
            <View>
              <View className="flex-row items-end gap-1">
                <H2 className="mb-[-4px]">{weightQuery.data?.current ?? 0}</H2>
                <P className="text-sm p-0 m-0">kg</P>
              </View>
              <P
                className={cn(
                  'flex-1 text-sm',
                  difference?.weightDifference < 0 && 'text-green-500',
                )}
              >
                {difference?.weightDifference} kg {t('dashboard.since_last_week')}
              </P>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  )
}
