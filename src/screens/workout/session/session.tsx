import { View } from 'react-native'

import { SessionSteps } from './session.types'
import { SessionProvider, useSessionContext } from './session.context'

import { Ready } from './ready/ready'
import { Workout } from './workout/workout'

function Session() {
  const { step } = useSessionContext()

  console.log(step)

  return (
    <View className="h-full p-8 gap-4 bg-background" testID="session">
      {step === SessionSteps.READY && <Ready />}
      {step === SessionSteps.WORKOUT && <Workout />}
    </View>
  )
}

function SessionWithProvider() {
  return (
    <SessionProvider>
      <Session />
    </SessionProvider>
  )
}

export { SessionWithProvider as Session }
