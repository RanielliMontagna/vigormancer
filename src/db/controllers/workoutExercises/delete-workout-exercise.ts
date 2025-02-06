import { SqliteWorkoutExercisesRepository } from '@/db/repositories/sqlite/sqlite-workout-exercises-repository'

interface DeleteWorkoutExercise {
  workoutExerciseId: string
}

export function deleteWorkoutExercise({ workoutExerciseId }: DeleteWorkoutExercise) {
  const workoutExercisesRepository = new SqliteWorkoutExercisesRepository()

  return workoutExercisesRepository.deleteWorkoutExercise({ id: workoutExerciseId })
}
