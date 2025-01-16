import { SqliteWorkoutsRepository } from '@/db/repositories/sqlite/sqlite-workouts-repository'

export function fetchWorkouts() {
  const workoutsRepository = new SqliteWorkoutsRepository()

  return workoutsRepository.getWorkouts()
}
