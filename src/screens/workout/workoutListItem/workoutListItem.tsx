import { H4, Text } from '@/components'
import { Workout } from '@/db/repositories/workouts'

import { Image, View } from 'react-native'

import WorkoutPlaceholder from '@/assets/images/workout-placeholder.jpg'

interface WorkoutListItemProps extends Workout {
  index: number
}

export function WorkoutListItem({ index, name, image }: WorkoutListItemProps) {
  return (
    <View
      className="flex-1 flex-row bg-card rounded-xl border border-border elevation-sm"
      testID={`workout-list-item-${index}`}
    >
      <View className="flex-1 justify-center p-4">
        <H4>{name}</H4>
        <Text className="text-sm">Workout</Text>
      </View>
      <View>
        {image ? (
          <Image
            source={{ uri: `data:image/jpeg;base64,${image}` }}
            className="w-44 h-32 rounded-xl"
          />
        ) : (
          <Image source={WorkoutPlaceholder} className="w-44 h-32 rounded-xl" />
        )}
      </View>
    </View>
  )
}
