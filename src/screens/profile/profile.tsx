import { View } from 'react-native'
import { useAuth } from '@clerk/clerk-react'

import { Button, Text } from '@/components'

export function Profile() {
  const { signOut } = useAuth()

  return (
    <View>
      <Text>Profile</Text>
      <Button onPress={() => signOut()}>
        <Text>Sign Out</Text>
      </Button>
    </View>
  )
}
