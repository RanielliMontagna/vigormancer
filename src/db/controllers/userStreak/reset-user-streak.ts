import { SqliteUserStreakRepository } from '@/db/repositories/sqlite/sqlite-user-streak-repository'

interface ResetUserStreak {
  userId: string
}

export function resetUserStreak({ userId }: ResetUserStreak) {
  const userStreakRepository = new SqliteUserStreakRepository()

  return userStreakRepository.resetStreak(userId)
}
