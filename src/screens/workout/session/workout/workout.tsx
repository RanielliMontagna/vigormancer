import { Image, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Asset } from 'expo-asset'

import { exerciseImageMap } from '@/shared/exerciseImageMap'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { Exit } from '../exit/exit'
import { useWorkout } from './useWorkouts'
import { Button, Text } from '@/components'
import { useColorScheme } from '@/hooks'

export function Workout() {
  const { t } = useTranslation()
  const { isDarkColorScheme } = useColorScheme()
  const { currentExerciseIndex, activeExercise } = useWorkout()

  const asset = Asset.fromModule(exerciseImageMap[`${activeExercise.exerciseName}.jpg`])

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
          onPress={() => {}}
          startIcon={<FontAwesome6 name="check" color={isDarkColorScheme ? 'black' : 'white'} />}
        >
          <Text>{t('workout.workoutDetails.exerciseCard.done')}</Text>
        </Button>
      </View>
      <View className="flex-row justify-between gap-4">
        <Button
          onPress={() => {}}
          variant="secondary"
          className="flex-1"
          disabled={currentExerciseIndex === 0}
          startIcon={<FontAwesome6 name="arrow-left" />}
        >
          <Text>{t('workout.workoutDetails.exerciseCard.previous')}</Text>
        </Button>
        <View id="divider" className="w-0.5 h-10 bg-gray-200" />
        <Button
          onPress={() => {}}
          variant="secondary"
          className="flex-1"
          startIcon={<FontAwesome6 name="arrow-right" />}
        >
          <Text>{t('workout.workoutDetails.exerciseCard.skip')}</Text>
        </Button>
      </View>
    </View>
  )
}
