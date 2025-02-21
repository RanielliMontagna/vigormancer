import { v4 as uuidv4 } from 'uuid'
import {
  CreateWorkoutParams,
  UpdateWorkoutParams,
  Workout,
  WorkoutsRepository,
  WorkoutWithExercisesCount,
} from '../workouts'
import { db, fetchWorkoutExercises } from '@/db'

export class SqliteWorkoutsRepository implements WorkoutsRepository {
  async getWorkouts() {
    const workouts = await db.getAllAsync<WorkoutWithExercisesCount>(`
      SELECT w.*, COUNT(we.workoutId) as exercisesCount
      FROM workouts w
      LEFT JOIN workout_exercise we ON w.id = we.workoutId
      GROUP BY w.id`)

    return workouts
  }

  async getWorkout(id: string) {
    const workout = await db.getFirstAsync<Workout>('SELECT * FROM workouts WHERE id = ?', [id])

    const exercises = await fetchWorkoutExercises({ workoutId: id })

    return { ...workout, exercises }
  }

  async createWorkout(workout: CreateWorkoutParams) {
    const id = uuidv4()

    await db.runAsync(
      'INSERT INTO workouts (id, name, description, difficulty, image) VALUES (?, ?, ?, ?, ?)',
      [id, workout.name, workout.description, workout.difficulty, workout.image],
    )

    return { id }
  }

  async updateWorkout(workout: UpdateWorkoutParams) {
    await db.runAsync(
      'UPDATE workouts SET name = ?, description = ?, difficulty = ?, image = ?, updatedAt = ? WHERE id = ?',
      [
        workout.name,
        workout.description,
        workout.difficulty,
        workout.image,
        new Date().toISOString(),
        workout.id,
      ],
    )

    return
  }

  async deleteWorkout(id: string) {
    await db.runAsync('DELETE FROM workouts WHERE id = ?', [id])

    return
  }
}
