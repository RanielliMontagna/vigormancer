import { isClerkAPIResponseError } from '@clerk/clerk-expo'
import { t } from 'i18next'
import Toast from 'react-native-toast-message'
import { create } from 'zustand'

export type AppStore = {
  isLoading: boolean
  isConnected: boolean
  setIsLoading: (isLoading: boolean) => void
  setIsConnected: (isConnected: boolean) => void
  handleErrors: (error: any) => void
}

export const useAppStore = create<AppStore>((set) => ({
  isConnected: true,
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsConnected: (isConnected) => set({ isConnected }),
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

    if (error.message) {
      Toast.show({ type: 'error', text1: error.message })
      return
    }

    Toast.show({
      type: 'error',
      text1: t('errors.default'),
      text2: t('errors.default_message'),
    })
  },
}))
