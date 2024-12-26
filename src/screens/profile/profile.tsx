import { View } from 'react-native'
import { useAuth, useUser } from '@clerk/clerk-react'

import { Avatar, AvatarFallback, AvatarImage, Button, H2, H3, P, Text } from '@/components'
import { useTranslation } from 'react-i18next'
import { getInitials } from '@/utils'

export function Profile() {
  const { user } = useUser()
  const { signOut } = useAuth()
  const { t } = useTranslation()

  return (
    <View className="flex flex-col h-full p-8 gap-8 bg-background">
      <View className="flexflex-col">
        <H2>{t('profile.title')}</H2>
        <P className="text-muted-foreground text-sm">{t('profile.subtitle')}</P>
      </View>
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
        <View className="flex-row gap-8 bg-card p-2 rounded-3xl w-full justify-center items-center elevation-sm">
          <View>
            <View className="flex-row items-center gap-1">
              <H3>62</H3>
              <Text>kg</Text>
            </View>
            <View className="items-center">
              <Text className="text-muted-foreground text-sm">{t('profile.weight')}</Text>
            </View>
          </View>
          <View className="w-[1px] h-10 bg-muted-foreground"></View>
          <View>
            <View className="flex-row items-center gap-1">
              <H3>173</H3>
              <Text>cm</Text>
            </View>
            <View className="items-center">
              <Text className="text-muted-foreground text-sm">{t('profile.height')}</Text>
            </View>
          </View>
        </View>
      </View>
      <Button onPress={() => signOut()}>
        <Text>Sign Out</Text>
      </Button>
    </View>
  )
}
