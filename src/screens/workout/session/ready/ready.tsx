import { useTranslation } from 'react-i18next'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import colors from 'tailwindcss/colors'

import WorkoutPlaceholder from '@/assets/images/workout-placeholder.jpg'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { WorkoutDifficulty } from '@/db/repositories/workouts'
import { BackButton, Button, Text } from '@/components'
import { useColorScheme } from '@/hooks'

import { useReady } from './useReady'
import { useSessionContext } from '../session.context'

export function Ready() {
  const { t } = useTranslation()
  const { isDarkColorScheme } = useColorScheme()
  const { workout } = useSessionContext()

  const { countdownInSeconds, difficultyColor, fillCountdown } = useReady()

  const imageSource = workout.image
    ? { uri: `data:image/jpeg;base64,${workout.image}` }
    : WorkoutPlaceholder

  return (
    <>
      <BackButton />
      <ImageBackground
        source={imageSource}
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
        <View className="flex flex-row gap-1 items-baseline">
          <FontAwesome6 name="bolt-lightning" size={10} color={difficultyColor} />
          <FontAwesome6
            name="bolt-lightning"
            size={10}
            color={workout.difficulty >= WorkoutDifficulty.INTERMEDIATE ? difficultyColor : 'gray'}
          />
          <FontAwesome6
            name="bolt-lightning"
            size={10}
            color={workout.difficulty === WorkoutDifficulty.ADVANCED ? difficultyColor : 'gray'}
          />
          <Text className="text-xs color-white">
            {t(`workout.difficulty.${workout.difficulty}`)}
          </Text>
        </View>
        <Text className="text-2xl font-lexend-semibold color-white">{workout.name}</Text>
      </ImageBackground>
      <View className="gap-1 p-8">
        <Text className="text-2xl font-lexend-semibold text-center">
          {t('workout.session.ready')}
        </Text>
        <Text className="text-xs text-center">{t('workout.session.readyMessage')}</Text>
      </View>
      <View
        testID="countdown-container"
        className="flex-1 flex-column justify-center items-center gap-4"
      >
        <Text className="text-xs">{t('workout.session.countdown')}</Text>
        <AnimatedCircularProgress
          size={150}
          width={10}
          fill={fillCountdown}
          fillLineCap="round"
          rotation={0}
          tintColor={difficultyColor}
          backgroundColor={isDarkColorScheme ? colors.gray[600] : colors.gray[200]}
        >
          {() => {
            return <Text className="text-4xl font-lexend-semibold">{countdownInSeconds}</Text>
          }}
        </AnimatedCircularProgress>
      </View>
      <View>
        <Button
          className="w-full"
          size="lg"
          onPress={() => console.log('start')}
          endIcon={
            <FontAwesome6
              name="chevron-right"
              size={14}
              color={isDarkColorScheme ? 'black' : 'white'}
            />
          }
        >
          <Text>{t('workout.session.start')}</Text>
        </Button>
      </View>
    </>
  )
}
