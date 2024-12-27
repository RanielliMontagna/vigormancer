import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useColorScheme } from '@/hooks'
import { useAuth } from '@clerk/clerk-expo'
import { useAppStore } from '@/store'

export function usePreferences() {
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const { i18n } = useTranslation()

  const { setIsLoading } = useAppStore()
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

  async function handleLogout() {
    try {
      setIsLoading(true)

      await signOut()
    } catch {
      //TODO: Handle error properly
    } finally {
      setIsLoading(false)
    }
  }

  return {
    colorScheme,
    languageText,
    handleLogout,
    toggleColorScheme,
  }
}
