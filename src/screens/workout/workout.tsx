import { Dimensions, FlatList, View } from 'react-native'

import { Button, H2, H3, P, Text } from '@/components'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { useWorkout } from './useWorkout'

import DumbbellExercise from '@/assets/svgs/storyset/dumbbell-exercise.svg'

export function Workout() {
  const { t, workouts, isWorkoutsEmpty, handleAddWorkout } = useWorkout()

  return (
    <View className="h-full p-8 gap-4 bg-background" testID="workout">
      <View className="flex flex-col">
        <H2>{t('workout.title')}</H2>
        <P className="text-muted-foreground text-sm">{t('workout.subtitle')}</P>
      </View>
      <View className="flex-1">
        {isWorkoutsEmpty ? (
          <View className="flex-1 justify-center items-center">
            <DumbbellExercise
              width={Dimensions.get('window').width * 0.5}
              height={Dimensions.get('window').width * 0.6}
            />
            <H3>{t('workout.emptyState.title')}</H3>
            <P className="text-muted-foreground text-sm">{t('workout.emptyState.subtitle')}</P>
          </View>
        ) : (
          <FlatList data={workouts} renderItem={() => <View />} />
        )}
      </View>
      <View>
        <Button
          startIcon={<FontAwesome6 name="plus" size={16} color="white" />}
          onPress={handleAddWorkout}
        >
          <Text>{t('workout.add')}</Text>
        </Button>
      </View>
    </View>
  )
}
