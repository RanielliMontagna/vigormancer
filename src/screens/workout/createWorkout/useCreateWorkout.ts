import z from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppStore } from '@/store'
import Toast from 'react-native-toast-message'
import { router } from 'expo-router'
import { createWorkout } from '@/db'
import { queryClient } from '@/libs/react-query'

export function useCreateWorkout() {
  const { t } = useTranslation()
  const { setIsLoading, handleErrors } = useAppStore()

  const addWorkoutSchema = z.object({
    name: z.string().min(4, t('validation.minLength', { min: 4 })),
    description: z.string().optional(),
    image: z
      .string()
      .optional()
      .refine(
        (value) => {
          if (value === '') return true
          return value.startsWith('http') || value.startsWith('https')
        },
        { message: t('validation.url') },
      ),
  })

  type AddWorkoutSchema = z.infer<typeof addWorkoutSchema>

  const defaultValues = {
    name: '',
    description: '',
    image: '',
  }

  const methods = useForm<AddWorkoutSchema>({
    resolver: zodResolver(addWorkoutSchema),
    defaultValues,
  })

  const handleSubmit: SubmitHandler<AddWorkoutSchema> = async (values) => {
    try {
      setIsLoading(true)

      const response = await createWorkout({
        name: values.name,
        description: values.description,
        imagePath: values.image,
      })

      if (response.id) {
        Toast.show({
          type: 'success',
          text1: t('workout.createWorkout.created'),
          text2: t('workout.createWorkout.createdMessage', { name: values.name }),
        })

        queryClient.invalidateQueries({ queryKey: ['workouts'] })

        router.back()
      } else {
        throw new Error(t('workout.createWorkout.error'))
      }
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
