import { SqliteGeneralRepository } from '@/db/repositories/sqlite/sqlite-general-repository'

export function getDatabaseVersion() {
  const generalRepository = new SqliteGeneralRepository()

  return generalRepository.getDatabaseVersion()
}
