import { SqliteExercisesRepository } from '@/db/repositories/sqlite/sqlite-exercises-repository'

export function fetchExercises() {
  const exercisesRepository = new SqliteExercisesRepository()

  return exercisesRepository.getExercises()
}
