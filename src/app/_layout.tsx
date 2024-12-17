import React, { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
import { Stack } from 'expo-router'

import '@/styles/global.css'
import initI18n from '@/libs/i18n'
import { ActivityIndicator, View } from 'react-native'

export default function Layout() {
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)

  useEffect(() => {
    const initializeI18n = async () => {
      await initI18n()
      setIsI18nInitialized(true)
    }

    initializeI18n()
  }, [])

  if (!isI18nInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast position="bottom" />
    </>
  )
}
