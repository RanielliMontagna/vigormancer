import { Image, TouchableOpacity, View } from 'react-native'

import { Text } from '@/components'
import { useTranslation } from 'react-i18next'
import { Asset } from 'expo-asset'
import { exerciseImageMap } from '@/shared/exerciseImageMap'
import { WorkoutExerciseWithCategory } from '@/db/repositories/workoutExercises'

import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'

import { FontAwesome } from '@expo/vector-icons'
import { useColorScheme } from '@/hooks'
import { cn } from '@/utils'

type ExerciseCardProps = WorkoutExerciseWithCategory

export function ExerciseCard({ exerciseName, sets, repetitions }: ExerciseCardProps) {
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
      translateX.value = Math.max(event.translationX, -140)
    })
    .onEnd(() => {
      if (translateX.value < -40) {
        translateX.value = withSpring(-140)
      } else {
        translateX.value = withSpring(0)
      }
    })

  return (
    <GestureHandlerRootView>
      <View className="mb-4">
        <View className="absolute right-0 top-0 bottom-0 flex-row items-center">
          <TouchableOpacity
            activeOpacity={0.8}
            className="justify-center items-center h-full w-20 bg-indigo-500"
          >
            <FontAwesome name="edit" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            className="justify-center items-center h-full w-20 rounded-r-lg bg-red-500"
          >
            <FontAwesome name="trash" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <GestureDetector gesture={panGesture}>
          <Animated.View className="bg-card rounded-lg shadow flex-row" style={animatedStyle}>
            <View className="p-4 flex-row items-center flex-1">
              <Image source={{ uri: asset.uri }} className="w-24 h-24 rounded-lg" />
              <View className="flex-1 ml-4">
                <Text className="text-lg font-bold">{t(`${exerciseName}.title`)}</Text>
                <Text className="text-sm text-gray-500">
                  {sets > 1 && t('workout.workoutDetails.exerciseCard.sets', { sets })}
                  {t('workout.workoutDetails.exerciseCard.reps', { reps: repetitions })}
                </Text>
              </View>
            </View>
            <Animated.View
              className={cn('w-2', isDarkColorScheme ? 'bg-zinc-800' : 'bg-zinc-200')}
              style={roundedStyle}
            />
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  )
}
