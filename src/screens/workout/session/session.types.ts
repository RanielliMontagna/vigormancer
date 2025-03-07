import { WorkoutExerciseWithCategory } from '@/db/repositories/workoutExercises'
import { WorkoutWithExercises } from '@/db/repositories/workouts'

export enum SessionSteps {
  READY,
  WORKOUT,
  FINISHED,
}

export interface SessionContextProps {
  step: SessionSteps
  workout: WorkoutWithExercises
  workoutTimeInSeconds: number
  difficultyColor: string
  nextStep: () => void
  previousStep: () => void
  addWorkoutTime: (seconds: number) => void
  handleWorkoutStart: () => Promise<void>
  handleWorkoutFinish: () => Promise<void>
  handleCancelWorkout: () => Promise<void>
  handleAddExerciseToSession: (exercise: WorkoutExerciseWithCategory) => Promise<void>
}
