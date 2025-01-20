import { View } from 'react-native'
import { useTranslation } from 'react-i18next'

import { BackButton, Button, IconButton, Text } from '@/components'
import { useLocalSearchParams } from 'expo-router'

export function WorkoutDetails() {
  const { t } = useTranslation()

  const { id } = useLocalSearchParams<{ id: string }>()

  console.log(`Workout ID: ${id}`)

  return (
    <View className="h-full p-8 gap-4 bg-background" testID="workout-details">
      <View className="flex flex-row justify-between items-center">
        <BackButton />
        <IconButton onPress={() => console.log('Button pressed')} icon="ellipsis-vertical" />
      </View>
      <View></View>
      <View>
        <Text className="text-sm text-muted-foreground">
          {t('workout.workoutDetails.exercises')}
        </Text>
        {/* TODO list of exercises */}
      </View>
      <View>
        <Button onPress={() => console.log('Button pressed')}>
          <Text>{t('workout.workoutDetails.startWorkout')}</Text>
        </Button>
      </View>
    </View>
  )
}
