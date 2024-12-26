import { View } from 'react-native'
import { useAuth } from '@clerk/clerk-react'

import { Button, Text } from '@/components'

export function Profile() {
  const { signOut } = useAuth()

  return (
    <View className="flex flex-col h-full p-8 gap-8 bg-background">
      <Text>Profile</Text>
      <Button onPress={() => signOut()}>
        <Text>Sign Out</Text>
      </Button>
    </View>
  )
}
