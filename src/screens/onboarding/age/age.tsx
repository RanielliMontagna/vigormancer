import { TouchableOpacity, View } from 'react-native'
import { useFormContext } from 'react-hook-form'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { useOnboardingContext } from '../onboarding.context'
import { OnboardingSchema } from '../onboarding.schema'

import { Button, H2, P, Text, TextField } from '@/components'

export function Age() {
  const { prevStep, nextStep } = useOnboardingContext()
  const { control, watch } = useFormContext<OnboardingSchema>()

  const selectedAge = watch('age')

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
          <H2>How Old Are You?</H2>
          <P className="text-muted-foreground">
            Your age helps us create a plan that evolves with you.
          </P>
        </View>
        <View>
          <TextField
            control={control}
            name="age"
            size="lg"
            keyboardType="number-pad"
            placeholder="Enter your age"
            maxLength={2}
            endAdornment={selectedAge && <Text>Years</Text>}
          />
        </View>
      </View>

      <View>
        <Button size="lg" onPress={nextStep} disabled={!selectedAge}>
          <Text>Next</Text>
        </Button>
      </View>
    </View>
  )
}
