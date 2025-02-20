import { SqliteUserRepository } from '@/db/repositories/sqlite/sqlite-user-repository'

export function getWeightDifferenceLastWeek(id: string) {
  const userRepository = new SqliteUserRepository()

  return userRepository.getWeightDifferenceLastWeek(id)
}
