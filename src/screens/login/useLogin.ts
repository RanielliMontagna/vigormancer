import { router } from 'expo-router'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginSchema } from './login.schema'

export function useLogin() {
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
