import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, Image, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { WorkoutDifficulty, WorkoutWithExercisesCount } from '@/db/repositories/workouts'

import WorkoutPlaceholder from '@/assets/images/workout-placeholder.jpg'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { H4, Text } from '@/components'
import { useColorScheme } from '@/hooks'

interface WorkoutListItemProps extends WorkoutWithExercisesCount {
  index: number
  handleOpenWorkoutDetails: (id: string) => void
}

export function WorkoutListItem({
  index,
  id,
  name,
  image,
  difficulty,
  exercisesCount,
  handleOpenWorkoutDetails,
}: WorkoutListItemProps) {
  const { isDarkColorScheme } = useColorScheme()
  const { t } = useTranslation()

  const difficultyColor = useMemo(() => {
    switch (difficulty) {
      case WorkoutDifficulty.BEGINNER:
        return colors.indigo[400]
      case WorkoutDifficulty.INTERMEDIATE:
        return colors.indigo[600]
      case WorkoutDifficulty.ADVANCED:
        return colors.indigo[800]
    }
  }, [difficulty])

  return (
    <TouchableOpacity
      onPress={() => handleOpenWorkoutDetails(id)}
      activeOpacity={0.8}
      className="flex-1 flex-row bg-card rounded-xl border border-border elevation-sm"
      testID={`workout-list-item-${index}`}
    >
      <View
        className="bg-primary rounded-l-xl"
        style={{ backgroundColor: difficultyColor, width: Dimensions.get('window').width / 50 }}
      />
      <View className="flex-1 justify-center p-4 gap-3">
        <View className="flex flex-row gap-1 items-baseline">
          <FontAwesome6 name="bolt-lightning" size={10} color={difficultyColor} />
          <FontAwesome6
            name="bolt-lightning"
            size={10}
            color={difficulty >= WorkoutDifficulty.INTERMEDIATE ? difficultyColor : 'gray'}
          />
          <FontAwesome6
            name="bolt-lightning"
            size={10}
            color={difficulty === WorkoutDifficulty.ADVANCED ? difficultyColor : 'gray'}
          />
          <Text className="text-xs">{t(`workout.difficulty.${difficulty}`)}</Text>
        </View>
        <View className="gap-1">
          <H4>{name}</H4>
          <View className="flex flex-row items-center gap-2">
            <FontAwesome5 name="running" size={16} color={isDarkColorScheme ? 'white' : 'black'} />
            <Text className="text-xs">{t('workout.exercise', { count: exercisesCount })}</Text>
          </View>
        </View>
      </View>
      <View>
        {image ? (
          <Image
            source={{ uri: `data:image/jpeg;base64,${image}` }}
            className="h-32 rounded-xl"
            style={{
              width: Dimensions.get('window').width / 3,
            }}
          />
        ) : (
          <Image
            source={WorkoutPlaceholder}
            className="h-32 rounded-xl"
            style={{ width: Dimensions.get('window').width / 3 }}
          />
        )}
      </View>
    </TouchableOpacity>
  )
}
