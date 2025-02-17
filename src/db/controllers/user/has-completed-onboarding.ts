import { SqliteUserRepository } from '@/db/repositories/sqlite/sqlite-user-repository'

export function hasCompleteOnboarding(userId: string) {
  const userRepository = new SqliteUserRepository()

  return userRepository.hasCompletedOnboarding(userId)
}
