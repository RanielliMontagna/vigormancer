import { SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Slot, SplashScreen } from 'expo-router'
import { useFonts } from 'expo-font'
import Toast from 'react-native-toast-message'

import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo'

import '@/styles/global.css'
import { initI18n, i18n } from '@/libs/i18n'

import { tokenCache } from '@/libs/cache/cache'
import { LoadingOverlay } from '@/components'
import { useAppStore } from '@/store'
import { I18nextProvider } from 'react-i18next'

SplashScreen.preventAutoHideAsync()

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file')
}

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <App />
      </ClerkLoaded>
    </ClerkProvider>
  )
}

function App() {
  const { isLoading } = useAppStore()
  const { isSignedIn, isLoaded } = useAuth()

  const [isI18nInitialized, setIsI18nInitialized] = useState(false)

  // TODO: Implement onboarding logic
  const [onboarding, _] = useState(false)

  const [fontsLoaded] = useFonts({
    'Lexend-Thin': require('@/assets/fonts/Lexend-Thin.ttf'),
    'Lexend-Regular': require('@/assets/fonts/Lexend-Regular.ttf'),
    'Lexend-Medium': require('@/assets/fonts/Lexend-Medium.ttf'),
    'Lexend-Bold': require('@/assets/fonts/Lexend-Bold.ttf'),
  })

  useEffect(() => {
    if (fontsLoaded && isI18nInitialized) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, isI18nInitialized])

  useEffect(() => {
    const initializeI18n = async () => {
      await initI18n()
      setIsI18nInitialized(true)
    }

    initializeI18n()
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    if (isSignedIn) {
      if (onboarding) {
        router.replace('(private)/onboarding')
      } else {
        router.replace('(private)')
      }
    } else {
      router.replace('(public)') // Redirect to the public routes
    }
  }, [isLoaded, isSignedIn, onboarding])

  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaView className="flex-1">
        <Slot />
        <Toast position="bottom" />
        {isLoading && <LoadingOverlay />}
      </SafeAreaView>
    </I18nextProvider>
  )
}
