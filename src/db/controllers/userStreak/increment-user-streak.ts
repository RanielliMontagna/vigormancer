import { SqliteUserStreakRepository } from '@/db/repositories/sqlite/sqlite-user-streak-repository'

interface IncrementUserStreak {
  userId: string
  date: string
}

export function incrementUserStreak({ userId, date }: IncrementUserStreak) {
  const userStreakRepository = new SqliteUserStreakRepository()

  return userStreakRepository.incrementStreak(userId, date)
}
