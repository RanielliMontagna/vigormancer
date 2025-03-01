import type { CreateSessionWorkout } from '@/db/repositories/session'
import { SqliteSessionWorkoutRepository } from '@/db/repositories/sqlite/sqlite-session-workout-repository'

export function createSessionWorkout(params: CreateSessionWorkout) {
  const sessionWorkoutRepository = new SqliteSessionWorkoutRepository()

  return sessionWorkoutRepository.createSessionWorkout(params)
}
