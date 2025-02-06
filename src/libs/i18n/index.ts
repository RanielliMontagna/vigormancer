import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { LocaleConfig } from 'react-native-calendars'
import * as Localization from 'expo-localization'
import AsyncStorage from '@react-native-async-storage/async-storage'

import translationEn from '@/locales/en'
import translationPt from '@/locales/pt'

import { localesEn, localesPt } from '@/constants/locales'

const resources = {
  pt: { translation: translationPt },
  en: { translation: translationEn },
}

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem('language')

  if (!savedLanguage) {
    const locales = Localization.getLocales()
    savedLanguage = locales[0].languageTag || 'pt-BR'
  }

  await i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'pt',
    interpolation: { escapeValue: false },
  })

  LocaleConfig.locales.en = localesEn()
  LocaleConfig.locales.pt = localesPt()

  if (i18n.language?.includes('pt')) {
    LocaleConfig.defaultLocale = 'pt'
    return
  }

  LocaleConfig.defaultLocale = 'en'
}

export { initI18n, i18n }
