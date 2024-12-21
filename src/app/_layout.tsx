import React, { useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import Toast from 'react-native-toast-message'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'

import '@/styles/global.css'
import initI18n from '@/libs/i18n'
import { ActivityIndicator, View } from 'react-native'
import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@/libs/cache/cache'
import { useAppStore } from '@/store'
import { LoadingOverlay } from '@/components'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}

SplashScreen.preventAutoHideAsync()

export default function Layout() {
  const { isLoading } = useAppStore()

  const [isI18nInitialized, setIsI18nInitialized] = useState(false)

  const [loaded, error] = useFonts({
    'Lexend-Thin': require('@/assets/fonts/Lexend-Thin.ttf'),
    'Lexend-Regular': require('@/assets/fonts/Lexend-Regular.ttf'),
    'Lexend-Medium': require('@/assets/fonts/Lexend-Medium.ttf'),
    'Lexend-Bold': require('@/assets/fonts/Lexend-Bold.ttf'),
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  useEffect(() => {
    const initializeI18n = async () => {
      await initI18n()
      setIsI18nInitialized(true)
    }

    initializeI18n()
  }, [])

  if (!isI18nInitialized || (!loaded && !error)) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <Stack screenOptions={{ headerShown: false }} />
        <Toast position="bottom" />
        {isLoading && <LoadingOverlay />}
      </ClerkLoaded>
    </ClerkProvider>
  )
}
