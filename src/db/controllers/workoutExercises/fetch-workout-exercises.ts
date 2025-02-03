import { SqliteWorkoutExercisesRepository } from '@/db/repositories/sqlite/sqlite-workout-exercises-repository'

interface FetchWorkoutExercises {
  workoutId: string
}

export function fetchWorkoutExercises({ workoutId }: FetchWorkoutExercises) {
  const workoutExercisesRepository = new SqliteWorkoutExercisesRepository()

  return workoutExercisesRepository.getWorkoutExercises(workoutId)
}
