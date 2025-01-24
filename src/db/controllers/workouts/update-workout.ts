import { SqliteWorkoutsRepository } from '@/db/repositories/sqlite/sqlite-workouts-repository'
import { UpdateWorkoutParams } from '@/db/repositories/workouts'

export function updateWorkout(params: UpdateWorkoutParams) {
  const workoutsRepository = new SqliteWorkoutsRepository()

  return workoutsRepository.updateWorkout(params)
}
