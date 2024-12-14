import { useForm } from 'react-hook-form'
import { forgotPasswordSchema, ForgotPasswordSchema } from './forgotPassword.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'

export function useForgotPassword() {
  const methods = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  function handleSendCode(values: ForgotPasswordSchema) {
    console.log(values)

    //TODO: handle send code logic here
  }

  function handleBack() {
    if (!router.canGoBack()) return router.push('/')
    router.back()
  }

  return { methods, handleSendCode, handleBack }
}
