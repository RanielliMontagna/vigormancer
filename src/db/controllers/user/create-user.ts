import { SqliteUserRepository } from '@/db/repositories/sqlite/sqlite-user-repository'
import { CreateUserParams } from '@/db/repositories/user'

export function createUser(params: CreateUserParams) {
  const userRepository = new SqliteUserRepository()

  return userRepository.createUser(params)
}
