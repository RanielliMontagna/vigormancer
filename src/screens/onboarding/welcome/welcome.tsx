import { Image, View } from 'react-native'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import WelcomeImage from '@/assets/images/onboarding-welcome.jpg'

import { Button, H3, Text } from '@/components'
import { useOnboardingContext } from '../onboarding.context'

export function Welcome() {
  const { nextStep } = useOnboardingContext()

  return (
    <View className="flex flex-col h-full bg-background">
      <View className="h-96">
        <Image source={WelcomeImage} className="h-96 w-full object-cover rounded-b-[32px]" />
      </View>
      <View className="gap-2 flex-1 justify-center px-8">
        <View className="gap-1">
          <H3 className="text-center">Welcome to</H3>
          <View className="flex flex-row gap-2 items-center mb-4 justify-center">
            <FontAwesome6 name="dumbbell" size={32} color="black" />
            <View className="flex flex-row">
              <Text className="font-bold text-4xl">Vigor</Text>
              <Text className="text-4xl">mancer</Text>
            </View>
          </View>
        </View>
        <Text className="text-center text-muted-foreground">
          Unleash the magic within. Transform your energy, master your strength, and create the best
          version of yourself.
        </Text>
        <Button size="lg" className="mt-4" onPress={nextStep}>
          <Text>Begin your journey</Text>
        </Button>
      </View>
    </View>
  )
}
