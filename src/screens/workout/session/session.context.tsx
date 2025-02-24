import { createContext, useContext, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'

import { getWorkout } from '@/db'
import { SessionSteps, type SessionContextProps } from './session.types'

export const SessionContext = createContext({} as SessionContextProps)

export function SessionProvider({ children }) {
  const { id: workoutId } = useLocalSearchParams<{ id: string }>()

  const workoutDetails = useQuery({
    queryKey: ['workoutDetails'],
    queryFn: () => getWorkout({ id: workoutId }),
    gcTime: 0,
  })

  console.log(workoutDetails.data.exercises.length)

  const [step, setStep] = useState(SessionSteps.READY)

  function nextStep() {
    setStep((prev) => prev + 1)
  }

  function previousStep() {
    setStep((prev) => prev - 1)
  }

  return (
    <SessionContext.Provider
      value={{
        step,
        workout: workoutDetails.data,
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
