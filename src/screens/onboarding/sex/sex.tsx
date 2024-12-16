import { router } from 'expo-router'
import { TouchableOpacity, View } from 'react-native'
import { useFormContext } from 'react-hook-form'
import colors from 'tailwindcss/colors'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { useOnboardingContext } from '../onboarding.context'
import { OnboardingSchema, SexEnum } from '../onboarding.schema'

import { Button, H2, P, Text } from '@/components'
import { cn } from '@/utils'

export function Sex() {
  const { prevStep } = useOnboardingContext()
  const { watch, setValue } = useFormContext<OnboardingSchema>()

  const selectedSex = watch('sex')

  function handleSelectSex(sex: SexEnum) {
    setValue('sex', sex)
  }

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
          <H2>Let’s Get to Know You</H2>
          <P className="text-muted-foreground">
            Tell us about yourself to personalize your path to mastery.
          </P>
        </View>
        <View className="gap-4">
          <TouchableOpacity
            className={cn(
              'border border-stone-400 rounded-xl p-4 flex-row justify-between transition-all',
              selectedSex === SexEnum.Male && 'border-gray-800',
            )}
            onPress={() => handleSelectSex(SexEnum.Male)}
          >
            <View className="flex flex-row gap-4 h-8 items-center">
              <FontAwesome6 name="mars" size={24} />
              <Text className={cn(selectedSex === SexEnum.Male && 'font-bold')}>Male</Text>
            </View>

            <View className={cn('w-8 h-8 rounded-xl justify-center items-center transition-all')}>
              {selectedSex === SexEnum.Male ? (
                <FontAwesome6 name="check-circle" size={20} color={colors.green[500]} />
              ) : (
                <FontAwesome6 name="circle" size={20} color={colors.stone[400]} />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className={cn(
              'border border-stone-400 rounded-xl p-4 flex-row justify-between transition-all',
              selectedSex === SexEnum.Female && 'border-gray-800',
            )}
            onPress={() => handleSelectSex(SexEnum.Female)}
          >
            <View className="flex flex-row gap-4 h-8 items-center">
              <FontAwesome6 name="venus" size={24} />
              <Text className={cn(selectedSex === SexEnum.Female && 'font-bold')}>Female</Text>
            </View>
            <View className={cn('w-8 h-8 rounded-xl justify-center items-center transition-all')}>
              {selectedSex === SexEnum.Female ? (
                <FontAwesome6 name="check-circle" size={20} color={colors.green[500]} />
              ) : (
                <FontAwesome6 name="circle" size={20} color={colors.stone[400]} />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Button size="lg" onPress={() => router.push('onboarding/age')} disabled={!selectedSex}>
          <Text>Next</Text>
        </Button>
      </View>
    </View>
  )
}
