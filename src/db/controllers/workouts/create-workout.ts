import { SqliteWorkoutsRepository } from '@/db/repositories/sqlite/sqlite-workouts-repository'
import { CreateWorkoutParams } from '@/db/repositories/workouts'

export function createWorkout(params: CreateWorkoutParams) {
  const workoutsRepository = new SqliteWorkoutsRepository()

  return workoutsRepository.createWorkout(params)
}
