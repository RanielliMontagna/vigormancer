import type { FinishSessionWorkout } from '@/db/repositories/session'
import { SqliteSessionWorkoutRepository } from '@/db/repositories/sqlite/sqlite-session-workout-repository'

export function finishSessionWorkout(params: FinishSessionWorkout) {
  const sessionWorkoutRepository = new SqliteSessionWorkoutRepository()

  return sessionWorkoutRepository.finishSessionWorkout(params)
}
