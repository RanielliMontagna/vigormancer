import { Image, View } from 'react-native'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import FinishImage from '@/assets/images/onboarding-finish.jpg'

import { useOnboardingContext } from '../onboarding.context'
import { Button, H2, H3, P, Text } from '@/components'

export function Ready() {
  const { nextStep } = useOnboardingContext()

  return (
    <View className="flex flex-col h-full bg-background">
      <View className="h-96">
        <Image source={FinishImage} className="h-96 w-full object-cover rounded-b-[32px]" />
      </View>
      <View className="gap-2 flex-1 justify-center px-8">
        <View className="flex flex-row gap-2 items-center mb-4 justify-center">
          <FontAwesome6 name="dumbbell" size={24} color="black" />
          <View className="flex flex-row">
            <Text className="font-bold text-2xl">Vigor</Text>
            <Text className="text-2xl">mancer</Text>
          </View>
        </View>
        <H2 className="text-center">You’re Ready to Begin!</H2>
        <P className="text-center text-muted-foreground">
          Your path as a Vigormancer starts now. Every step, every rep, every moment of effort
          brings you closer to mastering your strength and unlocking your full potential.
        </P>
        <View>
          <Button size="lg" className="mt-4" onPress={nextStep}>
            <Text>Start Training</Text>
          </Button>
          <Text className="text-sm text-center text-muted-foreground mt-2">
            Remember, progress is the real magic. Let’s make it happen!
          </Text>
        </View>
      </View>
    </View>
  )
}
