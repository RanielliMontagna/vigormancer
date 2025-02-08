import { useTranslation } from 'react-i18next'
import { router } from 'expo-router'
import { View } from 'react-native'
import { useFormContext } from 'react-hook-form'

import { OnboardingSchema } from '../onboarding.schema'
import { BackButton, Button, H2, P, RulerPicker, Text } from '@/components'
import { maxWeight, minWeight } from '@/constants/constants'

export function Weight() {
  const { t } = useTranslation()
  const { watch, setValue } = useFormContext<OnboardingSchema>()

  const selectedWeight = watch('weight')

  return (
    <View className="flex flex-col h-full p-8 gap-4 bg-background" testID="weight">
      <View className="flex flex-col flex-1 gap-4">
        <BackButton />
        <View>
          <H2>{t('onboarding.weight.title')}</H2>
          <P className="text-muted-foreground">{t('onboarding.weight.subtitle')}</P>
        </View>
        <View className="flex-1">
          <RulerPicker
            min={minWeight}
            max={maxWeight}
            step={0.1}
            initialValue={selectedWeight}
            fractionDigits={1}
            unit="kg"
            onValueChangeEnd={(number) => setValue('weight', Number(number))}
          />
        </View>
      </View>
      <View>
        <Button
          size="lg"
          onPress={() => router.push('onboarding/height')}
          disabled={!selectedWeight}
          testID="weight-button"
        >
          <Text>{t('onboarding.weight.next')}</Text>
        </Button>
      </View>
    </View>
  )
}
