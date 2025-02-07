import { useTranslation } from 'react-i18next'
import { router } from 'expo-router'
import { View } from 'react-native'
import { useFormContext } from 'react-hook-form'

import { OnboardingSchema } from '../onboarding.schema'

import { BackButton, Button, H2, P, RulerPicker, Text } from '@/components'
import { maxHeight, minHeight } from '@/constants/constants'

export function Height() {
  const { t } = useTranslation()
  const { watch, setValue } = useFormContext<OnboardingSchema>()

  const selectedHeight = watch('height')

  return (
    <View className="flex flex-col h-full p-8 gap-4 bg-background" testID="height">
      <View className="flex flex-col flex-1 gap-4">
        <BackButton />
        <View>
          <H2>{t('onboarding.height.title')}</H2>
          <P className="text-muted-foreground">{t('onboarding.height.subtitle')}</P>
        </View>
        <View className="flex-1">
          <RulerPicker
            min={minHeight}
            max={maxHeight}
            step={1}
            initialValue={selectedHeight}
            unit="cm"
            /* c8 ignore next */
            onValueChangeEnd={(number) => setValue('height', Number(number))}
          />
        </View>
      </View>
      <View>
        <Button
          size="lg"
          onPress={() => router.push('onboarding/goal')}
          disabled={!selectedHeight}
          testID="height-button"
        >
          <Text>{t('onboarding.height.next')}</Text>
        </Button>
      </View>
    </View>
  )
}
