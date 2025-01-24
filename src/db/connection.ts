import { openDatabaseSync } from 'expo-sqlite'
import { DATABASE_NAME } from './migrate'

export const db = openDatabaseSync(DATABASE_NAME)
