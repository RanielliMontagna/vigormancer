import { getWorkout } from '@/db'
import { WorkoutDifficulty } from '@/db/repositories/workouts'
import { useCustomQuery } from '@/hooks'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useMemo, useState } from 'react'
import colors from 'tailwindcss/colors'

export function useSession() {
  const { id: workoutId } = useLocalSearchParams<{ id: string }>()

  const readyToGoCountdown = 15
  const [countdownInSeconds, setCountdownInSeconds] = useState(readyToGoCountdown)

  const fillCountdown = useMemo(
    () => ((readyToGoCountdown - countdownInSeconds) / readyToGoCountdown) * 100,
    [countdownInSeconds],
  )

  const { data } = useCustomQuery({
    queryKey: ['workoutDetails'],
    queryFn: () => getWorkout({ id: workoutId }),
  })

  const difficultyColor = useMemo(() => {
    switch (data?.difficulty) {
      default:
      case WorkoutDifficulty.BEGINNER:
        return colors.indigo[400]
      case WorkoutDifficulty.INTERMEDIATE:
        return colors.indigo[600]
      case WorkoutDifficulty.ADVANCED:
        return colors.indigo[800]
    }
  }, [data?.difficulty])

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdownInSeconds((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [countdownInSeconds])

  useEffect(() => {
    if (countdownInSeconds === 0) {
      // Start the workout
    }
  }, [countdownInSeconds])

  return { countdownInSeconds, fillCountdown, data, difficultyColor }
}
