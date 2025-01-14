import { Stack } from 'expo-router'
import { View } from 'react-native'

import { SQLiteProvider } from 'expo-sqlite'
import { migrateDbIfNeeded } from '@/libs/db/db'

export default function PrivateRoutesLayout() {
  return (
    <SQLiteProvider databaseName="vigormancerdb" onInit={migrateDbIfNeeded}>
      <View className="flex-1 bg-background">
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />
      </View>
    </SQLiteProvider>
  )
}
