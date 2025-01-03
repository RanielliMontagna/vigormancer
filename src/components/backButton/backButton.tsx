import { TouchableOpacity } from 'react-native'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { useColorScheme } from '@/hooks'
import { router } from 'expo-router'
import colors from 'tailwindcss/colors'

interface BackButtonProps {
  /**
   * @description Function to call when the button is pressed
   * @default router.back
   * @example () => console.log('Button pressed')
   * @type () => void
   */
  onPress?: () => void
}

export function BackButton({ onPress }: BackButtonProps) {
  const { isDarkColorScheme } = useColorScheme()

  function handlePress() {
    if (!onPress) {
      if (!router.canGoBack()) return

      router.back()
      return
    }

    onPress()
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="border border-border rounded-xl w-12 h-12 justify-center items-center pr-[2px] bg-card"
      testID="back-button-touchable-opacity"
    >
      <FontAwesome6
        name="angle-left"
        size={24}
        color={isDarkColorScheme ? colors.white : colors.black}
      />
    </TouchableOpacity>
  )
}
