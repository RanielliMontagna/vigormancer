import { WorkoutExerciseWithCategory } from './workoutExercises'

export enum WorkoutDifficulty {
  BEGINNER = 0,
  INTERMEDIATE = 1,
  ADVANCED = 2,
}

export interface Workout {
  id: string
  name: string
  description?: string
  difficulty?: number
  image?: string
  createdAt: string
  updatedAt: string
}

export type CreateWorkoutParams = Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateWorkoutParams = Omit<Workout, 'createdAt' | 'updatedAt'>
export type WorkoutWithExercises = Workout & { exercises: WorkoutExerciseWithCategory[] }
export type WorkoutWithExercisesCount = Workout & { exercisesCount: number }

export interface WorkoutsRepository {
  createWorkout(workout: CreateWorkoutParams): Promise<{ id: string }>
  getWorkout(id: string): Promise<WorkoutWithExercises | undefined>
  getWorkouts(): Promise<WorkoutWithExercisesCount[]>
  updateWorkout(workout: UpdateWorkoutParams): Promise<void>
  deleteWorkout(id: string): Promise<void>
}
