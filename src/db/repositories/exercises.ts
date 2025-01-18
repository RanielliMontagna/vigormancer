export enum ExerciseType {
  STRENGTH = 0,
  CARDIO = 1,
}

export interface Exercise {
  id: string
  name: string
  workoutId: number
  type: ExerciseType
  repetitions?: number
  sets?: number
  distance?: number
  duration?: number
  restTime?: number
  createdAt: string
  updatedAt: string
}

export type CreateExerciseParams = Omit<Exercise, 'id' | 'createdAt' | 'updatedAt'>

export interface ExercisesRepository {
  createExercise(exercise: CreateExerciseParams): Promise<number>
  getExercise(id: number): Promise<Exercise | undefined>
  getExercises(): Promise<Exercise[]>
  updateExercise(id: number): Promise<void>
  deleteExercise(id: number): Promise<void>
}
