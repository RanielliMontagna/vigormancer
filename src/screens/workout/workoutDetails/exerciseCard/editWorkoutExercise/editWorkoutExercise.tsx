import { View } from 'react-native'
import { useTranslation } from 'react-i18next'

import { BackButton, Button, Form, H2, P, Text, TextField } from '@/components'
import { useEditWorkoutExercise } from './useEditWorkoutExercise'

export function EditWorkoutExercise() {
  const { t } = useTranslation()
  const { methods, exercise, handleEditWorkoutExercise } = useEditWorkoutExercise()

  return (
    <Form {...methods}>
      <View className="h-full p-8 gap-4 bg-background" testID="workout-details">
        <View className="flex flex-row justify-between items-center">
          <BackButton />
        </View>
        <View className="flex flex-col">
          <H2>{t(`${exercise?.exerciseName}.title`)}</H2>
          <P className="text-muted-foreground text-sm">
            {t('workout.workoutDetails.edit.subtitle')}
          </P>
        </View>
        <View className="flex flex-col gap-4 flex-1">
          <TextField
            control={methods.control}
            name="sets"
            label={t('workout.workoutDetails.edit.sets')}
            placeholder={t('workout.workoutDetails.edit.setsPlaceholder')}
            type="number"
            keyboardType="number-pad"
            required
          />
          <TextField
            control={methods.control}
            name="reps"
            label={t('workout.workoutDetails.edit.reps')}
            placeholder={t('workout.workoutDetails.edit.repsPlaceholder')}
            type="number"
            keyboardType="number-pad"
            required
          />
          <TextField
            control={methods.control}
            name="weight"
            label={t('workout.workoutDetails.edit.weight')}
            placeholder={t('workout.workoutDetails.edit.weightPlaceholder')}
            type="number"
            keyboardType="number-pad"
          />
          <TextField
            control={methods.control}
            name="rest"
            label={t('workout.workoutDetails.edit.rest')}
            placeholder={t('workout.workoutDetails.edit.restPlaceholder')}
            type="number"
            keyboardType="number-pad"
          />
        </View>
        <Button onPress={methods.handleSubmit(handleEditWorkoutExercise)}>
          <Text>{t('workout.workoutDetails.edit.submit')}</Text>
        </Button>
      </View>
    </Form>
  )
}
