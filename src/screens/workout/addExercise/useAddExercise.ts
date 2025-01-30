import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'

import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAppStore } from '@/store'
import { useQuery } from '@tanstack/react-query'
import { fetchExercises } from '@/db/controllers/exercises/fetch-exercises'
import { useMemo } from 'react'
import { exerciseImageMap } from './exerciseImageMap'

export function useAddExercise() {
  const { t } = useTranslation()
  const { setIsLoading, handleErrors } = useAppStore()

  const { data } = useQuery({ queryKey: ['exercises'], queryFn: fetchExercises })

  const exerciseSchema = z.object({
    value: z.string().min(1, t('validation.required')),
    label: z.string().min(1, t('validation.required')),
    group: z.string().optional(),
  })

  const addExerciseSchema = z.object({
    exercise: exerciseSchema.nullable().refine((val) => val !== null, {
      message: t('validation.required'),
    }),
    sets: z.string().min(1, t('validation.required')),
    reps: z.string().min(1, t('validation.required')),
  })

  type AddExerciseSchema = z.infer<typeof addExerciseSchema>

  const defaultValues = {
    exercise: null,
    sets: '',
    reps: '',
    weight: '',
    rest: '',
  }

  const methods = useForm<AddExerciseSchema>({
    resolver: zodResolver(addExerciseSchema),
    defaultValues,
  })

  const handleSubmit: SubmitHandler<AddExerciseSchema> = async (values) => {
    try {
      setIsLoading(true)

      router.back()
    } catch (error) {
      handleErrors(error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleBack() {
    router.back()
  }

  const exerciseOptions = useMemo(() => {
    return data?.map((exercise) => {
      const image = exerciseImageMap[`${exercise.name}.jpg`]
      console.log('image', exercise.name, image)

      return {
        value: exercise.id.toString(),
        label: t(`${exercise.name}.title`),
        group: exercise.category.name,
        image: image,
      }
    })
  }, [data, t])

  return {
    t,
    methods,
    exerciseOptions: exerciseOptions ?? [],
    handleBack,
    handleSubmit: methods.handleSubmit(handleSubmit),
  }
}
