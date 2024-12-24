import { useTranslation } from 'react-i18next'
import { Image, View } from 'react-native'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import WelcomeImage from '@/assets/images/onboarding-welcome.jpg'
import { useColorScheme } from '@/hooks'

import { Button, Text } from '@/components'
import { router } from 'expo-router'

export function Welcome() {
  const { t } = useTranslation()
  const { isDarkColorScheme } = useColorScheme()

  return (
    <View className="flex flex-col h-full bg-background">
      <View className="h-96">
        <Image source={WelcomeImage} className="h-96 w-full object-cover rounded-b-[32px]" />
      </View>
      <View className="gap-2 flex-1 justify-center px-8">
        <View className="gap-1">
          <Text className="text-center">{t('onboarding.welcome.title')}</Text>
          <View className="flex flex-row gap-2 items-center mb-4 justify-center">
            <FontAwesome6 name="dumbbell" size={32} color={isDarkColorScheme ? 'white' : 'black'} />
            <View className="flex flex-row">
              <Text bold className="text-4xl">
                Vigor
              </Text>
              <Text className="text-4xl">mancer</Text>
            </View>
          </View>
        </View>
        <Text className="text-center text-muted-foreground">{t('onboarding.welcome.text')}</Text>
        <Button size="lg" className="mt-4" onPress={() => router.push('onboarding/sex')}>
          <Text>{t('onboarding.welcome.button')}</Text>
        </Button>
      </View>
    </View>
  )
}
