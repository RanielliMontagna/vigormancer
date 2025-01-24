import { SqliteExercisesRepository } from '@/db/repositories/sqlite/sqlite-exercises-repository'
import { CreateExerciseParams } from '@/db/repositories/exercises'

export function createExercise(params: CreateExerciseParams) {
  const exercisesRepository = new SqliteExercisesRepository()

  return exercisesRepository.createExercise(params)
}
