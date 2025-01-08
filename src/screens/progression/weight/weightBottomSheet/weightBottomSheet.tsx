import { View } from 'react-native'
import { useTranslation } from 'react-i18next'

import { BottomSheet, Button, Form, H3, Text, WheelPicker } from '@/components'
import { useWeightBottomSheet } from './useWeightBottomSheet'

export function WeightBottomSheet() {
  const { t } = useTranslation()

  const {
    methods,
    weightWheelIndex,
    weightInitialData,
    weightBottomSheetRef,
    handleCancel,
    handleSubmit,
    setWeightWheelIndex,
  } = useWeightBottomSheet()

  return (
    <Form {...methods}>
      <BottomSheet ref={weightBottomSheetRef}>
        <View className="flex-row items-center gap-2 mb-4">
          <H3>{t('progression.weight.edit.title')}</H3>
        </View>
        <View>
          <WheelPicker
            initialSelectedIndex={weightWheelIndex}
            data={weightInitialData}
            selectedIndex={weightWheelIndex}
            onChangeValue={(value) => {
              setWeightWheelIndex(value)
              methods.setValue('weight', value + 30)
            }}
            infiniteScroll={false}
            restElements={2}
            elementHeight={30}
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
