import { v4 as uuidv4 } from 'uuid'
import {
  CreateExerciseParams,
  UpdateExerciseParams,
  Exercise,
  ExercisesRepository,
} from '../exercises'

import { db } from '@/db'

export class SqliteExercisesRepository implements ExercisesRepository {
  async getExercises() {
    const exercises = await db.getAllAsync<Exercise>('SELECT * FROM exercises')

    return exercises
  }

  async getExercise(id: string) {
    const exercise = await db.getFirstAsync<Exercise>('SELECT * FROM exercises WHERE id = ?', [id])

    return exercise
  }

  async createExercise(exercise: CreateExerciseParams) {
    const id = uuidv4()

    await db.runAsync(
      'INSERT INTO exercises (id, name, type, image, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
      [
        id,
        exercise.name,
        exercise.type,
        exercise.image,
        new Date().toISOString(),
        new Date().toISOString(),
      ],
    )

    return { id }
  }

  async updateExercise(exercise: UpdateExerciseParams) {
    await db.runAsync(
      'UPDATE exercises SET name = ?, type = ?, image = ?, updatedAt = ? WHERE id = ?',
      [exercise.name, exercise.type, exercise.image, new Date().toISOString(), exercise.id],
    )

    return
  }

  async deleteExercise(id: string) {
    await db.runAsync('DELETE FROM exercises WHERE id = ?', [id])

    return
  }
}
