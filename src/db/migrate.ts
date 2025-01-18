import { SQLiteDatabase } from 'expo-sqlite'

export const DATABASE_NAME = 'vigormancerdb'
const DATABASE_VERSION = 1

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  let { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version',
  )

  // If the database is already up to date, return
  if (currentDbVersion >= DATABASE_VERSION) return

  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      
      -- Create workout table
      CREATE TABLE IF NOT EXISTS workouts (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT,
          difficulty INTEGER DEFAULT 0,
          image_path TEXT,
          created_at TIMESTAMP DEFAULT (DATETIME('now')),
          updated_at TIMESTAMP DEFAULT (DATETIME('now'))
      );

      -- Create exercise table
      CREATE TABLE IF NOT EXISTS exercises (
          id TEXT PRIMARY KEY,
          workout_id INTEGER NOT NULL,
          name TEXT NOT NULL,
          type TEXT NOT NULL,
          repetitions INTEGER,
          sets INTEGER,
          distance REAL,
          duration INTEGER,
          rest_time INTEGER,
          created_at TIMESTAMP DEFAULT (DATETIME('now')),
          updated_at TIMESTAMP DEFAULT (DATETIME('now')),
          FOREIGN KEY (workout_id) REFERENCES workouts (id) ON DELETE CASCADE
      );
    `)

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
