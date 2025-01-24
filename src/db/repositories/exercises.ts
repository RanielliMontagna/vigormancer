export enum ExerciseType {
  STRENGTH = 0,
  CARDIO = 1,
}

export interface Exercise {
  id: string
  name: string
  type: ExerciseType
  image?: string
  createdAt: string
  updatedAt: string
}

export type CreateExerciseParams = Omit<Exercise, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateExerciseParams = Omit<Exercise, 'createdAt' | 'updatedAt'>

export interface ExercisesRepository {
  createExercise(exercise: CreateExerciseParams): Promise<{ id: string }>
  getExercise(id: string): Promise<Exercise | undefined>
  getExercises(): Promise<Exercise[]>
  updateExercise(exercise: UpdateExerciseParams): Promise<void>
  deleteExercise(id: string): Promise<void>
}
