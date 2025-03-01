import { SqliteSessionWorkoutRepository } from '@/db/repositories/sqlite/sqlite-session-workout-repository'

export function deleteSessionWorkout(userId: string) {
  const sessionWorkoutRepository = new SqliteSessionWorkoutRepository()

  return sessionWorkoutRepository.deleteSessionWorkout(userId)
}
