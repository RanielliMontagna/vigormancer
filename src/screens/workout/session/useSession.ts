import { getWorkout } from '@/db'
import { WorkoutDifficulty } from '@/db/repositories/workouts'
import { useQuery } from '@tanstack/react-query'
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

  const { data } = useQuery({
    queryKey: ['workoutDetails'],
    queryFn: () => getWorkout({ id: workoutId }),
    gcTime: 0,
    staleTime: 0,
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
