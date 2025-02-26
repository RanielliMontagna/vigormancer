import { useEffect, useMemo, useState } from 'react'
import { useSessionContext } from '../session.context'
import { WorkoutDifficulty } from '@/db/repositories/workouts'
import colors from 'tailwindcss/colors'

export function useWorkout() {
  const { workout, nextStep } = useSessionContext()

  const secondsBetweenExercises = 30
  const additionalRestTime = 10

  const [secondsToRest, setSecondsToRest] = useState(secondsBetweenExercises)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [restTime, setRestTime] = useState(0)

  function handleGoToNextExercise() {
    if (currentExerciseIndex === workout.exercises.length - 1) {
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

  function handleDoneCurrentExercise() {
    handleGoToNextExercise()
  }

  function handleSkipCurrentExercise() {
    handleGoToNextExercise()
  }

  const difficultyColor = useMemo(() => {
    switch (workout?.difficulty) {
      default:
      case WorkoutDifficulty.BEGINNER:
        return colors.indigo[400]
      case WorkoutDifficulty.INTERMEDIATE:
        return colors.indigo[600]
      case WorkoutDifficulty.ADVANCED:
        return colors.indigo[800]
    }
  }, [workout])

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
