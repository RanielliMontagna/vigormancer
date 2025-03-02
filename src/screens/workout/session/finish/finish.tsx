import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import { Button, Text } from '@/components'

import SessionFinished from '@/assets/images/session-finished.jpg'
import { useSessionContext } from '../session.context'
import dayjs from 'dayjs'

export function Finish() {
  const { t } = useTranslation()
  const { workout, difficultyColor, workoutTimeInSeconds, handleWorkoutFinish } =
    useSessionContext()

  return (
    <>
      <ImageBackground
        source={SessionFinished}
        imageStyle={{ borderRadius: 16 }}
        className="px-8 py-16 border border-border rounded-3xl"
      >
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: 16,
          }}
        />
        <Text className="text-2xl font-bold color-white">
          {t('workout.session.finish.congratulations')}
        </Text>
        <Text className="text-md color-white">
          {t('workout.session.finish.congratulationsMessage')}
        </Text>
      </ImageBackground>
      <View className="p-4 bg-card rounded-lg gap-4 flex-row justify-evenly">
        <View className="flex-col justify-center">
          <Text className="text-sm text-center">{t('workout.session.finish.exercises')}</Text>
          <Text className="text-2xl font-bold text-center" style={{ color: difficultyColor }}>
            {workout?.exercises.length}
          </Text>
        </View>
        <View className="w-1 h-full flex-col" />
        <View className="flex-col justify-center">
          <Text className="text-sm text-center">{t('workout.session.finish.time')}</Text>
          <Text className="text-2xl font-bold text-center" style={{ color: difficultyColor }}>
            {dayjs().startOf('day').second(workoutTimeInSeconds).format('mm:ss')}
          </Text>
        </View>
      </View>
      <View className="flex-1 p-4 bg-card rounded-lg gap-4 flex-col">
        <Text className="text-sm text-center">{t('workout.session.finish.summary')}</Text>
        <ScrollView>
          {workout?.exercises.map((exercise) => (
            <View
              key={exercise.id}
              className="flex-row gap-4 items-center p-4 rounded-lg mb-2 border border-border"
            >
              <Text className="text-md">
                {exercise.sets}x{exercise.repetitions} - {t(`${exercise.exerciseName}.title`)}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <Button onPress={handleWorkoutFinish}>
        <Text>{t('workout.session.finish.save')}</Text>
      </Button>
    </>
  )
}
