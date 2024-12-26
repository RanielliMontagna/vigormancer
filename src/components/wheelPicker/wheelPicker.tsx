import { useColorScheme } from '@/hooks'

import {
  WheelPicker as WheelPickerComponent,
  WheelPickerProps,
} from 'react-native-infinite-wheel-picker'
import colors from 'tailwindcss/colors'

export function WheelPicker({ data, ...rest }: WheelPickerProps) {
  const { isDarkColorScheme } = useColorScheme()

  return (
    <WheelPickerComponent
      data={data}
      elementTextStyle={{
        color: isDarkColorScheme ? colors.white : colors.black,
      }}
      selectedLayoutStyle={{
        backgroundColor: isDarkColorScheme ? colors.zinc[800] : colors.zinc[200],
      }}
      {...rest}
    />
  )
}
