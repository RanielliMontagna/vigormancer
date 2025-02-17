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
import { getWorkoutExercise, updateWorkoutExercise } from '@/db'

const editWorkoutExerciseSchema = z.object({
  sets: z.coerce.number().int(),
  repetitions: z.coerce.number().int(),
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
    defaultValues: { sets: 0, repetitions: 0, weight: null, rest: 0 },
  })

  async function handleEditWorkoutExercise(exercise: EditWorkoutExerciseParams) {
    try {
      setIsLoading(true)

      await updateWorkoutExercise({
        id: id,
        sets: exercise.sets,
        repetitions: exercise.repetitions,
        weight: exercise.weight ?? null,
        rest: exercise.sets > 1 ? exercise.rest : null,
      })

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
        repetitions: response?.repetitions,
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
