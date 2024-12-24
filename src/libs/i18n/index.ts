import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as Localization from 'expo-localization'
import AsyncStorage from '@react-native-async-storage/async-storage'
import translationEn from '@/locales/en-US/translation.json'
import translationPt from '@/locales/pt-BR/translation.json'

const resources = {
  'pt-BR': { translation: translationPt },
  'en-US': { translation: translationEn },
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
    fallbackLng: 'pt-BR',
    interpolation: { escapeValue: false },
  })
}

export { initI18n, i18n }
