import { SqliteWorkoutsRepository } from '@/db/repositories/sqlite/sqlite-workouts-repository'

export interface GetWorkout {
  id: number
}

export function getWorkout({ id }: GetWorkout) {
  const workoutsRepository = new SqliteWorkoutsRepository()

  return workoutsRepository.getWorkout(id)
}
