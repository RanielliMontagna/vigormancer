import { TouchableOpacity, View } from 'react-native'
import { useFormContext } from 'react-hook-form'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { OnboardingSchema } from '../onboarding.schema'
import { useOnboardingContext } from '../onboarding.context'

import { Button, H2, P, Text, TextField } from '@/components'

export function Weight() {
  const { prevStep, nextStep } = useOnboardingContext()
  const { control, watch } = useFormContext<OnboardingSchema>()

  const selectedWeight = watch('weight')

  return (
    <View className="flex flex-col h-full p-8 gap-4 bg-background">
      <View className="flex flex-col flex-1 gap-4">
        <View>
          <TouchableOpacity
            onPress={prevStep}
            className="border border-border rounded-xl w-12 h-12 justify-center items-center pr-[2px]"
          >
            <FontAwesome6 name="angle-left" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <H2>What's Your Current Weight?</H2>
          <P className="text-muted-foreground">
            Every journey begins with a solid foundation. Let's record where you stand today.
          </P>
        </View>
        <View>
          <TextField
            control={control}
            name="weight"
            size="lg"
            keyboardType="number-pad"
            placeholder="Enter your weight (kg)"
            maxLength={2}
            endAdornment={selectedWeight && <Text>kg</Text>}
          />
        </View>
      </View>
      <View>
        <Button size="lg" onPress={nextStep} disabled={!selectedWeight}>
          <Text>Next</Text>
        </Button>
      </View>
    </View>
  )
}
