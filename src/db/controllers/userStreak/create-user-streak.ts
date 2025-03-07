import { SqliteUserStreakRepository } from '@/db/repositories/sqlite/sqlite-user-streak-repository'

interface CreateUserStreak {
  userId: string
}

export function createUserStreak({ userId }: CreateUserStreak) {
  const userStreakRepository = new SqliteUserStreakRepository()

  return userStreakRepository.createStreak(userId)
}
