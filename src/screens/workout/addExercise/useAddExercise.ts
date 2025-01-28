import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'

import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAppStore } from '@/store'

export function useAddExercise() {
  const { t } = useTranslation()
  const { setIsLoading, handleErrors } = useAppStore()

  const addExerciseSchema = z.object({})

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

  return { methods, t, handleBack, handleSubmit: methods.handleSubmit(handleSubmit) }
}
