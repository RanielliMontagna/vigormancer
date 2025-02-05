import { View } from 'react-native'
import { useTranslation } from 'react-i18next'

import { BackButton, Button, Form, H2, P, QuantityField, Text } from '@/components'
import { useEditWorkoutExercise } from './useEditWorkoutExercise'

export function EditWorkoutExercise() {
  const { t } = useTranslation()
  const { methods, exercise, handleEditWorkoutExercise } = useEditWorkoutExercise()

  function getMinutesOfRest(restInSeconds: number) {
    return Math.round(restInSeconds / 60)
  }

  const restSeconds = methods.watch('rest')
  const sets = methods.watch('sets')

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
          <QuantityField
            control={methods.control}
            name="sets"
            label={t('workout.workoutDetails.edit.sets')}
            placeholder={t('workout.workoutDetails.edit.setsPlaceholder')}
            required
            min={1}
          />
          <QuantityField
            control={methods.control}
            name="reps"
            label={t('workout.workoutDetails.edit.reps')}
            placeholder={t('workout.workoutDetails.edit.repsPlaceholder')}
            required
            min={1}
          />
          <QuantityField
            control={methods.control}
            name="weight"
            label={t('workout.workoutDetails.edit.weight')}
            placeholder={t('workout.workoutDetails.edit.weightPlaceholder')}
            endAdornment={
              <Text className="text-xs">{t('workout.workoutDetails.edit.weightUnit')}</Text>
            }
          />
          {Number(sets) > 1 && (
            <QuantityField
              control={methods.control}
              name="rest"
              label={t('workout.workoutDetails.edit.rest')}
              placeholder={t('workout.workoutDetails.edit.restPlaceholder')}
              endAdornment={
                <Text className="text-xs">{t('workout.workoutDetails.edit.restUnit')}</Text>
              }
              helperText={t('workout.workoutDetails.edit.restMinutes', {
                minutes: getMinutesOfRest(restSeconds ? Number(restSeconds) : 0),
                count: Math.floor(restSeconds / 60),
              })}
            />
          )}
        </View>
        <Button onPress={methods.handleSubmit(handleEditWorkoutExercise)}>
          <Text>{t('workout.workoutDetails.edit.submit')}</Text>
        </Button>
      </View>
    </Form>
  )
}
