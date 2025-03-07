import { z } from 'zod'
import { router } from 'expo-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Toast from 'react-native-toast-message'
import { useTranslation } from 'react-i18next'

import { useAppStore } from '@/store'

import { useForgotPasswordContext } from '../forgotPassword.context'

export function useSendCode() {
  const { t } = useTranslation()
  const { handleErrors } = useAppStore()

  const sendCodeSchema = z.object({
    email: z.string().min(1, t('validation.required')).email(t('validation.invalidEmail')),
  })

  type SendCodeSchema = z.infer<typeof sendCodeSchema>

  const { email, nextStep, handleSaveEmail } = useForgotPasswordContext()

  const methods = useForm<SendCodeSchema>({
    resolver: zodResolver(sendCodeSchema),
    defaultValues: { email },
  })

  function handleBack() {
    router.back()
  }

  async function handleSendCode(data: SendCodeSchema) {
    console.log(data)

    try {
      handleSaveEmail(data.email)
      //TODO: Send code to email
      //API call

      Toast.show({
        text1: 'Code sent',
        text2: 'Please check your email',
        type: 'success',
      })

      nextStep()
    } catch (error) {
      handleErrors(error)
    }
  }

  return { methods, handleBack, handleSendCode }
}
