import React from 'react'

import { ActivityIndicator, View } from 'react-native'
import { useColorScheme } from '@/hooks'
import colors from 'tailwindcss/colors'

export function LoadingOverlay() {
  const { isDarkColorScheme } = useColorScheme()

  return (
    <React.Fragment>
      <View className="absolute inset-0 flex items-center justify-center bg-black opacity-50" />
      <View className="absolute inset-0 z-50 flex items-center justify-center">
        <ActivityIndicator size="large" color={isDarkColorScheme ? colors.white : colors.black} />
      </View>
    </React.Fragment>
  )
}
