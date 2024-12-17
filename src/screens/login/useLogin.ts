import { z } from 'zod'
import { router } from 'expo-router'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'

export function useLogin() {
  const { t } = useTranslation()

  const loginSchema = z.object({
    email: z.string().min(1, t('validation.required')).email(t('validation.invalidEmail')),
    password: z.string().min(1, t('validation.required')),
    showPassword: z.boolean().default(false),
  })

  type LoginSchema = z.infer<typeof loginSchema>

  const methods = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      showPassword: false,
    },
  })

  function handleGoToSignup() {
    router.push('/signup')
  }

  function handleGoToForgotPassword() {
    router.push('/forgot-password')
  }

  async function handleLogin(values: LoginSchema) {
    console.log(values)
    //TODO:  handle login logic here
  }

  async function handleGoogleLogin() {
    //TODO: handle google login logic here
  }

  return { methods, handleLogin, handleGoogleLogin, handleGoToSignup, handleGoToForgotPassword }
}
