import { SqliteExercisesRepository } from '@/db/repositories/sqlite/sqlite-exercises-repository'

export interface DeleteExercise {
  id: number
}

export function deleteExercise({ id }: DeleteExercise) {
  const exercisesRepository = new SqliteExercisesRepository()

  return exercisesRepository.deleteExercise(id)
}
