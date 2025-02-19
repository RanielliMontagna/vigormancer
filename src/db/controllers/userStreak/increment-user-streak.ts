import { SqliteUserStreakRepository } from '@/db/repositories/sqlite/sqlite-user-streak-repository'

interface IncrementUserStreak {
  userId: string
}

export function incrementUserStreak({ userId }: IncrementUserStreak) {
  const userStreakRepository = new SqliteUserStreakRepository()

  return userStreakRepository.incrementStreak(userId)
}
