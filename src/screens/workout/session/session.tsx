import { useTranslation } from 'react-i18next'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import WorkoutPlaceholder from '@/assets/images/workout-placeholder.jpg'

import { useSession } from './useSession'

import { BackButton, Button, Text } from '@/components'
import { WorkoutDifficulty } from '@/db/repositories/workouts'
import colors from 'tailwindcss/colors'
import { useColorScheme } from '@/hooks'

export function Session() {
  const { t } = useTranslation()
  const { isDarkColorScheme } = useColorScheme()
  const { data, difficultyColor, countdownInSeconds, fillCountdown } = useSession()

  const imageSource = data.image
    ? { uri: `data:image/jpeg;base64,${data.image}` }
    : WorkoutPlaceholder

  return (
    <View className="h-full p-8 gap-4 bg-background" testID="session">
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
            color={data.difficulty >= WorkoutDifficulty.INTERMEDIATE ? difficultyColor : 'gray'}
          />
          <FontAwesome6
            name="bolt-lightning"
            size={10}
            color={data.difficulty === WorkoutDifficulty.ADVANCED ? difficultyColor : 'gray'}
          />
          <Text className="text-xs color-white">{t(`workout.difficulty.${data.difficulty}`)}</Text>
        </View>
        <Text className="text-2xl font-lexend-semibold color-white">{data.name}</Text>
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
          onAnimationComplete={() => console.log('onAnimationComplete')}
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
    </View>
  )
}
