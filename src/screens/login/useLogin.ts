import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { router } from 'expo-router'

import { useOAuth, useSignIn } from '@clerk/clerk-expo'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useAppStore } from '@/store'

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export function useLogin() {
  useWarmUpBrowser()
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const { signIn, setActive, isLoaded } = useSignIn()
  const { setIsLoading, handleErrors } = useAppStore()
  const { t } = useTranslation()

  const loginSchema = z.object({
    email: z.string().min(1, t('validation.required')).email(t('validation.invalidEmail')),
    password: z.string().min(1, t('validation.required')),
    showPassword: z.boolean().default(false),
  })

  type LoginSchema = z.infer<typeof loginSchema>

  const methods = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', showPassword: false },
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
          handleErrors(signInAttempt)
        }
      } catch (error) {
        handleErrors(error)
      } finally {
        setIsLoading(false)
      }
    },
    [handleErrors, isLoaded, setActive, setIsLoading, signIn],
  )

  async function handleGoogleLogin() {
    try {
      setIsLoading(true)

      const { createdSessionId, authSessionResult, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/', { scheme: 'vigormancer' }),
      })

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId })

        console.log(authSessionResult)
      } else {
        console.log(authSessionResult, 'authSessionResult')
        console.log(createdSessionId, 'createdSessionId')

        //TODO: Handle sign up flow
      }
    } catch (error) {
      handleErrors(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { methods, handleGoogleLogin, handleGoToSignup, handleGoToForgotPassword, onSignInPress }
}
