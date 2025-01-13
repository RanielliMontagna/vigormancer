import { View } from 'react-native'
import { useTranslation } from 'react-i18next'

import { BottomSheet, Button, Form, H3, RulerPicker, Text } from '@/components'
import { useWeightBottomSheet } from './useWeightBottomSheet'
import { maxWeight, minWeight } from '@/constants/constants'

export function WeightBottomSheet() {
  const { t } = useTranslation()

  const { methods, selectedWeight, weightBottomSheetRef, handleCancel, handleSubmit } =
    useWeightBottomSheet()

  return (
    <Form {...methods}>
      <BottomSheet ref={weightBottomSheetRef}>
        <View className="flex-row items-center gap-2 mb-4">
          <H3>{t('progression.weight.edit.title')}</H3>
        </View>
        <View>
          <RulerPicker
            max={maxWeight}
            min={minWeight}
            step={0.1}
            fractionDigits={1}
            initialValue={selectedWeight}
            unit="kg"
            onValueChangeEnd={(number) => methods.setValue('weight', Number(number))}
            height={200}
          />

          <View className="flex-row gap-4 mt-4">
            <Button className="flex-1" size="lg" variant="outline" onPress={handleCancel}>
              <Text>{t('progression.weight.edit.cancel')}</Text>
            </Button>
            <Button className="flex-1" size="lg" onPress={methods.handleSubmit(handleSubmit)}>
              <Text>{t('progression.weight.edit.action')}</Text>
            </Button>
          </View>
        </View>
      </BottomSheet>
    </Form>
  )
}
