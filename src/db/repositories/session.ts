export interface CreateSessionWorkout {
  userId: string
  workoutId: string
  startedAt: Date
}

export interface FinishSessionWorkout {
  id: string
  finishedAt: Date
}

export interface AddExerciseToSession {
  sessionId: string
  exerciseId: string
  sets: number
  repetitions: number
  weight: number
}

export interface SessionWorkoutRepository {
  createSessionWorkout(sessionWorkout: CreateSessionWorkout): Promise<{ id: string }>
  finishSessionWorkout(sessionWorkout: FinishSessionWorkout): Promise<void>
  quantityFinishedSessions(userId: string): Promise<number>
  addExerciseToSession(exercise: AddExerciseToSession): Promise<void>
  deleteSessionWorkout(sessionId: string): Promise<void>
}
