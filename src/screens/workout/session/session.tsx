import { View } from 'react-native'

import { SessionSteps } from './session.types'
import { SessionProvider, useSessionContext } from './session.context'

import { Ready } from './ready/ready'
import { Workout } from './workout/workout'
import { Finish } from './finish/finish'

function Session() {
  const { step } = useSessionContext()

  return (
    <View className="h-full p-8 gap-4 bg-background" testID="session">
      {step === SessionSteps.READY && <Ready />}
      {step === SessionSteps.WORKOUT && <Workout />}
      {step === SessionSteps.FINISHED && <Finish />}
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
