import { GeneralRepository } from '../general'

import { db } from '@/db'

export class SqliteGeneralRepository implements GeneralRepository {
  async getDatabaseVersion() {
    const { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>(
      'PRAGMA user_version',
    )

    return currentDbVersion
  }
}
