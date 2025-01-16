export interface Workout {
  id: string
  name: string
  description?: string
  imagePath?: string
  createdAt: string
  updatedAt: string
}

export type CreateWorkoutParams = Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateWorkoutParams = Omit<Workout, 'createdAt' | 'updatedAt'>

export interface WorkoutsRepository {
  createWorkout(workout: CreateWorkoutParams): Promise<{ id: string }>
  getWorkout(id: number): Promise<Workout | undefined>
  getWorkouts(): Promise<Workout[]>
  updateWorkout(workout: UpdateWorkoutParams): Promise<void>
  deleteWorkout(id: number): Promise<void>
}
