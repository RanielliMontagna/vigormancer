import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAppStore } from '@/store'
import { useQuery } from '@tanstack/react-query'
import { fetchExercises } from '@/db/controllers/exercises/fetch-exercises'
import { useMemo } from 'react'
import { ExerciseWithCategory } from '@/db/repositories/exercises'
import { router, useLocalSearchParams } from 'expo-router'
import { createWorkoutExercise } from '@/db/controllers/workoutExercises/create-workout-exercise'
import Toast from 'react-native-toast-message'

export function useAddExercise() {
  const { t } = useTranslation()
  const { setIsLoading, handleErrors } = useAppStore()
  const { id: workoutId } = useLocalSearchParams<{ id: string }>()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['exercises'],
    queryFn: fetchExercises,
  })

  const exerciseSchema = z.object({
    value: z.string().min(1, t('validation.required')),
    label: z.string().min(1, t('validation.required')),
    group: z.string().optional(),
  })

  const addExerciseSchema = z.object({
    exercise: exerciseSchema.nullable().refine((val) => val !== null, {
      message: t('validation.required'),
    }),
    search: z.string().optional(),
  })

  type AddExerciseSchema = z.infer<typeof addExerciseSchema>

  const defaultValues = {
    exercise: null,
    search: '',
  }

  const methods = useForm<AddExerciseSchema>({
    resolver: zodResolver(addExerciseSchema),
    defaultValues,
  })

  async function handleSelectExercise(exercise: ExerciseWithCategory) {
    try {
      setIsLoading(true)

      await createWorkoutExercise({
        exerciseId: exercise.id,
        workoutId,
        sets: 3,
        repetitions: 8,
        rest: 60,
      })

      Toast.show({
        type: 'success',
        text1: t('workout.addExercise.success'),
        text2: t('workout.addExercise.successMessage', { name: t(`${exercise.name}.title`) }),
        visibilityTime: 2000,
      })

      router.back()
    } catch (error) {
      handleErrors(error)
    } finally {
      setIsLoading(false)
    }
  }

  const search = methods.watch('search')

  const filteredData = useMemo(() => {
    if (search) {
      return data?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    return data
  }, [data, search])

  return {
    t,
    data: filteredData,
    methods,
    isLoading,
    refetch,
    handleSelectExercise,
  }
}
