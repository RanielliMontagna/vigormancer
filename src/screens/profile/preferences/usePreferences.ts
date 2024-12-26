import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useColorScheme } from '@/hooks'
import { useAuth } from '@clerk/clerk-expo'

export function usePreferences() {
  const { colorScheme } = useColorScheme()
  const { t, i18n } = useTranslation()
  const { signOut } = useAuth()

  const languageText = useMemo(() => {
    switch (i18n.language) {
      case 'en-US':
        return 'English'
      case 'pt-BR':
        return 'Português'
      default:
        return i18n.language
    }
  }, [i18n.language])

  const themeText = useMemo(() => {
    switch (colorScheme) {
      case 'dark':
        return t('profile.preferences.dark')
      case 'light':
        return t('profile.preferences.light')
      default:
        return colorScheme
    }
  }, [colorScheme, t])

  function handleLogout() {
    signOut()
  }

  return {
    languageText,
    themeText,
    handleLogout,
  }
}
