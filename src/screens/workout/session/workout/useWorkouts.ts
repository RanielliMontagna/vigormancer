import { useEffect, useMemo, useRef, useState } from 'react'
import { useSessionContext } from '../session.context'
import { useAppStore } from '@/store'

export function useWorkout() {
  const { handleErrors } = useAppStore()
  const { workout, difficultyColor, addWorkoutTime, nextStep, handleAddExerciseToSession } =
    useSessionContext()

  const secondsBetweenExercises = 30
  const additionalRestTime = 10

  const [secondsToRest, setSecondsToRest] = useState(secondsBetweenExercises)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [restTime, setRestTime] = useState(0)

  const workoutStartTimeRef = useRef(Date.now())

  function handleGoToNextExercise() {
    if (currentExerciseIndex === workout.exercises.length - 1) {
      const elapsedSeconds = Math.floor((Date.now() - workoutStartTimeRef.current) / 1000)
      addWorkoutTime(elapsedSeconds)

      nextStep()
      return
    }

    setRestTime(secondsToRest)
    setCurrentExerciseIndex((prev) => prev + 1)
  }

  function handleGoToPreviousExercise() {
    if (currentExerciseIndex === 0) return

    setCurrentExerciseIndex((prev) => prev - 1)
  }

  function handleAddRestTime() {
    setRestTime((prev) => prev + additionalRestTime)
    setSecondsToRest((prev) => prev + additionalRestTime)
  }

  function handleSkipRestTime() {
    setRestTime(0)
  }

  async function handleDoneCurrentExercise() {
    try {
      const exercise = workout.exercises[currentExerciseIndex]
      await handleAddExerciseToSession(exercise)

      handleGoToNextExercise()
    } catch (error) {
      handleErrors(error)
    }
  }

  function handleSkipCurrentExercise() {
    handleGoToNextExercise()
  }

  const fillCountdown = useMemo(
    () => ((secondsToRest - restTime) / secondsToRest) * 100,
    [restTime, secondsToRest],
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setRestTime((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  })

  useEffect(() => {
    if (restTime === 0) {
      setSecondsToRest(secondsBetweenExercises)
    }
  }, [restTime])

  return {
    restTime,
    fillCountdown,
    difficultyColor,
    additionalRestTime,
    currentExerciseIndex,
    exerciseCount: workout.exercises.length,
    activeExercise: workout.exercises[currentExerciseIndex],
    nextStep,
    handleAddRestTime,
    handleSkipRestTime,
    handleDoneCurrentExercise,
    handleSkipCurrentExercise,
    handleGoToPreviousExercise,
  }
}
