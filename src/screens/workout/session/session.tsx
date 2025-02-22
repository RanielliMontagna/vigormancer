import { useTranslation } from 'react-i18next'
import { ImageBackground, StyleSheet, View } from 'react-native'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import WorkoutPlaceholder from '@/assets/images/workout-placeholder.jpg'

import { useSession } from './useSession'

import { BackButton, Text } from '@/components'
import { WorkoutDifficulty } from '@/db/repositories/workouts'

export function Session() {
  const { t } = useTranslation()
  const { data, difficultyColor } = useSession()

  const imageSource = data.image
    ? { uri: `data:image/jpeg;base64,${data.image}` }
    : WorkoutPlaceholder

  return (
    <View className="h-full p-8 gap-4 bg-background" testID="session">
      <BackButton />
      <ImageBackground
        source={imageSource}
        imageStyle={{ borderRadius: 16 }}
        className="px-8 py-16 border border-border rounded-3xl"
      >
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: 16,
          }}
        />
        <View className="flex flex-row gap-1 items-baseline">
          <FontAwesome6 name="bolt-lightning" size={10} color={difficultyColor} />
          <FontAwesome6
            name="bolt-lightning"
            size={10}
            color={data.difficulty >= WorkoutDifficulty.INTERMEDIATE ? difficultyColor : 'gray'}
          />
          <FontAwesome6
            name="bolt-lightning"
            size={10}
            color={data.difficulty === WorkoutDifficulty.ADVANCED ? difficultyColor : 'gray'}
          />
          <Text className="text-xs color-white">{t(`workout.difficulty.${data.difficulty}`)}</Text>
        </View>
        <Text className="text-2xl font-lexend-semibold color-white">{data.name}</Text>
      </ImageBackground>
    </View>
  )
}
