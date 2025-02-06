import { SqliteWorkoutExercisesRepository } from '@/db/repositories/sqlite/sqlite-workout-exercises-repository'
import { EditWorkoutExerciseParams } from '@/db/repositories/workoutExercises'

export function editWorkoutExercise(params: EditWorkoutExerciseParams) {
  const workoutExercisesRepository = new SqliteWorkoutExercisesRepository()

  return workoutExercisesRepository.editWorkoutExercise(params)
}
