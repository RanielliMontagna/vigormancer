import { useEffect, useMemo, useState } from 'react'
import colors from 'tailwindcss/colors'

import { WorkoutDifficulty } from '@/db/repositories/workouts'
import { useSessionContext } from '../session.context'

export function useReady() {
  const { workout, nextStep } = useSessionContext()

  const readyToGoCountdown = 15
  const [countdownInSeconds, setCountdownInSeconds] = useState(readyToGoCountdown)

  const fillCountdown = useMemo(
    () => ((readyToGoCountdown - countdownInSeconds) / readyToGoCountdown) * 100,
    [countdownInSeconds],
  )

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdownInSeconds((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [countdownInSeconds])

  useEffect(() => {
    if (countdownInSeconds === 0) {
      nextStep()
    }
  }, [countdownInSeconds, nextStep])

  return {
    countdownInSeconds,
    difficultyColor,
    fillCountdown,
  }
}
