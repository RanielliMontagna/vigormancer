import { router } from 'expo-router'

import { IconButton } from '../iconButton/iconButton'

interface BackButtonProps {
  /**
   * @description Function to call when the button is pressed
   * @default router.back
   * @type () => void
   */
  onPress?: () => void
}

export function BackButton({ onPress }: BackButtonProps) {
  function handlePress() {
    if (!onPress) {
      if (!router.canGoBack()) return

      router.back()
      return
    }

    onPress()
  }

  return (
    <IconButton
      onPress={handlePress}
      icon="angle-left"
      size={24}
      testID="back-button-touchable-opacity"
    />
  )
}
