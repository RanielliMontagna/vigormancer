import { View } from 'react-native'
import { useTranslation } from 'react-i18next'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import {
  BottomSheet,
  Button,
  Form,
  H3,
  Label,
  RulerPicker,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components'
import { useBmiBottomSheet } from './useBmiBottomSheet'
import { useColorScheme } from '@/hooks'
import colors from 'tailwindcss/colors'
import { maxHeight, maxWeight, minHeight, minWeight } from '@/constants/constants'

export function BmiBottomSheet() {
  const { isDarkColorScheme } = useColorScheme()
  const { t } = useTranslation()

  const { methods, selectedHeight, selectedWeight, bmiBottomSheetRef, handleCancel, handleSubmit } =
    useBmiBottomSheet()

  return (
    <Form {...methods}>
      <BottomSheet ref={bmiBottomSheetRef}>
        <View className="flex-row items-center gap-2 mb-4">
          <H3>{t('progression.bmi.edit.title')}</H3>
          <Tooltip delayDuration={50}>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost">
                <FontAwesome6
                  name="circle-info"
                  size={18}
                  color={isDarkColorScheme ? colors.white : colors.black}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" insets={{ left: 16, right: 16 }}>
              <Text className="text-sm">{t('progression.bmi.edit.info')}</Text>
            </TooltipContent>
          </Tooltip>
        </View>
        <View>
          <View>
            <Label>{t('progression.bmi.edit.weight')}</Label>
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
          </View>
          <View>
            <Label>{t('progression.bmi.edit.height')}</Label>
            <RulerPicker
              max={maxHeight}
              min={minHeight}
              step={1}
              fractionDigits={0}
              initialValue={selectedHeight}
              unit="cm"
              onValueChangeEnd={(number) => methods.setValue('height', Number(number))}
              height={200}
            />
          </View>

          <View className="flex-row gap-4 mt-4">
            <Button className="flex-1" size="lg" variant="outline" onPress={handleCancel}>
              <Text>{t('progression.bmi.edit.cancel')}</Text>
            </Button>
            <Button className="flex-1" size="lg" onPress={methods.handleSubmit(handleSubmit)}>
              <Text>{t('progression.bmi.edit.action')}</Text>
            </Button>
          </View>
        </View>
      </BottomSheet>
    </Form>
  )
}
