export enum ExerciseType {
  STRENGTH = 0,
  CARDIO = 1,
}

export interface Exercise {
  id: string
  categoryId: string
  name: string
  type: ExerciseType
  image?: string
  createdAt: string
  updatedAt: string
}

export interface ExerciseWithCategory
  extends Omit<Exercise, 'categoryId' | 'createdAt' | 'updatedAt'> {
  category: { id: string; name: string }
}

export type CreateExerciseParams = Omit<Exercise, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateExerciseParams = Omit<Exercise, 'categoryId' | 'createdAt' | 'updatedAt'>

export interface ExercisesRepository {
  createExercise(exercise: CreateExerciseParams): Promise<{ id: string }>
  getExercise(id: string): Promise<ExerciseWithCategory | undefined>
  getExercises(): Promise<ExerciseWithCategory[]>
  updateExercise(exercise: UpdateExerciseParams): Promise<void>
  deleteExercise(id: string): Promise<void>
}
