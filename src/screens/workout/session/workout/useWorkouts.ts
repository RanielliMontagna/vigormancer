import { useState } from 'react'
import { useSessionContext } from '../session.context'

export function useWorkout() {
  const { workout, nextStep } = useSessionContext()

  console.log(workout.exercises)

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)

  function handleGoToNextExercise() {
    if (currentExerciseIndex === workout.exercises.length - 1) {
      nextStep()
      return
    }

    setCurrentExerciseIndex((prev) => prev + 1)
  }

  return {
    currentExerciseIndex,
    activeExercise: workout.exercises[currentExerciseIndex],
    nextStep,
    handleGoToNextExercise,
  }
}
