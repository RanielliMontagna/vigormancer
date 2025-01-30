import {
  CreateExerciseParams,
  UpdateExerciseParams,
  Exercise,
  ExercisesRepository,
} from '../exercises'

import { db } from '@/db'

export class SqliteExercisesRepository implements ExercisesRepository {
  async getExercises() {
    const exercises = await db.getAllAsync<Exercise & { categoryName: string; categoryId: string }>(
      `SELECT exercises.*, categories.name as categoryName, categories.id as categoryId
       FROM exercises 
       JOIN categories ON exercises.categoryId = categories.id`,
    )

    return exercises.map((exercise) => ({
      id: exercise.id,
      name: exercise.name,
      type: exercise.type,
      image: exercise.image,
      category: { id: exercise.categoryId, name: exercise.categoryName },
    }))
  }

  async getExercise(id: number) {
    const exercise = await db.getFirstAsync<
      Exercise & { categoryName: string; categoryId: string }
    >(
      `SELECT exercises.*, categories.name as categoryName, categories.id as categoryId
       FROM exercises 
       JOIN categories ON exercises.categoryId = categories.id 
       WHERE exercises.id = ?`,
      [id],
    )

    if (!exercise) {
      throw new Error('Exercise not found')
    }

    return {
      id: exercise.id,
      name: exercise.name,
      type: exercise.type,
      image: exercise.image,
      category: { id: exercise.categoryId, name: exercise.categoryName },
    }
  }

  async createExercise(exercise: CreateExerciseParams) {
    const id = exercise.id

    const category = await db.getFirstAsync<{ id: string }>(
      'SELECT id FROM categories WHERE id = ?',
      [exercise.categoryId],
    )

    if (!category) {
      throw new Error('Category not found')
    }

    await db.runAsync(
      'INSERT INTO exercises (id, categoryId, name, type, image, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        id || undefined,
        category.id,
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

  async deleteExercise(id: number) {
    await db.runAsync('DELETE FROM exercises WHERE id = ?', [id])

    return
  }
}
