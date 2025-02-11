import { SqliteUserRepository } from '@/db/repositories/sqlite/sqlite-user-repository'

export function getWeight(email: string) {
  const userRepository = new SqliteUserRepository()

  return userRepository.getUserWeight(email)
}
