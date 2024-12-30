import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { BackButton, H2, P } from '@/components'
import { Notification, NotificationType } from './notification/notification'

export function Notifications() {
  const { t } = useTranslation()

  return (
    <View className="flex flex-col h-full p-8 gap-8 bg-background">
      <BackButton />
      <View>
        <H2>{t('notifications.title')}</H2>
        <P className="text-muted-foreground text-sm">{t('notifications.subtitle')}</P>
      </View>
      <View className="flex flex-col gap-4">
        <Notification
          type={NotificationType.achievement}
          title="Deadlift Workout Completed!"
          description="January 10 - 3:00 PM"
        />
        <Notification
          type={NotificationType.reminder}
          title="Remember Your Exercise Session"
          description="January 10 - 3:00 PM"
          viewed
        />
        <Notification
          type={NotificationType.streak}
          title="Congratulations, Master!"
          description="10 days strong! Keep the flame burning!"
          viewed
        />
      </View>
    </View>
  )
}
