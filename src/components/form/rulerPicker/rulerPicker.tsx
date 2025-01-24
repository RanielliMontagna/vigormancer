import { useColorScheme } from '@/hooks'

import { RulerPicker, RulerPickerProps } from 'react-native-ruler-picker'
import colors from 'tailwindcss/colors'

function RulerPickerComponent({
  min,
  max,
  step,
  unit,
  fractionDigits = 0,
  ...rest
}: RulerPickerProps) {
  const { isDarkColorScheme } = useColorScheme()

  return (
    <RulerPicker
      min={min}
      max={max}
      step={step}
      unit={unit}
      fractionDigits={fractionDigits}
      {...rest}
      indicatorColor={isDarkColorScheme ? colors.white : colors.black}
      longStepColor={isDarkColorScheme ? colors.gray[400] : colors.gray[400]}
      shortStepColor={isDarkColorScheme ? colors.gray[600] : colors.gray[300]}
      valueTextStyle={{
        color: isDarkColorScheme ? colors.white : colors.black,
      }}
      unitTextStyle={{
        color: isDarkColorScheme ? colors.white : colors.black,
      }}
    />
  )
}

export { RulerPickerComponent as RulerPicker }
