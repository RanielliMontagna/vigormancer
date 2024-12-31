import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect', '<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|expo|@expo|expo-.*|@unimodules|unimodules-.*|@react-native|react-navigation|react-native-.*|@rn-primitives)/)',
  ],
  testPathIgnorePatterns: ['<rootDir>/src/__tests__/mocks'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.spec.tsx',
    '!src/**/*.mock.ts',
    '!src/app/**/*.{ts,tsx}',
  ],
}

export default config
