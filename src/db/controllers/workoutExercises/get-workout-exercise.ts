import { SqliteWorkoutExercisesRepository } from '@/db/repositories/sqlite/sqlite-workout-exercises-repository'

export interface GetWorkoutExercise {
  id: string
}

export function getWorkoutExercise({ id }: GetWorkoutExercise) {
  const workoutExercisesRepository = new SqliteWorkoutExercisesRepository()

  return workoutExercisesRepository.getWorkoutExercise(id)
}
