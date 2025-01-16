import { fetchWorkouts } from '@/db'
import { Workout } from '@/db/repositories/workouts'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export function useWorkout() {
  const { t } = useTranslation()

  const [workouts, setWorkouts] = useState<Workout[]>([])

  async function handleAddWorkout() {
    // Fetch workouts
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
