import { ScrollView, View } from 'react-native'

import { useAddExercise } from './useAddExercise'
import { BackButton, Button, Form, H2, P, SelectField, Text, TextField } from '@/components'
import { useColorScheme } from '@/hooks'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

export function AddExercise() {
  const { isDarkColorScheme } = useColorScheme()
  const { methods, t, handleSubmit, handleBack } = useAddExercise()

  return (
    <Form {...methods}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex flex-1 p-8 bg-background gap-6" testID="add-exercise">
          <BackButton />
          <View>
            <H2>{t('workout.addExercise.title')}</H2>
            <P className="text-sm text-muted-foreground">{t('workout.addExercise.subtitle')}</P>
          </View>
          <View className="gap-4 flex-1">
            <SelectField
              control={methods.control}
              name="exercise"
              label={t('workout.addExercise.exercise')}
              placeholder={t('workout.addExercise.exercisePlaceholder')}
              required
              options={[
                { value: 'bench-press', label: 'Bench Press' },
                { value: 'squat', label: 'Squat' },
                { value: 'deadlift', label: 'Deadlift' },
              ]}
            />
            <TextField
              control={methods.control}
              name="sets"
              label={t('workout.addExercise.sets')}
              placeholder={t('workout.addExercise.setsPlaceholder')}
              required
              endAdornment={
                <Text className="text-xs text-muted-foreground">
                  {t('workout.addExercise.setsUnit')}
                </Text>
              }
            />
            <TextField
              control={methods.control}
              name="reps"
              label={t('workout.addExercise.reps')}
              placeholder={t('workout.addExercise.repsPlaceholder')}
              required
              endAdornment={
                <Text className="text-xs text-muted-foreground">
                  {t('workout.addExercise.repsUnit')}
                </Text>
              }
            />
            <TextField
              control={methods.control}
              name="weight"
              label={t('workout.addExercise.weight')}
              placeholder={t('workout.addExercise.weightPlaceholder')}
              endAdornment={
                <Text className="text-xs text-muted-foreground">
                  {t('workout.addExercise.weightUnit')}
                </Text>
              }
            />
          </View>
          <View className="gap-2">
            <Button onPress={handleSubmit} size="lg" className="gap-2">
              <FontAwesome6
                name="circle-check"
                solid
                size={16}
                color={isDarkColorScheme ? 'black' : 'white'}
              />
              <Text>{t('workout.addExercise.submit')}</Text>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" onPress={handleBack}>
              <Text>{t('workout.addExercise.cancel')}</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </Form>
  )
}
