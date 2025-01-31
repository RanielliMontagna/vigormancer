import { v4 as uuidv4 } from 'uuid'

import {
  CreateWorkoutExerciseParams,
  DeleteWorkoutExerciseParams,
  WorkoutExercise,
  WorkoutExercisesRepository,
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

  async getWorkoutExercises(workoutId: string): Promise<WorkoutExercise[]> {
    const workoutExercises = await db.getAllAsync<WorkoutExercise>(
      'SELECT * FROM workout_exercise WHERE workoutId = ?',
      [workoutId],
    )

    return workoutExercises
  }

  async deleteWorkoutExercise({ id }: DeleteWorkoutExerciseParams): Promise<void> {
    await db.runAsync('DELETE FROM workout_exercise WHERE id = ?', [id])
  }
}
