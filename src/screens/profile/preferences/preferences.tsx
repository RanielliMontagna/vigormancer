import { TouchableOpacity, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import FontAwesome6 from '@expo/vector-icons/FontAwesome5'

import { useColorScheme } from '@/hooks'
import { Text } from '@/components'
import colors from 'tailwindcss/colors'
import { cn } from '@/utils'
import { usePreferences } from './usePreferences'

export function Preferences() {
  const { isDarkColorScheme } = useColorScheme()
  const { t } = useTranslation()

  const { languageText, themeText, handleLogout } = usePreferences()

  return (
    <View>
      <Text className="text-sm text-muted-foreground">{t('profile.preferences.title')}</Text>
      <View className="bg-card rounded-2xl p-4 mt-2 elevation-sm">
        <TouchableOpacity className="flex-row justify-between item-center p-1">
          <View className="flex-row items-center gap-2">
            <FontAwesome6
              size={18}
              solid
              name="language"
              color={isDarkColorScheme ? colors.white : colors.black}
            />
            <Text>{t('profile.preferences.language')}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Text className="text-sm text-muted-foreground ">{languageText}</Text>
            <FontAwesome6 size={10} name="chevron-right" color={colors.gray[500]} />
          </View>
        </TouchableOpacity>
        <View
          className={cn('flex-row h-px my-4', isDarkColorScheme ? 'bg-gray-700' : 'bg-gray-200')}
        />
        <TouchableOpacity className="flex-row justify-between item-center p-1">
          <View className="flex-row items-center gap-2">
            <FontAwesome6
              size={18}
              solid
              name="palette"
              color={isDarkColorScheme ? colors.white : colors.black}
            />
            <Text>{t('profile.preferences.theme')}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Text className="text-sm text-muted-foreground ">{themeText}</Text>
            <FontAwesome6 size={10} name="chevron-right" color={colors.gray[500]} />
          </View>
        </TouchableOpacity>
        <View
          className={cn('flex-row h-px my-4', isDarkColorScheme ? 'bg-gray-700' : 'bg-gray-200')}
        />
        <TouchableOpacity
          className="flex-row justify-between item-center p-1"
          onPress={handleLogout}
        >
          <View className="flex-row items-center gap-2">
            <FontAwesome6 size={18} solid name="sign-out-alt" color={colors.red[500]} />
            <Text className="color-red-500">{t('profile.preferences.logout')}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Text className="text-sm color-red-500">{}</Text>
            <FontAwesome6 size={10} name="chevron-right" color={colors.red[500]} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
