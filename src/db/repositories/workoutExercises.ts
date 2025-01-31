export interface WorkoutExercise {
  workoutId: string
  exerciseId: number
  sets: number
  repetitions: number
  weight?: number
  rest?: number
  createdAt: string
  updatedAt: string
}

export type CreateWorkoutExerciseParams = Omit<WorkoutExercise, 'createdAt' | 'updatedAt'>
export type DeleteWorkoutExerciseParams = { id: string }
export interface WorkoutExercisesRepository {
  createWorkoutExercise(params: CreateWorkoutExerciseParams): Promise<void>
  getWorkoutExercises(workoutId: string): Promise<WorkoutExercise[]>
  deleteWorkoutExercise(params: DeleteWorkoutExerciseParams): Promise<void>
}
