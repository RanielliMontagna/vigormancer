import { SQLiteDatabase } from 'expo-sqlite'

import { createTablesSQL } from './tables'
import { seedDatabase } from './seeds/seed'

export const DATABASE_NAME = 'vigormancerdb'
const DATABASE_VERSION = 1

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  let { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version',
  )

  // If the database is already up to date, return
  if (currentDbVersion >= DATABASE_VERSION) return

  if (currentDbVersion === 0) {
    await db.execAsync(createTablesSQL)

    // Seed the database only if it was newly initialized
    await seedDatabase()

    currentDbVersion = DATABASE_VERSION
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`)

  if (currentDbVersion > 0) {
    console.log(`Database migrated to version ${DATABASE_VERSION}`)
  } else {
    console.log(`Database initialized at version ${DATABASE_VERSION}`)
  }
}

export { migrateDbIfNeeded }
