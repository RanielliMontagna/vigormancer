import { useMemo } from 'react'
import { ImageBackground, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'

import colors from 'tailwindcss/colors'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import WorkoutPlaceholder from '@/assets/images/workout-placeholder.jpg'

import { useWorkoutDetails } from './useWorkoutDetails'

import {
  BackButton,
  BottomSheet,
  Button,
  EmptyState,
  IconButton,
  LoadingOverlay,
  Text,
} from '@/components'
import { WorkoutDifficulty } from '@/db/repositories/workouts'
import { useColorScheme } from '@/hooks'
import { DeleteWorkoutDialog } from '../deleteWorkout/deleteWorkout'

import DumbbellExercise from '@/assets/svgs/storyset/dumbbell-exercise.svg'
import { FlashList } from '@shopify/flash-list'

export function WorkoutDetails() {
  const { isDarkColorScheme } = useColorScheme()
  const { t } = useTranslation()

  const {
    workout,
    isExercisesEmpty,
    exercisesQuantity,
    workoutActionsBottomSheetRef,
    handleDeleteWorkout,
    handleGoToAddExercise,
  } = useWorkoutDetails()

  const difficultyColor = useMemo(() => {
    switch (workout?.difficulty) {
      default:
      case WorkoutDifficulty.BEGINNER:
        return colors.indigo[400]
      case WorkoutDifficulty.INTERMEDIATE:
        return colors.indigo[600]
      case WorkoutDifficulty.ADVANCED:
        return colors.indigo[800]
    }
  }, [workout?.difficulty])

  if (!workout) {
    return <LoadingOverlay />
  }

  const imageSource = workout.image
    ? { uri: `data:image/jpeg;base64,${workout.image}` }
    : WorkoutPlaceholder

  return (
    <View className="h-full p-8 gap-4 bg-background" testID="workout-details">
      <View className="flex flex-row justify-between items-center">
        <BackButton />
        <IconButton
          onPress={() => workoutActionsBottomSheetRef.current?.present()}
          icon="ellipsis-vertical"
        />
        <BottomSheet ref={workoutActionsBottomSheetRef}>
          <View className="gap-4">
            <View className="flex flex-row justify-between items-center">
              <Text className="font-lexend-regular">{t('workout.workoutDetails.actions')}</Text>
              <TouchableOpacity onPress={() => workoutActionsBottomSheetRef.current?.dismiss()}>
                <FontAwesome6
                  name="xmark"
                  size={18}
                  color={isDarkColorScheme ? 'white' : 'black'}
                />
              </TouchableOpacity>
            </View>
            <DeleteWorkoutDialog workout={workout} handleDeleteWorkout={handleDeleteWorkout} />
          </View>
        </BottomSheet>
      </View>
      <ImageBackground
        source={imageSource}
        imageStyle={{ borderRadius: 16 }}
        className="p-8 border border-border rounded-3xl"
      >
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: 16,
          }}
        />
        <View className="flex flex-row gap-1 items-baseline">
          <FontAwesome6
            name="bolt-lightning"
            size={10}
            color={workout.difficulty >= WorkoutDifficulty.BEGINNER ? difficultyColor : 'gray'}
          />
          <FontAwesome6
            name="bolt-lightning"
            size={10}
            color={workout.difficulty >= WorkoutDifficulty.INTERMEDIATE ? difficultyColor : 'gray'}
          />
          <FontAwesome6
            name="bolt-lightning"
            size={10}
            color={workout.difficulty === WorkoutDifficulty.ADVANCED ? difficultyColor : 'gray'}
          />
          <Text className="text-xs color-white">
            {t(`workout.difficulty.${workout.difficulty}`)}
          </Text>
        </View>
        <Text className="text-2xl font-lexend-semibold color-white">{workout.name}</Text>
        <Text className="text-sm color-white">{workout.description}</Text>
        <View className="flex flex-row items-center gap-2">
          <FontAwesome5 name="running" size={16} color="white" />
          <Text className="text-sm color-white">
            {exercisesQuantity} {t('workout.workoutDetails.exercises')}
          </Text>
        </View>
      </ImageBackground>
      <View className="flex flex-col flex-1">
        <View className="flex flex-row justify-between items-center">
          <Text className="text-sm text-muted-foreground">
            {t('workout.workoutDetails.exercises')}
          </Text>
          <Button
            size="sm"
            startIcon={
              <FontAwesome5 name="plus" size={14} color={isDarkColorScheme ? 'black' : 'white'} />
            }
            onPress={handleGoToAddExercise}
          >
            <Text>{t('workout.workoutDetails.addExercise')}</Text>
          </Button>
        </View>
        <EmptyState
          svgImage={DumbbellExercise}
          title={t('workout.workoutDetails.emptyState.title')}
          subtitle={t('workout.workoutDetails.emptyState.subtitle')}
        />
        {/* TODO list of exercises */}
      </View>
      <View>
        <Button onPress={() => console.log('Implement start workout')} disabled={isExercisesEmpty}>
          <Text>{t('workout.workoutDetails.start')}</Text>
        </Button>
      </View>
    </View>
  )
}
