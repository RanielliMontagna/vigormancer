import React from 'react'
import { View, Text } from 'react-native'

const OfflineBar = () => {
  // Not show offline bar in production
  if (process.env.NODE_ENV === 'production') return null

  return (
    <View className="top-0 right-0 left-0 px-8 transform bg-black">
      <Text className="font-lexend-light text-xs text-center text-white">OFFLINE MODE</Text>
    </View>
  )
}

export { OfflineBar }
