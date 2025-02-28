export interface CreateSessionWorkout {
  id: string
  userId: string
  sessionId: string
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
  createSessionWorkout(sessionWorkout: CreateSessionWorkout): Promise<void>
  finishSessionWorkout(sessionWorkout: FinishSessionWorkout): Promise<void>
  quantityFinishedSessions(userId: string): Promise<number>
  addExerciseToSession(exercise: AddExerciseToSession): Promise<void>
}
