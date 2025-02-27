import { Image, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Asset } from 'expo-asset'

import { exerciseImageMap } from '@/shared/exerciseImageMap'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { Exit } from '../exit/exit'
import { useWorkout } from './useWorkouts'
import { Button, Text } from '@/components'
import { useColorScheme } from '@/hooks'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import colors from 'tailwindcss/colors'
import { cn } from '@/utils'

export function Workout() {
  const { t } = useTranslation()
  const { isDarkColorScheme } = useColorScheme()

  const {
    restTime,
    exerciseCount,
    fillCountdown,
    activeExercise,
    difficultyColor,
    additionalRestTime,
    currentExerciseIndex,
    handleAddRestTime,
    handleSkipRestTime,
    handleDoneCurrentExercise,
    handleSkipCurrentExercise,
    handleGoToPreviousExercise,
  } = useWorkout()

  const asset = Asset.fromModule(exerciseImageMap[`${activeExercise.exerciseName}.jpg`])

  if (restTime > 0) {
    return (
      <View className="gap-4 flex-col flex-1">
        <Exit />
        <Image source={{ uri: asset.uri }} className="w-full h-56 rounded-lg bg-zinc-200" />
        <View className="p-4 bg-card rounded-lg gap-4">
          <View>
            <Text className="text-sm font-regular">
              {t('workout.workoutDetails.exerciseCard.next')} {currentExerciseIndex + 1}/
              {exerciseCount}
            </Text>
            <Text className="text-lg font-bold">{t(`${activeExercise.exerciseName}.title`)}</Text>
            <Text className="text-sm text-gray-500">
              {t('workout.workoutDetails.exerciseCard.sets', { sets: activeExercise.sets })}
              {t('workout.workoutDetails.exerciseCard.reps', { reps: activeExercise.repetitions })}
            </Text>
          </View>
        </View>
        <View
          testID="countdown-container"
          className="flex-1 flex-column justify-center items-center gap-4"
        >
          <Text className="text-xs">{t('workout.workoutDetails.exerciseCard.countdown')}</Text>
          <AnimatedCircularProgress
            size={150}
            width={10}
            fill={fillCountdown}
            fillLineCap="round"
            rotation={0}
            tintColor={difficultyColor}
            backgroundColor={isDarkColorScheme ? colors.gray[600] : colors.gray[200]}
          >
            {() => {
              return <Text className="text-4xl font-lexend-semibold">{restTime}</Text>
            }}
          </AnimatedCircularProgress>
        </View>
        <View className="flex-row justify-between gap-4">
          <Button onPress={handleAddRestTime} variant="secondary" className="flex-1">
            <Text>
              {t('workout.workoutDetails.exerciseCard.addRestTime', {
                seconds: additionalRestTime?.toString(),
              })}
            </Text>
          </Button>
          <View id="divider" className="w-0.5 h-10 bg-gray-200" />
          <Button
            onPress={handleSkipRestTime}
            variant="secondary"
            className="flex-1"
            startIcon={<FontAwesome6 name="play" color={isDarkColorScheme ? 'white' : 'black'} />}
          >
            <Text>{t('workout.workoutDetails.exerciseCard.startNow')}</Text>
          </Button>
        </View>
      </View>
    )
  }

  return (
    <View className="gap-4 flex-col flex-1">
      <Exit />
      <Image source={{ uri: asset.uri }} className="w-full h-56 rounded-lg bg-zinc-200" />
      <View className="p-4 bg-card rounded-lg gap-4">
        <View>
          <Text className="text-lg font-bold">{t(`${activeExercise.exerciseName}.title`)}</Text>
          <Text className="text-sm text-gray-500">
            {t(`${activeExercise.exerciseName}.description`)}
          </Text>
        </View>
      </View>
      <View className="flex-1 justify-center items-center gap-4">
        <View>
          <Text className="text-lg text-center font-regular">
            {t('workout.workoutDetails.exerciseCard.sets', { sets: activeExercise.sets })}
          </Text>
          <Text className="text-2xl text-center font-bold">
            {t('workout.workoutDetails.exerciseCard.reps', { reps: activeExercise.repetitions })}
          </Text>
        </View>
        <Button
          className="w-full"
          size="lg"
          onPress={handleDoneCurrentExercise}
          startIcon={<FontAwesome6 name="check" color={isDarkColorScheme ? 'black' : 'white'} />}
        >
          <Text>{t('workout.workoutDetails.exerciseCard.done')}</Text>
        </Button>
      </View>
      <View className="flex-row justify-between items-center gap-4">
        <Button
          onPress={handleGoToPreviousExercise}
          variant="secondary"
          className="flex-1"
          disabled={currentExerciseIndex === 0}
          startIcon={
            <FontAwesome6 name="arrow-left" color={isDarkColorScheme ? 'white' : 'black'} />
          }
        >
          <Text>{t('workout.workoutDetails.exerciseCard.previous')}</Text>
        </Button>
        <View
          id="divider"
          className={cn('w-0.5 h-10', isDarkColorScheme ? 'bg-zinc-800' : 'bg-gray-200')}
        />
        <Button
          onPress={handleSkipCurrentExercise}
          variant="secondary"
          className="flex-1"
          startIcon={
            <FontAwesome6 name="arrow-right" color={isDarkColorScheme ? 'white' : 'black'} />
          }
        >
          <Text>{t('workout.workoutDetails.exerciseCard.skip')}</Text>
        </Button>
      </View>
    </View>
  )
}
