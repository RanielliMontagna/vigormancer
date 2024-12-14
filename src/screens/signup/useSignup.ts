import { router } from 'expo-router'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema, SignUpSchema } from './signup.schema'

export function useSignup() {
  const methods = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
    },
  })

  function handleBack() {
    if (!router.canGoBack()) return router.push('/')
    router.back()
  }

  async function handleSignup(values: SignUpSchema) {
    console.log(values)
    //TODO:  handle signUp logic here
  }

  async function handleGoogleSignup() {
    //TODO: handle google signUp logic here
  }

  return { methods, handleBack, handleSignup, handleGoogleSignup }
}
