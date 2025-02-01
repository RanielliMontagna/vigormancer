export enum ExerciseType {
  STRENGTH = 0,
  CARDIO = 1,
}

export interface Exercise {
  id: number
  categoryId: string
  exerciseName: string
  type: ExerciseType
  image?: string
  createdAt: string
  updatedAt: string
}

export interface ExerciseWithCategory
  extends Omit<Exercise, 'categoryId' | 'createdAt' | 'updatedAt'> {
  categoryName: string
  categoryId: string
}

export type CreateExerciseParams = Omit<Exercise, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: number
}
export type UpdateExerciseParams = Omit<Exercise, 'categoryId' | 'createdAt' | 'updatedAt'>

export interface ExercisesRepository {
  createExercise(exercise: CreateExerciseParams): Promise<{ id: number }>
  getExercise(id: number): Promise<ExerciseWithCategory | undefined>
  getExercises(): Promise<ExerciseWithCategory[]>
  updateExercise(exercise: UpdateExerciseParams): Promise<void>
  deleteExercise(id: number): Promise<void>
}
