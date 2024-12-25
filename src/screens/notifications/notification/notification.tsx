import { useMemo } from 'react'
import { View } from 'react-native'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { Text } from '@/components'
import { cn } from '@/utils'

export enum NotificationType {
  achievement = 'achievement',
  reminder = 'reminder',
  streak = 'streak',
}

interface NotificationProps {
  /**
   * @description The title of the notification to be displayed
   * @example 'Congratulations'
   */
  title: string

  /**
   * @description The description of the notification to be displayed
   * @example 'You have completed your first workout'
   */
  description: string

  /**
   * @description If the notification already has been viewed
   * @default false
   */
  viewed?: boolean

  /**
   * @description The type of the notification to be displayed (achievement, reminder, streak)
   */
  type: NotificationType
}

export function Notification({ type, title, description, viewed }: NotificationProps) {
  const iconView = useMemo(() => {
    switch (type) {
      case NotificationType.achievement:
        return (
          <View className="rounded-full bg-green-500 w-12 h-12 flex items-center justify-center">
            <FontAwesome6 name="trophy" size={20} color="white" />
          </View>
        )
      case NotificationType.reminder:
        return (
          <View className="rounded-full bg-orange-400 w-12 h-12 flex items-center justify-center">
            <FontAwesome6 name="lightbulb" solid size={20} color="white" />
          </View>
        )
      case NotificationType.streak:
        return (
          <View className="rounded-full bg-red-600 w-12 h-12 flex items-center justify-center">
            <FontAwesome6 name="fire" size={20} color="white" />
          </View>
        )
    }
  }, [])

  return (
    <View
      className={cn(
        'flex flex-row bg-background p-3 rounded-full gap-2 elevation-sm',
        viewed ? 'opacity-90' : 'opacity-100',
      )}
    >
      {iconView}
      <View className="flex flex-1 flex-col">
        <Text>{title}</Text>
        <Text className="text-muted-foreground text-sm">{description}</Text>
      </View>
      <View className="flex items-center pr-4">
        {!viewed && <View className="rounded-full bg-blue-600 w-4 h-4" />}
      </View>
    </View>
  )
}
