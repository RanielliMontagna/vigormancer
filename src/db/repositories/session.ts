export interface CreateSessionWorkout {
  userId: string
  workoutId: string
  startedAt: Date
}

export interface FinishSessionWorkout {
  id: string
  finishedAt: Date
}

export interface SessionExercise {
  exerciseId: number
  exerciseName: string
  sets: number
  repetitions: number
  weight: number
}

export interface AddExerciseToSession extends SessionExercise {
  sessionId: string
}

export interface WeeklySession {
  id: string
  workoutId: string
  workoutName: string
  difficulty: number
  image: string
  startedAt: Date
  finishedAt: Date
  exercises: SessionExercise[]
}

export interface SessionWorkoutRepository {
  createSessionWorkout(sessionWorkout: CreateSessionWorkout): Promise<{ id: string }>
  finishSessionWorkout(sessionWorkout: FinishSessionWorkout): Promise<void>
  quantityFinishedSessions(userId: string): Promise<number>
  addExerciseToSession(exercise: AddExerciseToSession): Promise<void>
  deleteSessionWorkout(sessionId: string): Promise<void>
  getLastSessions(userId: string): Promise<WeeklySession[]>
}
