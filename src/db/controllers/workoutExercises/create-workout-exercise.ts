import { SqliteWorkoutExercisesRepository } from '@/db/repositories/sqlite/sqlite-workout-exercises-repository'
import { CreateWorkoutExerciseParams } from '@/db/repositories/workoutExercises'

export function createWorkout(params: CreateWorkoutExerciseParams) {
  const workoutsRepository = new SqliteWorkoutExercisesRepository()

  return workoutsRepository.createWorkoutExercise(params)
}
