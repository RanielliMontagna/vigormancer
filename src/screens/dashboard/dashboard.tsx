import { View } from 'react-native'
import { useTranslation } from 'react-i18next'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { useUser } from '@clerk/clerk-expo'
import colors from 'tailwindcss/colors'

import { Avatar, AvatarFallback, AvatarImage, Button, H3, P, Text } from '@/components'
import { capitalize, getInitials } from '@/utils'
import { DashboardCards } from './cards/cards'
import { router } from 'expo-router'
import { useColorScheme } from '@/hooks'
import { DashboardSummary } from './summary/summary'

export function Dashboard() {
  const { user } = useUser()
  const { t } = useTranslation()
  const { isDarkColorScheme } = useColorScheme()

  function handleGoToNotifications() {
    router.push('notifications')
  }

  return (
    <View className="flex flex-col h-full p-8 gap-8 bg-background" testID="dashboard">
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row gap-2 items-center">
          <Avatar alt={`${user?.username}'s avatar`}>
            <AvatarImage source={{ uri: user?.imageUrl }} />
            <AvatarFallback>
              <Text>{getInitials(user?.username)}</Text>
            </AvatarFallback>
          </Avatar>
          <View>
            <H3 className="text-xl">
              {t('dashboard.title', { name: capitalize(user?.username || '') })}
            </H3>
            <P className="text-sm text-muted-foreground mt-[-4px]">{t('dashboard.subtitle')}</P>
          </View>
        </View>
        <View>
          <Button variant="ghost" size="icon" onPress={handleGoToNotifications}>
            <FontAwesome6
              name="bell"
              size={24}
              color={isDarkColorScheme ? colors.white : colors.black}
            />
          </Button>
        </View>
      </View>
      <DashboardCards />
      <DashboardSummary />
    </View>
  )
}
