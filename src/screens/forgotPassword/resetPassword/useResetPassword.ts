import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForgotPasswordContext } from '../forgotPassword.context'

export function useResetPassword() {
  const { t } = useTranslation()

  const resetPasswordSchema = z
    .object({
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

  type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>

  const { nextStep } = useForgotPasswordContext()

  const methods = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
    },
  })

  function handleResetPassword(data: ResetPasswordSchema) {
    console.log(data)

    //TODO: Reset password

    nextStep()
  }

  return { methods, handleResetPassword }
}
