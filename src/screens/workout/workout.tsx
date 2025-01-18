import { Dimensions, FlatList, View } from 'react-native'

import { Button, H2, H3, P, Text } from '@/components'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { useWorkout } from './useWorkout'

import DumbbellExercise from '@/assets/svgs/storyset/dumbbell-exercise.svg'
import { WorkoutListItem } from './workoutListItem/workoutListItem'
import { useColorScheme } from '@/hooks'

export function Workout() {
  const { isDarkColorScheme } = useColorScheme()
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
          <FlatList
            data={workouts}
            renderItem={({ item, index }) => <WorkoutListItem {...item} index={index} />}
            ItemSeparatorComponent={() => <View className="h-2 bg-divider" />}
          />
        )}
      </View>
      <View>
        <Button
          startIcon={
            <FontAwesome6 name="plus" size={16} color={isDarkColorScheme ? 'black' : 'white'} />
          }
          onPress={handleAddWorkout}
          size="lg"
        >
          <Text>{t('workout.add')}</Text>
        </Button>
      </View>
    </View>
  )
}
