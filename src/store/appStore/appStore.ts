import { isClerkAPIResponseError } from '@clerk/clerk-expo'
import { t } from 'i18next'
import Toast from 'react-native-toast-message'
import { create } from 'zustand'

export type AppStore = {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  handleErrors: (error: any) => void
}

export const useAppStore = create<AppStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  handleErrors: (error) => {
    set({ isLoading: false })

    if (isClerkAPIResponseError(error)) {
      const errorCode = error.errors[0].code
      const title = t(`clerkErrors.${errorCode}`)
      const message = t(`clerkErrors.${errorCode}_message`)

      Toast.show({
        type: 'error',
        text1: title,
        text2: !message.includes('clerkErrors') ? message : '',
      })

      return
    }

    // Default error message for all other errors
    Toast.show({
      type: 'error',
      text1: t('errors.default'),
      text2: t('errors.default_message'),
    })

    console.error(error)
  },
}))
