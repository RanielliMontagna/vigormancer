import { v4 as uuidv4 } from 'uuid'

import {
  AddExerciseToSession,
  CreateSessionWorkout,
  FinishSessionWorkout,
  SessionExercise,
  SessionWorkoutRepository,
  WeeklySession,
} from '../session'

import { db } from '@/db'

export class SqliteSessionWorkoutRepository implements SessionWorkoutRepository {
  async getLastSessions(userId: string): Promise<WeeklySession[]> {
    const weeklySessions = await db.getAllAsync<WeeklySession>(
      `SELECT
            s.id,
            s.workoutId,
            s.startedAt,
            s.finishedAt,
            w.name as workoutName,
            w.difficulty,
            w.image
          FROM user_workout_sessions s
          JOIN workouts w ON s.workoutId = w.id
          WHERE s.userId = ?
          ORDER BY s.startedAt DESC
          LIMIT 3`,
      [userId],
    )

    const weeklySessionsWithExercises = await Promise.all(
      weeklySessions.map(async (session) => {
        const exercises = await db.getAllAsync<SessionExercise>(
          `SELECT exerciseId, exerciseName, sets, repetitions, weight
           FROM user_workout_exercises
           WHERE sessionId = ?`,
          [session.id],
        )

        return { ...session, exercises }
      }),
    )

    return weeklySessionsWithExercises
  }

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
    const id = uuidv4()

    await db.runAsync(
      `INSERT INTO user_workout_exercises (id, sessionId, exerciseId, exerciseName, sets, repetitions, weight) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        exercise.sessionId,
        exercise.exerciseId,
        exercise.exerciseName,
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
