import { TouchableOpacity, View } from 'react-native'
import { useFormContext } from 'react-hook-form'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { OnboardingSchema } from '../onboarding.schema'
import { useOnboardingContext } from '../onboarding.context'

import { Button, H2, P, Text, TextField } from '@/components'

export function Height() {
  const { prevStep, nextStep } = useOnboardingContext()
  const { control, watch } = useFormContext<OnboardingSchema>()

  const selectedHeight = watch('height')

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
          <H2>What's Your Height?</H2>
          <P className="text-muted-foreground">
            Your height helps us tailor your transformation process.
          </P>
        </View>
        <View>
          <TextField
            control={control}
            name="height"
            size="lg"
            keyboardType="number-pad"
            placeholder="Enter your height (cm)"
            maxLength={2}
            endAdornment={selectedHeight && <Text>kg</Text>}
          />
        </View>
      </View>
      <View>
        <Button size="lg" onPress={nextStep} disabled={!selectedHeight}>
          <Text>Next</Text>
        </Button>
      </View>
    </View>
  )
}
