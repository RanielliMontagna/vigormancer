import { SqliteWorkoutExercisesRepository } from '@/db/repositories/sqlite/sqlite-workout-exercises-repository'

interface FetchWorkouts {
  workoutId: string
}

export function fetchWorkouts({ workoutId }: FetchWorkouts) {
  const workoutsRepository = new SqliteWorkoutExercisesRepository()

  return workoutsRepository.getWorkoutExercises(workoutId)
}
