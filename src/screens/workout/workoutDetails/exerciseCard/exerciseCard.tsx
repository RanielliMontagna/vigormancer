import { Image, View } from 'react-native'

import { Text } from '@/components'
import { useTranslation } from 'react-i18next'
import { Asset } from 'expo-asset'
import { exerciseImageMap } from '@/shared/exerciseImageMap'
import { WorkoutExerciseWithCategory } from '@/db/repositories/workoutExercises'

type ExerciseCardProps = WorkoutExerciseWithCategory

export function ExerciseCard({ exerciseName, sets, repetitions, ...rest }: ExerciseCardProps) {
  const { t } = useTranslation()

  const asset = Asset.fromModule(exerciseImageMap[`${exerciseName}.jpg`])

  return (
    <View className="bg-white rounded-lg shadow-md p-4 flex-row gap-1">
      <Image source={{ uri: asset.uri }} className="w-36 h-24 rounded-lg" />
      <View className="flex-1 justify-center">
        <Text className="text-md font-bold">{t(`${exerciseName}.title`)}</Text>
        <Text className="text-sm text-gray-500">
          {sets > 1 && t('workout.workoutDetails.exerciseCard.sets', { sets })}
          {t('workout.workoutDetails.exerciseCard.reps', { reps: repetitions })}
        </Text>
      </View>
    </View>
  )
}
