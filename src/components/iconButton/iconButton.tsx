import { TouchableOpacity } from 'react-native'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { useColorScheme } from '@/hooks'
import colors from 'tailwindcss/colors'

interface IconButtonProps {
  /**
   * @description Function to call when the button is pressed
   * @type () => void
   */
  onPress: () => void

  /**
   * @description Icon to display in the button
   */
  icon: React.ComponentProps<typeof FontAwesome6>['name']

  /**
   * @description Size of the icon
   * @default 18
   */
  size?: number

  /**
   * @description TestID for testing purposes
   */
  testID?: string
}

export function IconButton({ onPress, icon, size = 18, testID }: IconButtonProps) {
  const { isDarkColorScheme } = useColorScheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      className="border border-border rounded-xl w-12 h-12 justify-center items-center pr-[2px] bg-card"
      testID={testID}
    >
      <FontAwesome6
        name={icon}
        size={size}
        color={isDarkColorScheme ? colors.white : colors.black}
      />
    </TouchableOpacity>
  )
}
