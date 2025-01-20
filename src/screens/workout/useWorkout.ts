import { useTranslation } from 'react-i18next'
import { router } from 'expo-router'

import { fetchWorkouts } from '@/db'
import { useQuery } from '@tanstack/react-query'

export function useWorkout() {
  const { t } = useTranslation()
  const { data } = useQuery({ queryKey: ['workouts'], queryFn: fetchWorkouts })

  async function handleAddWorkout() {
    router.push('(private)/workouts/create-workout')
  }

  async function handleOpenWorkoutDetails(id: string) {
    router.push(`(private)/workouts/${id}`)
  }

  const isWorkoutsEmpty = data?.length === 0

  return { t, workouts: data, isWorkoutsEmpty, handleAddWorkout, handleOpenWorkoutDetails }
}
