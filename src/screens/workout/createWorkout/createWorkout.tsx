import { ScrollView, View } from 'react-native'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { BackButton, Button, Form, H2, P, Text, TextField } from '@/components'
import { useColorScheme } from '@/hooks'

import { useCreateWorkout } from './useCreateWorkout'

export function CreateWorkout() {
  const { isDarkColorScheme } = useColorScheme()
  const { methods, t, handleSubmit, handleBack } = useCreateWorkout()

  return (
    <Form {...methods}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex flex-1 p-8 bg-background gap-6" testID="create-workout">
          <BackButton />
          <View>
            <H2>{t('workout.createWorkout.title')}</H2>
            <P className="text-sm text-muted-foreground">{t('workout.createWorkout.subtitle')}</P>
          </View>
          <View className="gap-4 flex-1">
            <TextField
              control={methods.control}
              name="name"
              label={t('workout.createWorkout.name')}
              placeholder={t('workout.createWorkout.namePlaceholder')}
              required
            />
            <TextField
              control={methods.control}
              name="description"
              label={t('workout.createWorkout.description')}
              placeholder={t('workout.createWorkout.descriptionPlaceholder')}
              multiline
              numberOfLines={2}
            />
            <TextField
              control={methods.control}
              name="image"
              label={t('workout.createWorkout.image')}
              placeholder={t('workout.createWorkout.imagePlaceholder')}
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
              <Text>{t('workout.createWorkout.submit')}</Text>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" onPress={handleBack}>
              <Text>{t('workout.createWorkout.cancel')}</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </Form>
  )
}
