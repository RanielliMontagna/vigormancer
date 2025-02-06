export interface WorkoutExercise {
  id: string
  workoutId: string
  exerciseId: number
  sets: number
  repetitions: number
  weight?: number
  rest?: number
  createdAt: string
  updatedAt: string
}

export interface WorkoutExerciseWithCategory extends WorkoutExercise {
  exerciseName: string
  categoryName: string
  categoryId: string
}

export type CreateWorkoutExerciseParams = Omit<WorkoutExercise, 'id' | 'createdAt' | 'updatedAt'>

export type EditWorkoutExerciseParams = Omit<
  WorkoutExercise,
  'workoutId' | 'exerciseId' | 'createdAt' | 'updatedAt'
>

export type DeleteWorkoutExerciseParams = { id: string }
export interface WorkoutExercisesRepository {
  createWorkoutExercise(params: CreateWorkoutExerciseParams): Promise<void>
  editWorkoutExercise(params: EditWorkoutExerciseParams): Promise<void>
  getWorkoutExercises(workoutId: string): Promise<WorkoutExerciseWithCategory[]>
  getWorkoutExercise(id: string): Promise<WorkoutExerciseWithCategory | undefined>
  deleteWorkoutExercise(params: DeleteWorkoutExerciseParams): Promise<void>
}
