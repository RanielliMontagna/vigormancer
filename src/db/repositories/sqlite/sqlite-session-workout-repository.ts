import { v4 as uuidv4 } from 'uuid'

import {
  AddExerciseToSession,
  CreateSessionWorkout,
  FinishSessionWorkout,
  SessionWorkoutRepository,
} from '../session'

import { db } from '@/db'

export class SqliteSessionWorkoutRepository implements SessionWorkoutRepository {
  async createSessionWorkout(sessionWorkout: CreateSessionWorkout): Promise<{ id: string }> {
    const id = uuidv4()

    await db.runAsync(
      `INSERT INTO user_workout_sessions (id, userId, workoutId, startedAt) VALUES (?, ?, ?, ?)`,
      [id, sessionWorkout.userId, sessionWorkout.workoutId, sessionWorkout.startedAt.toISOString()],
    )

    return { id }
  }

  async finishSessionWorkout(sessionWorkout: FinishSessionWorkout): Promise<void> {
    await db.runAsync(`UPDATE user_workout_sessions SET finishedAt = ? WHERE id = ?`, [
      sessionWorkout.finishedAt.toISOString(),
      sessionWorkout.id,
    ])
  }

  async quantityFinishedSessions(userId: string): Promise<number> {
    const { quantityFinishedSessions } = await db.getFirstAsync<{
      quantityFinishedSessions: number
    }>(
      `SELECT COUNT(*) as quantityFinishedSessions
       FROM user_workout_sessions
       WHERE userId = ? AND finishedAt IS NOT NULL`,
      [userId],
    )

    return quantityFinishedSessions
  }

  async addExerciseToSession(exercise: AddExerciseToSession): Promise<void> {
    await db.runAsync(
      `INSERT INTO user_workout_exercises (sessionId, exerciseId, sets, repetitions, weight) VALUES (?, ?, ?, ?, ?)`,
      [
        exercise.sessionId,
        exercise.exerciseId,
        exercise.sets,
        exercise.repetitions,
        exercise.weight,
      ],
    )
  }

  async deleteSessionWorkout(sessionId: string): Promise<void> {
    await db.runAsync(`DELETE FROM user_workout_exercises WHERE sessionId = ?`, [sessionId])
    await db.runAsync(`DELETE FROM user_workout_sessions WHERE id = ?`, [sessionId])
  }
}
