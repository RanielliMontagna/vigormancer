export interface WorkoutExercise {
  id: string
  workoutId: string
  exerciseId: string
  sets: number
  repetitions: number
  weight?: number
  rest?: number
  createdAt: string
  updatedAt: string
}

export type CreateWorkoutExerciseParams = Omit<WorkoutExercise, 'createdAt' | 'updatedAt'>
export type DeleteWorkoutExerciseParams = Pick<WorkoutExercise, 'id'>

export interface WorkoutExercisesRepository {
  createWorkoutExercise(params: CreateWorkoutExerciseParams): Promise<void>
  getWorkoutExercises(workoutId: string): Promise<WorkoutExercise[]>
  deleteWorkoutExercise(params: DeleteWorkoutExerciseParams): Promise<void>
}
