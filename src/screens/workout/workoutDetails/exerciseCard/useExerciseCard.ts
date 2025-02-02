import { Asset } from 'expo-asset'
import { useTranslation } from 'react-i18next'
import { Gesture } from 'react-native-gesture-handler'

import { useColorScheme } from '@/hooks'
import { exerciseImageMap } from '@/shared/exerciseImageMap'

import { WorkoutExerciseWithCategory } from '@/db/repositories/workoutExercises'
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { useAppStore } from '@/store'
import { queryClient } from '@/libs/react-query'
import { deleteWorkoutExercise } from '@/db/controllers/workoutExercises/delete-workout-exercise'

export function useExerciseCard({ id, exerciseName }: WorkoutExerciseWithCategory) {
  const { handleErrors, setIsLoading } = useAppStore()

  const { t } = useTranslation()
  const { isDarkColorScheme } = useColorScheme()

  const asset = Asset.fromModule(exerciseImageMap[`${exerciseName}.jpg`])

  const translateX = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  const roundedStyle = useAnimatedStyle(() => ({
    borderTopRightRadius: translateX.value === 0 ? 8 : 0,
    borderBottomRightRadius: translateX.value === 0 ? 8 : 0,
  }))

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (translateX.value > 0) return

      translateX.value = Math.max(event.translationX, -140)
    })
    .onEnd(() => {
      if (translateX.value < -40) {
        translateX.value = withSpring(-140)
      } else {
        translateX.value = withSpring(0)
      }
    })

  function handleEditExercise() {}

  async function handleRemoveExercise() {
    setIsLoading(true)

    try {
      translateX.value = withSpring(0)

      await deleteWorkoutExercise({ workoutExerciseId: id })

      queryClient.invalidateQueries({ queryKey: ['workoutDetails'] })
    } catch (err) {
      handleErrors(err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    t,
    asset,
    panGesture,
    roundedStyle,
    animatedStyle,
    isDarkColorScheme,
    handleEditExercise,
    handleRemoveExercise,
  }
}
