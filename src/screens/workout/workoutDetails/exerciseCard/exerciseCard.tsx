import { Image, TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'

import { FontAwesome } from '@expo/vector-icons'
import { WorkoutExerciseWithCategory } from '@/db/repositories/workoutExercises'

import { Text } from '@/components'
import { cn } from '@/utils'

import { useExerciseCard } from './useExerciseCard'
import { DeleteExerciseCard } from './deleteExerciseCard/deleteExerciseCard'

type ExerciseCardProps = WorkoutExerciseWithCategory

export function ExerciseCard({ exerciseName, sets, repetitions, ...rest }: ExerciseCardProps) {
  const {
    t,
    asset,
    panGesture,
    roundedStyle,
    animatedStyle,
    isDarkColorScheme,
    handleEditExercise,
    handleRemoveExercise,
  } = useExerciseCard({ exerciseName, sets, repetitions, ...rest })

  return (
    <GestureHandlerRootView>
      <View className="mb-2">
        <View className="absolute right-0 top-0 bottom-0 flex-row items-center">
          <TouchableOpacity
            activeOpacity={0.8}
            className="justify-center items-center h-full w-20 bg-indigo-500"
            onPress={handleEditExercise}
          >
            <FontAwesome name="edit" size={24} color="white" />
          </TouchableOpacity>
          <DeleteExerciseCard
            exerciseName={exerciseName}
            handleRemoveExercise={handleRemoveExercise}
          />
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
