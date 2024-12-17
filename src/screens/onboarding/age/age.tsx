import { useState } from 'react'
import { router } from 'expo-router'
import { View } from 'react-native'
import { useFormContext } from 'react-hook-form'

import { OnboardingSchema } from '../onboarding.schema'

import { BackButton, Button, H2, P, Text, WheelPicker } from '@/components'

export function Age() {
  const { watch, setValue } = useFormContext<OnboardingSchema>()

  const selectedAge = watch('age')

  const initialData = Array.from({ length: 87 }, (_, i) => `${i + 14} years old`)
  const [ageWheelIndex, setAgeWheelIndex] = useState(selectedAge - 14)

  return (
    <View className="flex flex-col h-full p-8 gap-4 bg-background">
      <View className="flex flex-col flex-1 gap-4">
        <BackButton />
        <View>
          <H2>How Old Are You?</H2>
          <P className="text-muted-foreground">
            Your age helps us create a plan that evolves with you.
          </P>
        </View>
        <View className="flex-1">
          <WheelPicker
            initialSelectedIndex={ageWheelIndex}
            data={initialData}
            selectedIndex={ageWheelIndex}
            onChangeValue={(value) => {
              setAgeWheelIndex(value)
              setValue('age', value + 14)
            }}
            infiniteScroll={false}
            restElements={4}
            elementHeight={50}
          />
        </View>
      </View>

      <View>
        <Button size="lg" onPress={() => router.push('onboarding/weight')} disabled={!selectedAge}>
          <Text>Next</Text>
        </Button>
      </View>
    </View>
  )
}
