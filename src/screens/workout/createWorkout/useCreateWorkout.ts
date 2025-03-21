import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import Toast from 'react-native-toast-message'
import { SubmitHandler, useForm } from 'react-hook-form'

import * as FileSystem from 'expo-file-system'

import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAppStore } from '@/store'
import { createWorkout } from '@/db'
import { queryClient } from '@/libs/react-query'
import { WorkoutDifficulty } from '@/db/repositories/workouts'

export function useCreateWorkout() {
  const { t } = useTranslation()
  const { setIsLoading, handleErrors } = useAppStore()

  const addWorkoutSchema = z.object({
    name: z.string().min(4, t('validation.minLength', { min: 4 })),
    description: z.string().optional(),
    difficulty: z.nativeEnum(WorkoutDifficulty),
    image: z.string().optional(),
  })

  type AddWorkoutSchema = z.infer<typeof addWorkoutSchema>

  const defaultValues = {
    name: '',
    description: '',
    difficulty: WorkoutDifficulty.BEGINNER,
    image: '',
  }

  const methods = useForm<AddWorkoutSchema>({
    resolver: zodResolver(addWorkoutSchema),
    defaultValues,
  })

  const handleSubmit: SubmitHandler<AddWorkoutSchema> = async (values) => {
    try {
      setIsLoading(true)

      var image: string

      if (values.image) {
        image = await FileSystem.readAsStringAsync(values.image, {
          encoding: FileSystem.EncodingType.Base64,
        })
      }

      await createWorkout({
        name: values.name,
        description: values.description,
        difficulty: values.difficulty,
        image,
      })

      Toast.show({
        type: 'success',
        text1: t('workout.createWorkout.created'),
        text2: t('workout.createWorkout.createdMessage', { name: values.name }),
      })

      queryClient.invalidateQueries({ queryKey: ['workouts'] })

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
