import { SqliteUserRepository } from '@/db/repositories/sqlite/sqlite-user-repository'

interface UpdateUserHeightParams {
  userId: string
  height: number
}

export function updateUserHeight({ userId, height }: UpdateUserHeightParams) {
  const userRepository = new SqliteUserRepository()

  return userRepository.updateHeight(userId, height)
}
