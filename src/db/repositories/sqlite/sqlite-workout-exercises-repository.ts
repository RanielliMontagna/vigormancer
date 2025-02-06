import { v4 as uuidv4 } from 'uuid'

import {
  CreateWorkoutExerciseParams,
  DeleteWorkoutExerciseParams,
  EditWorkoutExerciseParams,
  WorkoutExercisesRepository,
  WorkoutExerciseWithCategory,
} from '../workoutExercises'

import { db } from '@/db'

export class SqliteWorkoutExercisesRepository implements WorkoutExercisesRepository {
  async createWorkoutExercise(params: CreateWorkoutExerciseParams): Promise<void> {
    const id = uuidv4()

    await db.runAsync(
      'INSERT INTO workout_exercise (id, workoutId, exerciseId, sets, repetitions, weight, rest, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        id,
        params.workoutId,
        params.exerciseId,
        params.sets,
        params.repetitions,
        params.weight,
        params.rest,
        new Date().toISOString(),
        new Date().toISOString(),
      ],
    )
  }

  async editWorkoutExercise(params: EditWorkoutExerciseParams): Promise<void> {
    await db.runAsync(
      'UPDATE workout_exercise SET sets = ?, repetitions = ?, weight = ?, rest = ?, updatedAt = ? WHERE id = ?',
      [
        params.sets,
        params.repetitions,
        params.weight,
        params.rest,
        new Date().toISOString(),
        params.id,
      ],
    )
  }

  async getWorkoutExercises(workoutId: string): Promise<WorkoutExerciseWithCategory[]> {
    const workoutExercises = await db.getAllAsync<WorkoutExerciseWithCategory>(
      `SELECT
        we.id,
        we.sets,
        we.repetitions,
        we.weight,
        we.rest,
        e.id as exerciseId,
        e.name as exerciseName,
        e.categoryId,
        c.name as categoryName
      FROM workout_exercise we
      JOIN exercises e ON we.exerciseId = e.id
      JOIN categories c ON e.categoryId = c.id
      WHERE we.workoutId = ?`,
      [workoutId],
    )

    return workoutExercises
  }

  async getWorkoutExercise(id: string): Promise<WorkoutExerciseWithCategory | undefined> {
    const workoutExercise = await db.getFirstAsync<WorkoutExerciseWithCategory>(
      `SELECT
        we.id,
        we.sets,
        we.repetitions,
        we.weight,
        we.rest,
        e.id as exerciseId,
        e.name as exerciseName,
        e.categoryId,
        c.name as categoryName
      FROM workout_exercise we
      JOIN exercises e ON we.exerciseId = e.id
      JOIN categories c ON e.categoryId = c.id
      WHERE we.id = ?`,
      [id],
    )

    return workoutExercise
  }

  async deleteWorkoutExercise({ id }: DeleteWorkoutExerciseParams): Promise<void> {
    await db.runAsync('DELETE FROM workout_exercise WHERE id = ?', [id])
  }
}
