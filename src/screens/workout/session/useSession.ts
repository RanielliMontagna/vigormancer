import { getWorkout } from '@/db'
import { WorkoutDifficulty } from '@/db/repositories/workouts'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { useMemo } from 'react'
import colors from 'tailwindcss/colors'

export function useSession() {
  const { id: workoutId } = useLocalSearchParams<{ id: string }>()

  const { data } = useQuery({
    queryKey: ['workoutDetails'],
    queryFn: () => getWorkout({ id: workoutId }),
    gcTime: 0,
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

  return { data, difficultyColor }
}
