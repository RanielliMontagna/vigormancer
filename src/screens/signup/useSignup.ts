import { z } from 'zod'

import { router } from 'expo-router'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'

export function useSignup() {
  const { t } = useTranslation()

  const signUpSchema = z
    .object({
      username: z
        .string()
        .min(3, t('signup.usernameMinLength', { min: 3 }))
        .max(50, t('signup.usernameMaxLength', { max: 50 })),
      email: z.string().min(1, t('signup.requiredEmail')).email(t('signup.invalidEmail')),
      password: z
        .string()
        .min(8, t('signup.passwordMinLength', { min: 8 }))
        .max(50, t('signup.passwordMaxLength', { max: 50 }))
        .regex(/[a-z]/, t('signup.passwordLowercase'))
        .regex(/[A-Z]/, t('signup.passwordUppercase'))
        .regex(/[0-9]/, t('signup.passwordNumber')),
      confirmPassword: z.string().min(1, t('signup.requiredConfirmPassword')),
      showPassword: z.boolean().optional(),
      showConfirmPassword: z.boolean().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('signup.passwordMatch'),
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
