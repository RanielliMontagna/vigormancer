import { router } from 'expo-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { sendCodeSchema, SendCodeSchema } from './sendCode.schema'
import { useForgotPasswordContext } from '../forgotPassword.context'

export function useSendCode() {
  const { nextStep } = useForgotPasswordContext()

  const methods = useForm<SendCodeSchema>({
    resolver: zodResolver(sendCodeSchema),
    defaultValues: { email: '' },
  })

  function handleBack() {
    if (!router.canGoBack()) return router.push('/')
    router.back()
  }

  function handleSendCode(data: SendCodeSchema) {
    console.log(data)

    //TODO: Send code to email

    nextStep()
  }

  return { methods, handleBack, handleSendCode }
}
