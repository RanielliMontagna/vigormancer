import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useUser } from '@clerk/clerk-expo'

import { Avatar, AvatarFallback, AvatarImage, H3, P, Text } from '@/components'
import { getInitials } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { getHeight, getLastestWeight } from '@/db'

export function UserInformations() {
  const { t } = useTranslation()
  const { user } = useUser()

  const weightQuery = useQuery({ queryKey: ['weight'], queryFn: () => getLastestWeight(user.id) })
  const heightQuery = useQuery({ queryKey: ['height'], queryFn: () => getHeight(user.id) })

  return (
    <View className="flex-col items-center gap-2">
      <Avatar alt={`${user?.username}'s avatar`} className="w-24 h-24">
        <AvatarImage source={{ uri: user?.imageUrl }} />
        <AvatarFallback>
          <Text>{getInitials(user?.username)}</Text>
        </AvatarFallback>
      </Avatar>
      <View>
        <H3 className="text-center">{user?.username}</H3>
        <P className="text-center text-muted-foreground text-sm">
          {user?.primaryEmailAddress?.emailAddress}
        </P>
      </View>
      <View className="flex-row gap-8 bg-card p-2 rounded-2xl w-full justify-center items-center elevation-sm">
        <View>
          <View className="flex-row items-center gap-1">
            <H3>{weightQuery.data.current}</H3>
            <Text>kg</Text>
          </View>
          <View className="items-center">
            <Text className="text-muted-foreground text-sm">{t('profile.weight')}</Text>
          </View>
        </View>
        <View className="w-[1px] h-10 bg-muted-foreground"></View>
        <View>
          <View className="flex-row items-center gap-1">
            <H3>{heightQuery.data}</H3>
            <Text>cm</Text>
          </View>
          <View className="items-center">
            <Text className="text-muted-foreground text-sm">{t('profile.height')}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
