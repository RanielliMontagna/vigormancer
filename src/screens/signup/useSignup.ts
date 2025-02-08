import { z } from 'zod'
import { useSignUp } from '@clerk/clerk-expo'

import { router } from 'expo-router'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/store'

export function useSignup() {
  const { isLoaded, signUp } = useSignUp()
  const { setIsLoading, handleErrors } = useAppStore()

  const { t } = useTranslation()

  const signUpSchema = z
    .object({
      username: z
        .string()
        .min(4, t('validation.minLength', { min: 4 }))
        .max(50, t('validation.maxLength', { max: 50 })),
      email: z.string().min(1, t('validation.required')).email(t('validation.invalidEmail')),
      password: z
        .string()
        .min(8, t('validation.minLength', { min: 8 }))
        .max(50, t('validation.maxLength', { max: 50 }))
        .regex(/[a-z]/, t('validation.lowercase'))
        .regex(/[A-Z]/, t('validation.uppercase'))
        .regex(/[0-9]/, t('validation.number')),
      confirmPassword: z.string().min(1, t('validation.required')),
      showPassword: z.boolean().optional(),
      showConfirmPassword: z.boolean().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('validation.passwordMatch'),
      path: ['confirmPassword'],
    })

  type SignUpSchema = z.infer<typeof signUpSchema>

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
    router.back()
  }

  // Handle submission of sign-up form
  const onSignUpPress = async (values: SignUpSchema) => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      setIsLoading(true)

      await signUp.create({
        username: values.username,
        emailAddress: values.email,
        password: values.password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Redirect user to verification screen
      router.push('/signup/verify-code')
    } catch (error) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      handleErrors(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGoogleSignup() {
    //TODO: handle google signUp logic here
  }

  return {
    methods,
    handleBack,
    onSignUpPress,
    handleGoogleSignup,
  }
}
