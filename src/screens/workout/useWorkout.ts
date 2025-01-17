import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { router } from 'expo-router'

import { fetchWorkouts } from '@/db'
import { Workout } from '@/db/repositories/workouts'

export function useWorkout() {
  const { t } = useTranslation()

  const [workouts, setWorkouts] = useState<Workout[]>([])

  async function handleAddWorkout() {
    router.push('(private)/create-workout')
  }

  async function handleFetchWorkouts() {
    // Add workout logic
    try {
      const response = await fetchWorkouts()
      setWorkouts(response)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handleFetchWorkouts()
  }, [])

  const isWorkoutsEmpty = workouts.length === 0

  return { t, workouts, isWorkoutsEmpty, handleAddWorkout }
}
