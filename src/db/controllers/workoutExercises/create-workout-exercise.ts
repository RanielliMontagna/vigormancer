import { SqliteWorkoutExercisesRepository } from '@/db/repositories/sqlite/sqlite-workout-exercises-repository'
import { CreateWorkoutExerciseParams } from '@/db/repositories/workoutExercises'

export function createWorkoutExercise(params: CreateWorkoutExerciseParams) {
  const workoutExercisesRepository = new SqliteWorkoutExercisesRepository()

  return workoutExercisesRepository.createWorkoutExercise(params)
}
