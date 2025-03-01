import { SqliteSessionWorkoutRepository } from '@/db/repositories/sqlite/sqlite-session-workout-repository'

export function quantityFinishedSessionWorkout(userId: string) {
  const sessionWorkoutRepository = new SqliteSessionWorkoutRepository()

  return sessionWorkoutRepository.quantityFinishedSessions(userId)
}
