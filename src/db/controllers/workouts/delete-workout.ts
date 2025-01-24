import { SqliteWorkoutsRepository } from '@/db/repositories/sqlite/sqlite-workouts-repository'

export interface DeleteWorkout {
  id: string
}

export function deleteWorkout({ id }: DeleteWorkout) {
  const workoutsRepository = new SqliteWorkoutsRepository()

  return workoutsRepository.deleteWorkout(id)
}
