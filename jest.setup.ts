import { useColorScheme } from '@/hooks'

import 'react-native-gesture-handler/jestSetup'
require('@shopify/flash-list/jestSetup')

// Mock for expo-modules-core library
jest.mock('expo-modules-core', () => ({
  NativeModulesProxy: jest.fn(),
  requireNativeModule: jest.fn(),
}))

// Mock for react-native-reanimated library
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'))

// Mock for vector-icons library

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native')
  return {
    FontAwesome: View,
    FontAwesome5: View,
    FontAwesome6: View,
    MaterialCommunityIcons: View,
  }
})

// Mock for routes
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
  useSegments: jest.fn(),
  useLocalSearchParams: jest.fn(() => ({ id: '1' }) as { id: string }),
  router: { push: jest.fn(), replace: jest.fn(), back: jest.fn(), canGoBack: jest.fn(() => true) },
}))

//Mock expo font
jest.mock('expo-font', () => ({
  ...jest.requireActual('expo-font'),
  isLoaded: jest.fn().mockReturnValue(true),
  loadAsync: jest.fn(),
}))

// Mock for hooks module
jest.mock('@/hooks', () => ({
  useColorScheme: jest.fn(),
}))

const mockUseColorScheme = useColorScheme as jest.Mock

beforeEach(() => {
  mockUseColorScheme.mockReturnValue({
    colorScheme: 'dark',
    isDarkColorScheme: false,
    toggleColorScheme: jest.fn(),
  })
})

// Mock clerk library
jest.mock('@clerk/clerk-expo', () => ({
  useUser: jest.fn(() => ({
    isSignedIn: true,
    user: {
      id: 'user_id',
      fullName: 'John Doe',
      primaryEmailAddress: {
        emailAddress: 'john.doe@example.com',
      },
      update: jest.fn(),
    },
  })),
  useAuth: jest.fn(() => ({
    signOut: jest.fn(),
  })),
  useSignUp: jest.fn(() => ({
    signUp: jest.fn(),
    isLoaded: true,
  })),
  useSignIn: jest.fn(() => ({
    signIn: jest.fn(),
    setActive: jest.fn(),
    isLoaded: true,
  })),
  useOAuth: jest.fn(() => ({
    startOAuthFlow: jest.fn(),
  })),
  isClerkAPIResponseError: jest.fn(() => false),
}))

// Mock for react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn(), language: 'en' },
  }),
  initReactI18next: { init: jest.fn() },
}))

// Mock for expo-localization
jest.mock('expo-localization', () =>
  jest.fn(() => ({
    getLocales: jest.fn(() => [{ languageTag: 'en-US' }]),
  })),
)

// Mock for AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}))

// Mock for expo-linking
jest.mock('expo-linking', () => ({
  useLinking: jest.fn(),
}))

// Mock WebBrowser
jest.mock('expo-web-browser', () => ({
  maybeCompleteAuthSession: jest.fn(),
  openBrowserAsync: jest.fn(),
  warmUpAsync: jest.fn(),
  coolDownAsync: jest.fn(),
}))

//Mock expo-updates
jest.mock('expo-updates', () => ({
  reloadAsync: jest.fn(),
}))

//Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => 'ExpoLinearGradient')

//Mock react-native-gifted-charts
jest.mock('react-native-gifted-charts', () => ({
  LineChart: 'LineChart',
  BarChart: 'BarChart',
  PieChart: 'PieChart',
  ProgressChart: 'ProgressChart',
  ContributionGraph: 'ContributionGraph',
  StackedBarChart: 'StackedBarChart',
}))

// Mock expo-image-picker
jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(),
  launchCameraAsync: jest.fn(),
}))

// Mock expo-sqlite
jest.mock('expo-sqlite', () => ({
  openDatabaseSync: jest.fn(() => ({
    getFirstAsync: jest.fn(
      () =>
        new Promise((resolve) => {
          resolve({ rows: { _array: [{ user_version: 1 }] } })
        }),
    ),
  })),
}))

// Mock expo-asset
jest.mock('expo-asset', () => ({
  useAssets: jest.fn(),
  Asset: {
    fromModule: jest.fn(() => ({
      downloadAsync: jest.fn(),
      localUri: 'localUri',
    })),
  },
}))

jest.spyOn(console, 'error').mockImplementation((message) => {
  if (typeof message === 'string' && message.includes('Warning:')) return null

  return
})
