import { SqliteWorkoutExercisesRepository } from '@/db/repositories/sqlite/sqlite-workout-exercises-repository'

interface DeleteWorkoutExercise {
  workoutExerciseId: string
}

export function deleteWorkoutExercise({ workoutExerciseId }: DeleteWorkoutExercise) {
  const workoutsRepository = new SqliteWorkoutExercisesRepository()

  return workoutsRepository.deleteWorkoutExercise({ id: workoutExerciseId })
}
