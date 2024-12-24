import { View } from 'react-native'
import { useTranslation } from 'react-i18next'

import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { Card, CardContent, H2, P, Text } from '@/components'
import colors from 'tailwindcss/colors'

export function DashboardCards() {
  const { t } = useTranslation()

  return (
    <View className="gap-4">
      <Card>
        <CardContent>
          <View className="flex-row items-center gap-2">
            <View className="justify-center items-center p-2">
              <FontAwesome6 name="fire" size={32} color={colors.red[500]} />
            </View>
            <View>
              <H2 className="mb-[-4px]">0</H2>
              <P className="text-sm">{t('dashboard.streak', { count: 0 })}</P>
            </View>
          </View>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <View className="flex-row items-center gap-2">
            <View className="justify-center items-center p-2">
              <FontAwesome5 name="weight" size={32} />
            </View>
            <View>
              <View className="flex-row items-end gap-1">
                <H2 className="mb-[-4px]">72,4</H2>
                <Text className="text-sm p-0 m-0">kg</Text>
              </View>
              <P className="text-sm text-green-500">-1,2 kg {t('dashboard.since_last_week')}</P>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  )
}
