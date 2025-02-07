import { BackButton, H2, P } from '@/components'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'
import { TouchableOpacity, View } from 'react-native'
import * as Updates from 'expo-updates'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import BrazilFlag from '@/assets/svgs/flags/brazil.svg'
import UKFlag from '@/assets/svgs/flags/united-kingdom.svg'
import { cn } from '@/utils'
import colors from 'tailwindcss/colors'
import { i18n } from '@/libs/i18n'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LocaleConfig } from 'react-native-calendars'

enum LanguageEnum {
  Portuguese = 'pt-BR',
  English = 'en-US',
}

interface CardLanguageProps {
  language: LanguageEnum
  t: TFunction
  isCurrent?: boolean
}

function CardLanguage({ language, t, isCurrent }: CardLanguageProps) {
  async function handleChangeLanguage() {
    const newLanguage = language.toString()

    await i18n.changeLanguage(newLanguage)
    AsyncStorage.setItem('language', newLanguage)

    LocaleConfig.defaultLocale = newLanguage.includes('pt') ? 'pt' : 'en'
    i18n.reloadResources()

    // Reload the app to apply the language change
    await Updates.reloadAsync()
  }

  return (
    <TouchableOpacity
      className={cn(
        'flex-row items-center justify-between p-4 rounded-xl bg-card elevation-sm transition-all',
        {
          'border-green-500 border-2': isCurrent,
        },
      )}
      activeOpacity={isCurrent ? 1 : 0.7}
      onPress={handleChangeLanguage}
      testID={`card-language-${language}`}
    >
      <View className="flex-row items-center gap-2">
        {language === LanguageEnum.Portuguese ? <BrazilFlag /> : <UKFlag />}
        <P className="text-lg">
          {language === LanguageEnum.Portuguese ? t('language.portuguese') : t('language.english')}
        </P>
      </View>
      {isCurrent && <FontAwesome6 name="check-circle" size={24} color={colors.green[500]} />}
    </TouchableOpacity>
  )
}

export function Language() {
  const { t, i18n } = useTranslation()

  return (
    <View className="flex flex-1 p-8 bg-background gap-6" testID="language">
      <BackButton />
      <View>
        <H2>{t('language.title')}</H2>
        <P className="text-sm text-muted-foreground">{t('language.subtitle')}</P>
      </View>
      <View className="gap-4">
        <CardLanguage
          language={LanguageEnum.Portuguese}
          t={t}
          isCurrent={i18n.language.includes('pt')}
        />
        <CardLanguage
          language={LanguageEnum.English}
          t={t}
          isCurrent={i18n.language.includes('en')}
        />
      </View>
      <View className="flex-1">
        <P className="text-sm text-muted-foreground">{t('language.info')}</P>
      </View>
    </View>
  )
}
