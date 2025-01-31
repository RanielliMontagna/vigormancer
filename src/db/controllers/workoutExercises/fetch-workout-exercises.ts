import { SqliteWorkoutExercisesRepository } from '@/db/repositories/sqlite/sqlite-workout-exercises-repository'

interface FetchWorkoutExercises {
  workoutId: string
}

export function fetchWorkoutExercises({ workoutId }: FetchWorkoutExercises) {
  const workoutsRepository = new SqliteWorkoutExercisesRepository()

  return workoutsRepository.getWorkoutExercises(workoutId)
}
