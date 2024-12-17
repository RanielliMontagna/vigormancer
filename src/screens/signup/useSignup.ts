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
        .min(3, t('validation.minLength', { min: 3 }))
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
