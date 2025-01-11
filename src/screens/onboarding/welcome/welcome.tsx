import { useTranslation } from 'react-i18next'
import { Image, View } from 'react-native'
import { router } from 'expo-router'

import WelcomeImage from '@/assets/images/onboarding-welcome.jpg'

import { Button, Logo, Text } from '@/components'

export function Welcome() {
  const { t } = useTranslation()

  return (
    <View className="flex flex-col h-full bg-background" testID="welcome">
      <View className="h-96">
        <Image source={WelcomeImage} className="h-96 w-full object-cover rounded-b-[32px]" />
      </View>
      <View className="gap-2 flex-1 justify-center px-8">
        <View className="gap-1">
          <View className="flex flex-row gap-2 items-center mb-4 justify-center">
            <Logo />
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
