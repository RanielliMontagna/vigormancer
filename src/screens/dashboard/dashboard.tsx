import { View } from 'react-native'
import { useTranslation } from 'react-i18next'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { useUser } from '@clerk/clerk-expo'

import { Button, H2, P } from '@/components'
import { capitalize } from '@/utils'
import { DashboardCards } from './cards/cards'

export function Dashboard() {
  const { user } = useUser()
  const { t } = useTranslation()

  return (
    <View className="flex flex-col h-full p-8 gap-8">
      <View className="flex flex-row justify-between items-center">
        <View>
          <H2>{t('dashboard.title', { name: capitalize(user.username) })}</H2>
          <P>{t('dashboard.subtitle')}</P>
        </View>
        <View>
          <Button variant="ghost" size="icon">
            <FontAwesome6 name="bell" size={24} />
          </Button>
        </View>
      </View>
      <DashboardCards />
    </View>
  )
}
