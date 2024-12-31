// Mock for expo-modules-core library
jest.mock('expo-modules-core', () => ({
  NativeModulesProxy: jest.fn(),
  requireNativeModule: jest.fn(),
}))

// Mock for react-native-reanimated library
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'))

// Mock for vector-icons library
jest.mock('@expo/vector-icons/FontAwesome6', () => 'FontAwesome6')

// Mock for routes
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
  useSegments: jest.fn(),
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  },
}))
