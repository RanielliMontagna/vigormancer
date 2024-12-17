import { z } from 'zod'
import { router } from 'expo-router'
import { useForm } from 'react-hook-form'
import { useSignIn } from '@clerk/clerk-expo'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useAppStore } from '@/store'

export function useLogin() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const { setIsLoading } = useAppStore()
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

  const onSignInPress = useCallback(
    async (values: LoginSchema) => {
      if (!isLoaded) return

      // Start the sign-in process using the email and password provided
      try {
        setIsLoading(true)

        const signInAttempt = await signIn.create({
          identifier: values.email,
          password: values.password,
        })

        // If sign-in process is complete, set the created session as active
        // and redirect the user
        if (signInAttempt.status === 'complete') {
          await setActive({ session: signInAttempt.createdSessionId })
          router.replace('/')
        } else {
          // If the status isn't complete, check why. User might need to
          // complete further steps.
          console.error(JSON.stringify(signInAttempt, null, 2))
        }
      } catch (err) {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(err, null, 2))
      } finally {
        setIsLoading(false)
      }
    },
    [isLoaded, setActive, setIsLoading, signIn],
  )

  async function handleGoogleLogin() {
    //TODO: handle google login logic here
  }

  return { methods, handleGoogleLogin, handleGoToSignup, handleGoToForgotPassword, onSignInPress }
}
