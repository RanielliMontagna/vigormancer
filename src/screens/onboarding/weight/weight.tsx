import { useState } from 'react'
import { router } from 'expo-router'
import { View } from 'react-native'
import { useFormContext } from 'react-hook-form'

import { OnboardingSchema } from '../onboarding.schema'
import { BackButton, Button, H2, P, Text, WheelPicker } from '@/components'

export function Weight() {
  const { watch, setValue } = useFormContext<OnboardingSchema>()

  const selectedWeight = watch('weight')

  const initialData = Array.from({ length: 121 }, (_, i) => `${i + 30} kg`)
  const [weightWheelIndex, setWeightWheelIndex] = useState(selectedWeight - 30)

  return (
    <View className="flex flex-col h-full p-8 gap-4 bg-background">
      <View className="flex flex-col flex-1 gap-4">
        <BackButton />
        <View>
          <H2>What's Your Current Weight?</H2>
          <P className="text-muted-foreground">
            Every journey begins with a solid foundation. Let's record where you stand today.
          </P>
        </View>
        <View className="flex-1">
          <WheelPicker
            initialSelectedIndex={weightWheelIndex}
            data={initialData}
            selectedIndex={weightWheelIndex}
            onChangeValue={(value) => {
              setWeightWheelIndex(value)
              setValue('weight', value + 30)
            }}
            infiniteScroll={false}
            restElements={4}
            elementHeight={50}
          />
        </View>
      </View>
      <View>
        <Button
          size="lg"
          onPress={() => router.push('onboarding/height')}
          disabled={!selectedWeight}
        >
          <Text>Next</Text>
        </Button>
      </View>
    </View>
  )
}
