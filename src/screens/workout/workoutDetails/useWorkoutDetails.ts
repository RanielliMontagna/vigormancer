import { useRef } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import Toast from 'react-native-toast-message'
import { useTranslation } from 'react-i18next'

import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useQuery } from '@tanstack/react-query'
import { deleteWorkout, getWorkout } from '@/db'
import { useAppStore } from '@/store'
import { queryClient } from '@/libs/react-query'

export function useWorkoutDetails() {
  const { setIsLoading, handleErrors } = useAppStore()
  const { t } = useTranslation()
  const { id } = useLocalSearchParams<{ id: string }>()

  const workoutActionsBottomSheetRef = useRef<BottomSheetModal>(null)

  const { data } = useQuery({
    queryKey: ['workout'],
    queryFn: () => getWorkout({ id }),
    gcTime: 0,
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

  return {
    workout: data,
    workoutActionsBottomSheetRef,
    handleDeleteWorkout,
  }
}
