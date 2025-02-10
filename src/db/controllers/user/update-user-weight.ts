import { SqliteUserRepository } from '@/db/repositories/sqlite/sqlite-user-repository'

interface UpdateUserWeightParams {
  userId: string
  weight: number
}

export function updateUserWeight({ userId, weight }: UpdateUserWeightParams) {
  const userRepository = new SqliteUserRepository()

  return userRepository.updateWeight(userId, weight)
}
