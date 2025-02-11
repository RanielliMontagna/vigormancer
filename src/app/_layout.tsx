import 'react-native-get-random-values'

import { useFonts } from 'expo-font'
import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { I18nextProvider } from 'react-i18next'
import { PortalHost } from '@rn-primitives/portal'
import { router, Slot, SplashScreen } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { ClerkProvider, ClerkLoaded, useAuth, useUser } from '@clerk/clerk-expo'
import * as Sentry from '@sentry/react-native'

import '@/styles/global.css'
import { initI18n, i18n } from '@/libs/i18n'

import { tokenCache } from '@/libs/cache/cache'
import { LoadingOverlay, OfflineBar } from '@/components'
import { useAppStore } from '@/store'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useColorScheme, useNetInfo } from '@/hooks'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/libs/react-query'
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated'
import { hasCompleteOnboarding } from '@/db/controllers/user/has-completed-onboarding'
import { getUserById } from '@/db/controllers/user/get-user-by-id'
import { createUser } from '@/db/controllers/user/create-user'

SplashScreen.preventAutoHideAsync()

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
const sentryDsn = process.env.EXPO_PUBLIC_SENTRY_DSN!

if (!publishableKey) {
  throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file')
}

if (!sentryDsn) {
  throw new Error('Add EXPO_PUBLIC_SENTRY_DSN to your .env file')
}

if (!__DEV__) {
  Sentry.init({ dsn: sentryDsn })
}

// Configure Reanimated logger
configureReanimatedLogger({ level: ReanimatedLogLevel.warn, strict: false })

function App() {
  // Hook with isolated instance of network info manager
  useNetInfo()

  const { isLoading, isConnected } = useAppStore()
  const { isSignedIn, isLoaded } = useAuth()
  const { user } = useUser()
  const { isDarkColorScheme } = useColorScheme()

  const [isI18nInitialized, setIsI18nInitialized] = useState(false)
  const [isOnboardingInfoFetched, setIsOnboardingInfoFetched] = useState(false)
  const [onboarding, setOnboarding] = useState(false)

  const [fontsLoaded] = useFonts({
    'Lexend-Thin': require('@/assets/fonts/Lexend-Thin.ttf'),
    'Lexend-Light': require('@/assets/fonts/Lexend-Light.ttf'),
    'Lexend-Regular': require('@/assets/fonts/Lexend-Regular.ttf'),
    'Lexend-Medium': require('@/assets/fonts/Lexend-Medium.ttf'),
    'Lexend-SemiBold': require('@/assets/fonts/Lexend-SemiBold.ttf'),
    'Lexend-Bold': require('@/assets/fonts/Lexend-Bold.ttf'),
  })

  useEffect(() => {
    if (fontsLoaded && isI18nInitialized && isOnboardingInfoFetched) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, isI18nInitialized, isOnboardingInfoFetched])

  useEffect(() => {
    const initializeI18n = async () => {
      await initI18n()
      setIsI18nInitialized(true)
    }

    initializeI18n()
  }, [])

  useEffect(() => {
    const fetchOnboardingInfo = async () => {
      if (!isLoaded) return

      const userInfo = await getUserById(user.id)

      if (!userInfo) {
        await createUser({
          clerkId: user.id,
          email: user.primaryEmailAddress.emailAddress,
          username: user.username,
        })
      }

      if (isSignedIn) {
        const completed = await hasCompleteOnboarding(user.id)
        setOnboarding(Boolean(completed))

        setTimeout(() => setIsOnboardingInfoFetched(true), 0)
      } else {
        setTimeout(() => setIsOnboardingInfoFetched(true), 0)
      }
    }

    fetchOnboardingInfo()
  }, [isLoaded, isSignedIn, user.id, user.primaryEmailAddress.emailAddress, user.username])

  useEffect(() => {
    if (!isLoaded) return

    if (isSignedIn) {
      if (!onboarding) {
        router.replace('(private)/onboarding')
      } else {
        router.replace('(private)')
      }
    } else {
      router.replace('(public)') // Redirect to the public routes
    }
  }, [isLoaded, isSignedIn, onboarding])

  return (
    <GestureHandlerRootView>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaView className="flex-1">
            <View className="bg-background pb-4">
              <StatusBar animated style={isDarkColorScheme ? 'light' : 'dark'} />
            </View>
            <BottomSheetModalProvider>
              <Slot />
              <Toast position="bottom" />
              {isLoading && <LoadingOverlay />}
              {!isConnected && <OfflineBar />}
            </BottomSheetModalProvider>
          </SafeAreaView>
        </QueryClientProvider>
        <PortalHost />
      </I18nextProvider>
    </GestureHandlerRootView>
  )
}

function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <App />
      </ClerkLoaded>
    </ClerkProvider>
  )
}

export default Sentry.wrap(RootLayout)
