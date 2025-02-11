import { SqliteUserRepository } from '@/db/repositories/sqlite/sqlite-user-repository'

export function getUserByEmail(email: string) {
  const userRepository = new SqliteUserRepository()

  return userRepository.getUserByEmail(email)
}
