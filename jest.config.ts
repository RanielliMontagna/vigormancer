import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect', '<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|expo|@expo|expo-.*|@unimodules|unimodules-.*|@react-native|react-navigation|react-native-.*|@rn-primitives)/)',
  ],
}

export default config
