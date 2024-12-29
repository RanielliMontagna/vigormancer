import { TouchableOpacity, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import FontAwesome6 from '@expo/vector-icons/FontAwesome5'

import { useColorScheme } from '@/hooks'
import { Text } from '@/components'
import colors from 'tailwindcss/colors'
import { cn } from '@/utils'
import { router } from 'expo-router'

export function General() {
  const { isDarkColorScheme } = useColorScheme()
  const { t } = useTranslation()

  function handleGoToChangePassword() {
    router.push('(private)/change-password')
  }

  return (
    <View>
      <Text className="text-sm text-muted-foreground">{t('profile.general.title')}</Text>
      <View className="bg-card rounded-2xl p-4 mt-2 elevation-sm">
        <TouchableOpacity className="flex-row justify-between item-center p-1">
          <View className="flex-row items-center gap-2">
            <FontAwesome6
              size={18}
              solid
              name="edit"
              color={isDarkColorScheme ? colors.white : colors.black}
            />
            <Text>{t('profile.general.profileInformations')}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Text className="text-sm text-muted-foreground ">{t('profile.general.update')}</Text>
            <FontAwesome6 size={10} name="chevron-right" color={colors.gray[500]} />
          </View>
        </TouchableOpacity>
        <View
          className={cn('flex-row h-px my-4', isDarkColorScheme ? 'bg-gray-700' : 'bg-gray-200')}
        />
        <TouchableOpacity
          className="flex-row justify-between item-center p-1"
          onPress={handleGoToChangePassword}
        >
          <View className="flex-row items-center gap-2">
            <FontAwesome6
              size={18}
              solid
              name="eye"
              color={isDarkColorScheme ? colors.white : colors.black}
            />
            <Text>{t('profile.general.changePassword')}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Text className="text-sm text-muted-foreground ">{t('profile.general.change')}</Text>
            <FontAwesome6 size={10} name="chevron-right" color={colors.gray[500]} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
