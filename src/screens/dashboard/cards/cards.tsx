import { View } from 'react-native'
import colors from 'tailwindcss/colors'
import { useUser } from '@clerk/clerk-expo'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'

import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { useColorScheme } from '@/hooks'
import { Card, CardContent, H2, P, Text } from '@/components'
import { getLatestWeight } from '@/db'

export function DashboardCards() {
  const { isDarkColorScheme } = useColorScheme()
  const { user } = useUser()
  const { t } = useTranslation()

  const weightQuery = useQuery({ queryKey: ['weight'], queryFn: () => getLatestWeight(user.id) })

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
                <H2 className="mb-[-4px]">0</H2>
                <Text className="text-sm p-0 m-0">{t('dashboard.streak', { count: 0 })}</Text>
              </View>
              <P className="flex-1 text-sm text-muted-foreground">
                {t('dashboard.streakMessage', { count: 0 })}
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
              <P className="flex-1 text-sm text-green-500">
                -1,2 kg {t('dashboard.since_last_week')}
              </P>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  )
}
