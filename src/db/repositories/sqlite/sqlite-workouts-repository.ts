import { v4 as uuidv4 } from 'uuid'
import { CreateWorkoutParams, UpdateWorkoutParams, Workout, WorkoutsRepository } from '../workouts'

import { db } from '@/db'

export class SqliteWorkoutsRepository implements WorkoutsRepository {
  async getWorkouts() {
    const workouts = db.getAllAsync<Workout>('SELECT * FROM workouts')

    return workouts
  }

  async getWorkout(id: number) {
    const workout = db.getFirstAsync<Workout>('SELECT * FROM workouts WHERE id = ?', [id])

    return workout
  }

  async createWorkout(workout: CreateWorkoutParams) {
    const id = uuidv4()

    await db.runAsync(
      'INSERT INTO workouts (id, name, description, image_path) VALUES (?, ?, ?, ?)',
      [id, workout.name, workout.description, workout.imagePath],
    )

    return { id }
  }

  async updateWorkout(workout: UpdateWorkoutParams) {
    await db.runAsync(
      'UPDATE workouts SET name = ?, description = ?, imagePath = ?, updatedAt = ? WHERE id = ?',
      [workout.name, workout.description, workout.imagePath, new Date().toISOString(), workout.id],
    )

    return
  }

  async deleteWorkout(id: number) {
    await db.runAsync('DELETE FROM workouts WHERE id = ?', [id])

    return
  }
}
