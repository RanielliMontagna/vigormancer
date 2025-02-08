import { useTranslation } from 'react-i18next'
import Toast from 'react-native-toast-message'
import { Image, View } from 'react-native'
import { router } from 'expo-router'

import FinishImage from '@/assets/images/onboarding-finish.jpg'

import { Button, H2, Logo, P, Text } from '@/components'

export function Ready() {
  const { t } = useTranslation()

  return (
    <View className="flex flex-col h-full bg-background" testID="ready">
      <View className="h-96">
        <Image source={FinishImage} className="h-96 w-full object-cover rounded-b-[32px]" />
      </View>
      <View className="gap-2 flex-1 justify-center px-8">
        <View className="flex flex-row gap-2 items-center mb-4 justify-center">
          <Logo orientation="horizontal" />
        </View>
        <H2 className="text-center">{t('onboarding.ready.title')}</H2>
        <P className="text-center text-muted-foreground">{t('onboarding.ready.subtitle')}</P>
        <View>
          <Button
            size="lg"
            className="mt-4"
            onPress={() => {
              Toast.show({
                type: 'success',
                text1: 'Welcome to Vigormancer!',
                text2: "Your journey has begun. Let's make magic happen!",
              })

              router.replace('/')
            }}
            testID="ready-button"
          >
            <Text>{t('onboarding.ready.button')}</Text>
          </Button>
          <Text className="text-sm text-center text-muted-foreground mt-2">
            {t('onboarding.ready.remember')}
          </Text>
        </View>
      </View>
    </View>
  )
}
