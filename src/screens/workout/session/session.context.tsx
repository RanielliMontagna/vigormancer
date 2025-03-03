import { createContext, useContext, useMemo, useState } from 'react'
import colors from 'tailwindcss/colors'
import { router, useLocalSearchParams } from 'expo-router'
import {
  addExerciseToSession,
  createSessionWorkout,
  deleteSessionWorkout,
  finishSessionWorkout,
  getWorkout,
} from '@/db'
import { SessionSteps, type SessionContextProps } from './session.types'
import { WorkoutDifficulty } from '@/db/repositories/workouts'
import { useAppStore } from '@/store'
import { useUser } from '@clerk/clerk-expo'
import Toast from 'react-native-toast-message'
import { useTranslation } from 'react-i18next'
import { WorkoutExerciseWithCategory } from '@/db/repositories/workoutExercises'
import { useCustomQuery } from '@/hooks'

export const SessionContext = createContext({} as SessionContextProps)

export function SessionProvider({ children }) {
  const { user } = useUser()
  const { t } = useTranslation()
  const { handleErrors } = useAppStore()
  const { id: workoutId } = useLocalSearchParams<{ id: string }>()

  const workoutDetails = useCustomQuery({
    queryKey: ['workoutDetails'],
    queryFn: () => getWorkout({ id: workoutId }),
  })

  const [step, setStep] = useState(SessionSteps.READY)
  const [workoutTimeInSeconds, setWorkoutTimeInSeconds] = useState(0)
  const [actualSessionId, setActualSessionId] = useState<string | null>(null)

  function nextStep() {
    setStep((prev) => prev + 1)
  }

  function previousStep() {
    setStep((prev) => prev - 1)
  }

  function addWorkoutTime(seconds: number) {
    setWorkoutTimeInSeconds(seconds)
  }

  async function handleWorkoutStart() {
    try {
      const response = await createSessionWorkout({
        userId: user.id,
        workoutId,
        startedAt: new Date(),
      })

      setActualSessionId(response.id)

      nextStep()
    } catch (error) {
      handleErrors(error)
    }
  }

  async function handleWorkoutFinish() {
    try {
      await finishSessionWorkout({ id: actualSessionId, finishedAt: new Date() })

      Toast.show({
        text1: t('workout.session.finish.success'),
        text2: t('workout.session.finish.successMessage'),
        type: 'success',
      })

      router.dismissAll()
    } catch (error) {
      handleErrors(error)
    }
  }

  async function handleAddExerciseToSession(exercise: WorkoutExerciseWithCategory) {
    try {
      await addExerciseToSession({
        sessionId: actualSessionId,
        exerciseId: Number(exercise.exerciseId),
        exerciseName: exercise.exerciseName,
        repetitions: exercise.repetitions,
        sets: exercise.sets,
        weight: exercise.weight,
      })
    } catch (error) {
      handleErrors(error)
    }
  }

  async function handleCancelWorkout() {
    try {
      await deleteSessionWorkout(actualSessionId)
    } catch (error) {
      handleErrors(error)
    }
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
        difficultyColor,
        workoutTimeInSeconds,
        workout: workoutDetails.data,
        addWorkoutTime,
        nextStep,
        previousStep,
        handleWorkoutStart,
        handleWorkoutFinish,
        handleCancelWorkout,
        handleAddExerciseToSession,
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
