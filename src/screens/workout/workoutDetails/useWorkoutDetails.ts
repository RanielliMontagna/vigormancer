import { useRef } from 'react'
import { useLocalSearchParams } from 'expo-router'

import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useQuery } from '@tanstack/react-query'
import { getWorkout } from '@/db'

export function useWorkoutDetails() {
  const workoutActionsBottomSheetRef = useRef<BottomSheetModal>(null)

  const { id } = useLocalSearchParams<{ id: string }>()
  const { data } = useQuery({
    queryKey: ['workout'],
    queryFn: () => getWorkout({ id }),
    gcTime: 0,
  })

  return {
    workout: data,
    workoutActionsBottomSheetRef,
  }
}
