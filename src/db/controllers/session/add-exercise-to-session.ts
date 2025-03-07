import { AddExerciseToSession } from '@/db/repositories/session'
import { SqliteSessionWorkoutRepository } from '@/db/repositories/sqlite/sqlite-session-workout-repository'

export function addExerciseToSession(exercise: AddExerciseToSession) {
  const sessionWorkoutRepository = new SqliteSessionWorkoutRepository()

  return sessionWorkoutRepository.addExerciseToSession(exercise)
}
