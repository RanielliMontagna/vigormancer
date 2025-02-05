import { useCallback, useLayoutEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

import z from 'zod'
import { useAppStore } from '@/store'
import { queryClient } from '@/libs/react-query'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  EditWorkoutExerciseParams,
  WorkoutExerciseWithCategory,
} from '@/db/repositories/workoutExercises'
import { editWorkoutExercise } from '@/db/controllers/workoutExercises/edit-workout-exercise'
import { getWorkoutExercise } from '@/db/controllers/workoutExercises/get-workout-exercise'

const editWorkoutExerciseSchema = z.object({
  sets: z.coerce.number().int(),
  reps: z.coerce.number().int(),
  weight: z.coerce.number().int().optional(),
  rest: z.coerce.number().int().optional(),
})

type EditWorkoutExerciseSchema = z.infer<typeof editWorkoutExerciseSchema>

export function useEditWorkoutExercise() {
  const { t } = useTranslation()
  const { setIsLoading, handleErrors } = useAppStore()
  const { id } = useLocalSearchParams<{ id: string }>()

  const [exercise, setExercise] = useState<WorkoutExerciseWithCategory | null>(null)

  const methods = useForm<EditWorkoutExerciseSchema>({
    resolver: zodResolver(editWorkoutExerciseSchema),
    defaultValues: { sets: 0, reps: 0, weight: null, rest: 0 },
  })

  async function handleEditWorkoutExercise(exercise: EditWorkoutExerciseParams) {
    try {
      setIsLoading(true)

      await editWorkoutExercise(exercise)

      queryClient.invalidateQueries({ queryKey: ['workoutDetails'] })
      router.back()
    } catch (error) {
      handleErrors(error)
    } finally {
      setIsLoading(false)
    }
  }

  const getWorkoutExerciseInformations = useCallback(async () => {
    try {
      setIsLoading(true)

      const response = await getWorkoutExercise({ id })

      setExercise(response)

      methods.reset({
        sets: response?.sets,
        reps: response?.repetitions,
        weight: response?.weight,
        rest: response?.rest,
      })
    } catch (err) {
      handleErrors(err)
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading, id, methods, handleErrors])

  useLayoutEffect(() => {
    getWorkoutExerciseInformations()
  }, [getWorkoutExerciseInformations])

  return {
    t,
    methods,
    exercise,
    handleEditWorkoutExercise,
  }
}
