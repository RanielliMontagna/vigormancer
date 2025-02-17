import { SqliteUserRepository } from '@/db/repositories/sqlite/sqlite-user-repository'

export function getHeight(email: string) {
  const userRepository = new SqliteUserRepository()

  return userRepository.getUserHeight(email)
}
