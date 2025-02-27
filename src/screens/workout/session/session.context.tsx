import { createContext, useContext, useMemo, useState } from 'react'
import colors from 'tailwindcss/colors'
import { useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'

import { getWorkout } from '@/db'
import { SessionSteps, type SessionContextProps } from './session.types'
import { WorkoutDifficulty } from '@/db/repositories/workouts'

export const SessionContext = createContext({} as SessionContextProps)

export function SessionProvider({ children }) {
  const { id: workoutId } = useLocalSearchParams<{ id: string }>()

  const workoutDetails = useQuery({
    queryKey: ['workoutDetails'],
    queryFn: () => getWorkout({ id: workoutId }),
    gcTime: 0,
  })

  const [step, setStep] = useState(SessionSteps.READY)
  const [workoutTimeInSeconds, setWorkoutTimeInSeconds] = useState(0)

  function nextStep() {
    setStep((prev) => prev + 1)
  }

  function previousStep() {
    setStep((prev) => prev - 1)
  }

  function addWorkoutTime(seconds: number) {
    setWorkoutTimeInSeconds(seconds)
  }

  const difficultyColor = useMemo(() => {
    switch (workoutDetails.data?.difficulty) {
      default:
      case WorkoutDifficulty.BEGINNER:
        return colors.indigo[400]
      case WorkoutDifficulty.INTERMEDIATE:
        return colors.indigo[600]
      case WorkoutDifficulty.ADVANCED:
        return colors.indigo[800]
    }
  }, [workoutDetails.data])

  return (
    <SessionContext.Provider
      value={{
        step,
        workoutTimeInSeconds,
        addWorkoutTime,
        workout: workoutDetails.data,
        difficultyColor,
        nextStep,
        previousStep,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export function useSessionContext() {
  const context = useContext(SessionContext)

  return context
}
