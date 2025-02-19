import { SqliteUserStreakRepository } from '@/db/repositories/sqlite/sqlite-user-streak-repository'

export function getUserStreak(userId: string) {
  const userStreakRepository = new SqliteUserStreakRepository()

  return userStreakRepository.getStreak(userId)
}
