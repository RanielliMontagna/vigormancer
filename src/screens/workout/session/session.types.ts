import { WorkoutWithExercises } from '@/db/repositories/workouts'

export enum SessionSteps {
  READY,
  WORKOUT,
  FINISHED,
}

export interface SessionContextProps {
  step: SessionSteps
  workout: WorkoutWithExercises
  nextStep: () => void
  previousStep: () => void
}
