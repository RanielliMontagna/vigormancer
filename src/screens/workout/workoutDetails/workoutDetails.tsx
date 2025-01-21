import { useMemo } from 'react'
import { ImageBackground, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'

import colors from 'tailwindcss/colors'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import WorkoutPlaceholder from '@/assets/images/workout-placeholder.jpg'

import { useWorkoutDetails } from './useWorkoutDetails'

import { BackButton, BottomSheet, Button, IconButton, LoadingOverlay, Text } from '@/components'
import { WorkoutDifficulty } from '@/db/repositories/workouts'
import { useColorScheme } from '@/hooks'

export function WorkoutDetails() {
  const { isDarkColorScheme } = useColorScheme()
  const { t } = useTranslation()

  const { workout, workoutActionsBottomSheetRef } = useWorkoutDetails()

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
            <Button
              onPress={() => console.log('Implement delete workout')}
              startIcon={
                <FontAwesome6
                  name="trash"
                  size={14}
                  color={isDarkColorScheme ? 'black' : 'white'}
                />
              }
            >
              <Text>{t('workout.workoutDetails.delete')}</Text>
            </Button>
          </View>
        </BottomSheet>
      </View>
      <ImageBackground source={imageSource} imageStyle={{ borderRadius: 16 }} className="p-8">
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
          <Text className="text-sm color-white">0 exercises</Text>
        </View>
      </ImageBackground>
      <View>
        <Text className="text-sm text-muted-foreground">
          {t('workout.workoutDetails.exercises')}
        </Text>
        {/* TODO list of exercises */}
      </View>
      <View>
        <Button onPress={() => console.log('Implement start workout')}>
          <Text>{t('workout.workoutDetails.start')}</Text>
        </Button>
      </View>
    </View>
  )
}
