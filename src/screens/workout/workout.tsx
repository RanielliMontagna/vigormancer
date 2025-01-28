import { View } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { FlashList } from '@shopify/flash-list'
import { Button, EmptyState, H2, P, Separator, Text } from '@/components'
import { useColorScheme } from '@/hooks'

import { useWorkout } from './useWorkout'
import { WorkoutListItem } from './workoutListItem/workoutListItem'

import DumbbellExercise from '@/assets/svgs/storyset/dumbbell-exercise.svg'

export function Workout() {
  const { isDarkColorScheme } = useColorScheme()
  const {
    t,
    workouts,
    isLoading,
    isWorkoutsEmpty,
    refetch,
    handleAddWorkout,
    handleOpenWorkoutDetails,
  } = useWorkout()

  return (
    <View className="h-full p-8 gap-4 bg-background" testID="workout">
      <View className="flex flex-col">
        <H2>{t('workout.title')}</H2>
        <P className="text-muted-foreground text-sm">{t('workout.subtitle')}</P>
      </View>
      <View className="flex-1">
        {isWorkoutsEmpty ? (
          <EmptyState
            svgImage={DumbbellExercise}
            title={t('workout.emptyState.title')}
            subtitle={t('workout.emptyState.subtitle')}
          />
        ) : (
          <FlashList
            data={workouts}
            refreshing={isLoading}
            onRefresh={refetch}
            estimatedItemSize={114}
            renderItem={({ item, index }) => (
              <WorkoutListItem
                {...item}
                handleOpenWorkoutDetails={handleOpenWorkoutDetails}
                index={index}
              />
            )}
            ItemSeparatorComponent={() => <Separator className="my-1 bg-transparent" />}
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
