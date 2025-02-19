import { SqliteUserStreakRepository } from '@/db/repositories/sqlite/sqlite-user-streak-repository'

interface GetUserStreak {
  userId: string
}

export function getUserStreak({ userId }: GetUserStreak) {
  const userStreakRepository = new SqliteUserStreakRepository()

  return userStreakRepository.getStreak(userId)
}
