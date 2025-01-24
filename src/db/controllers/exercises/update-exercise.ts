import { SqliteExercisesRepository } from '@/db/repositories/sqlite/sqlite-exercises-repository'
import { UpdateExerciseParams } from '@/db/repositories/exercises'

export function updateExercise(params: UpdateExerciseParams) {
  const exercisesRepository = new SqliteExercisesRepository()

  return exercisesRepository.updateExercise(params)
}
