import { Text } from '@/components'
import { Workout } from '@/db/repositories/workouts'

import { View } from 'react-native'

interface WorkoutListItemProps extends Workout {
  index: number
}

export function WorkoutListItem({ index, name }: WorkoutListItemProps) {
  return (
    <View className="flex-1 bg-card p-4 rounded-lg ele" testID={`workout-list-item-${index}`}>
      <Text>{name}</Text>
    </View>
  )
}
