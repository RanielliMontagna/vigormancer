import * as SQLite from 'expo-sqlite'
import { DATABASE_NAME } from '@/db'

import { GeneralRepository } from '../general'

export class SqliteGeneralRepository implements GeneralRepository {
  async getDatabaseVersion() {
    const db = SQLite.openDatabaseSync(DATABASE_NAME)

    const { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>(
      'PRAGMA user_version',
    )

    return currentDbVersion
  }
}
