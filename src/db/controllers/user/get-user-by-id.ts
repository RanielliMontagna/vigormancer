import { SqliteUserRepository } from '@/db/repositories/sqlite/sqlite-user-repository'

export function getUserById(id: string) {
  const userRepository = new SqliteUserRepository()

  return userRepository.getUserById(id)
}
