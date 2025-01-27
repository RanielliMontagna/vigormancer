import { SqliteWorkoutExercisesRepository } from '@/db/repositories/sqlite/sqlite-workout-exercises-repository'

interface DeleteWorkoutExercise {
  workoutId: string
}

export function deleteWorkoutExercise({ workoutId }: DeleteWorkoutExercise) {
  const workoutsRepository = new SqliteWorkoutExercisesRepository()

  return workoutsRepository.deleteWorkoutExercise({ id: workoutId })
}
