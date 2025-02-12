import { SqliteUserRepository } from '@/db/repositories/sqlite/sqlite-user-repository'

export function getHistoryWeight(userId: string) {
  const userRepository = new SqliteUserRepository()

  return userRepository.getHistoryUserWeight(userId)
}
