import { SqliteUserRepository } from '@/db/repositories/sqlite/sqlite-user-repository'

export function getWeight(userId: string) {
  const userRepository = new SqliteUserRepository()

  return userRepository.getUserWeight(userId)
}
