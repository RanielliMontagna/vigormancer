import React from 'react'

import { Login as LoginContainer } from '@/screens'
import { useAuth } from '@clerk/clerk-expo'
import { Button, Text } from '@/components'

export default function Index() {
  const { isSignedIn, signOut } = useAuth()

  console.log('isSignedIn', isSignedIn)

  if (!isSignedIn) {
    return <LoginContainer />
  }

  return (
    <>
      <Button
        onPress={() => {
          signOut()
        }}
      >
        <Text>Sign Out</Text>
      </Button>
    </>
  )
}
