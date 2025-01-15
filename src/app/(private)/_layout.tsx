import { Stack } from 'expo-router'
import { View } from 'react-native'

import { SQLiteProvider } from 'expo-sqlite'
import { DATABASE_NAME, migrateDbIfNeeded } from '@/db'

export default function PrivateRoutesLayout() {
  return (
    <SQLiteProvider databaseName={DATABASE_NAME} onInit={migrateDbIfNeeded}>
      <View className="flex-1 bg-background">
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />
      </View>
    </SQLiteProvider>
  )
}
