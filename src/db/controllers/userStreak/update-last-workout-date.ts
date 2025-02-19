import { SqliteUserStreakRepository } from '@/db/repositories/sqlite/sqlite-user-streak-repository'

interface UpdateLastWorkoutDate {
  userId: string
  date: string
}

export function updateLastWorkoutDate({ userId, date }: UpdateLastWorkoutDate) {
  const userStreakRepository = new SqliteUserStreakRepository()

  return userStreakRepository.updateLastWorkoutDate(userId, date)
}
