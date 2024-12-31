import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { router } from 'expo-router'
import { View } from 'react-native'
import { useFormContext } from 'react-hook-form'

import { OnboardingSchema } from '../onboarding.schema'

import { BackButton, Button, H2, P, Text, WheelPicker } from '@/components'

export function Height() {
  const { t } = useTranslation()
  const { watch, setValue } = useFormContext<OnboardingSchema>()

  const selectedHeight = watch('height')

  const initialData = Array.from({ length: 101 }, (_, i) => `${i + 120} cm`)
  const [heightWheelIndex, setHeightWheelIndex] = useState(selectedHeight - 120)

  return (
    <View className="flex flex-col h-full p-8 gap-4 bg-background" testID="height">
      <View className="flex flex-col flex-1 gap-4">
        <BackButton />
        <View>
          <H2>{t('onboarding.height.title')}</H2>
          <P className="text-muted-foreground">{t('onboarding.height.subtitle')}</P>
        </View>
        <View className="flex-1">
          <WheelPicker
            initialSelectedIndex={heightWheelIndex}
            data={initialData}
            selectedIndex={heightWheelIndex}
            onChangeValue={(value) => {
              setHeightWheelIndex(value)
              setValue('height', value + 120)
            }}
            infiniteScroll={false}
            restElements={4}
            elementHeight={50}
          />
        </View>
      </View>
      <View>
        <Button size="lg" onPress={() => router.push('onboarding/goal')} disabled={!selectedHeight}>
          <Text>{t('onboarding.height.next')}</Text>
        </Button>
      </View>
    </View>
  )
}
