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
        image TEXT,
        createdAt TIMESTAMP DEFAULT (DATETIME('now')),
        updatedAt TIMESTAMP DEFAULT (DATETIME('now'))
      );

      -- Create exercise table
      CREATE TABLE IF NOT EXISTS exercises (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        image TEXT,
        createdAt TIMESTAMP DEFAULT (DATETIME('now')),
        updatedAt TIMESTAMP DEFAULT (DATETIME('now'))
      );

      -- Create workout_exercise table
      CREATE TABLE IF NOT EXISTS workout_exercise (
        workoutId TEXT NOT NULL,
        exerciseId TEXT NOT NULL,
        sets INTEGER,
        repetitions INTEGER,
        distance REAL,
        duration INTEGER,
        restTime INTEGER,
        createdAt TIMESTAMP DEFAULT (DATETIME('now')),
        updatedAt TIMESTAMP DEFAULT (DATETIME('now')),
        FOREIGN KEY (workoutId) REFERENCES workouts(id),
        FOREIGN KEY (exerciseId) REFERENCES exercises(id),
        PRIMARY KEY (workoutId, exerciseId)
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
