import { SqliteUserRepository } from '@/db/repositories/sqlite/sqlite-user-repository'

export function getLatestWeight(userId: string) {
  const userRepository = new SqliteUserRepository()

  return userRepository.getLatestUserWeight(userId)
}
