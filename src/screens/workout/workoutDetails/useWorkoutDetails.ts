import { useRef } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import Toast from 'react-native-toast-message'
import { useTranslation } from 'react-i18next'

import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { deleteWorkout, getWorkout } from '@/db'
import { useAppStore } from '@/store'
import { queryClient } from '@/libs/react-query'
import { useCustomQuery } from '@/hooks'

export function useWorkoutDetails() {
  const { setIsLoading, handleErrors } = useAppStore()
  const { t } = useTranslation()
  const { id } = useLocalSearchParams<{ id: string }>()

  const workoutActionsBottomSheetRef = useRef<BottomSheetModal>(null)

  const { data, isLoading, refetch } = useCustomQuery({
    queryKey: ['workoutDetails'],
    queryFn: () => getWorkout({ id }),
  })

  async function handleDeleteWorkout() {
    setIsLoading(true)

    try {
      await deleteWorkout({ id })

      Toast.show({
        type: 'success',
        text1: t('workout.deleteWorkout.success'),
      })

      queryClient.invalidateQueries({ queryKey: ['workouts'] })
      router.back()
    } catch (err) {
      handleErrors(err)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGoToAddExercise() {
    router.push(`(private)/workouts/${id}/add-exercise`)
  }

  async function handleStartSessionWorkout() {
    router.push(`(private)/workouts/${id}/session`)
  }

  return {
    workout: data,
    isLoading,
    workoutActionsBottomSheetRef,
    exercises: data?.exercises,
    isExercisesEmpty: data?.exercises.length === 0,
    exercisesQuantity: data?.exercises.length ?? 0,
    refetch,
    handleDeleteWorkout,
    handleGoToAddExercise,
    handleStartSessionWorkout,
  }
}
