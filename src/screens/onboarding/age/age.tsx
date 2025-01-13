import { router } from 'expo-router'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'

import { OnboardingSchema } from '../onboarding.schema'

import { BackButton, Button, H2, P, Text, RulerPicker } from '@/components'
import { maxAge, minAge } from '@/constants/constants'

export function Age() {
  const { t } = useTranslation()
  const { watch, setValue } = useFormContext<OnboardingSchema>()

  const selectedAge = watch('age')

  return (
    <View className="flex flex-col h-full p-8 gap-4 bg-background" testID="age">
      <View className="flex flex-col flex-1 gap-4">
        <BackButton />
        <View>
          <H2>{t('onboarding.age.title')}</H2>
          <P className="text-muted-foreground">{t('onboarding.age.subtitle')}</P>
        </View>
        <View>
          <RulerPicker
            min={minAge}
            max={maxAge}
            step={1}
            initialValue={selectedAge}
            onValueChangeEnd={(number) => setValue('age', Number(number))}
            unit={t('onboarding.age.yearsOld')}
          />
        </View>
      </View>

      <View>
        <Button size="lg" onPress={() => router.push('onboarding/weight')} disabled={!selectedAge}>
          <Text>{t('onboarding.age.next')}</Text>
        </Button>
      </View>
    </View>
  )
}
