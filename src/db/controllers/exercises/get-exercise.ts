import { SqliteExercisesRepository } from '@/db/repositories/sqlite/sqlite-exercises-repository'

export interface GetExercise {
  id: string
}

export function getExercise({ id }: GetExercise) {
  const exercisesRepository = new SqliteExercisesRepository()

  return exercisesRepository.getExercise(id)
}
