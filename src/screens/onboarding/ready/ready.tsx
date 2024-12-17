import { useTranslation } from 'react-i18next'
import { Image, View } from 'react-native'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import FinishImage from '@/assets/images/onboarding-finish.jpg'

import { Button, H2, P, Text } from '@/components'
import { useColorScheme } from '@/hooks'

import { router } from 'expo-router'
import Toast from 'react-native-toast-message'

export function Ready() {
  const { t } = useTranslation()
  const { isDarkColorScheme } = useColorScheme()

  return (
    <View className="flex flex-col h-full bg-background">
      <View className="h-96">
        <Image source={FinishImage} className="h-96 w-full object-cover rounded-b-[32px]" />
      </View>
      <View className="gap-2 flex-1 justify-center px-8">
        <View className="flex flex-row gap-2 items-center mb-4 justify-center">
          <FontAwesome6 name="dumbbell" size={24} color={isDarkColorScheme ? 'white' : 'black'} />
          <View className="flex flex-row">
            <Text className="font-bold text-2xl">Vigor</Text>
            <Text className="text-2xl">mancer</Text>
          </View>
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

              router.dismissAll()
            }}
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
