import z from 'zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUser } from '@clerk/clerk-expo'
import { useAppStore } from '@/store'
import Toast from 'react-native-toast-message'
import { router } from 'expo-router'

export function useChangePassword() {
  const { t } = useTranslation()
  const { setIsLoading } = useAppStore()
  const { user } = useUser()

  const changePasswordSchema = z
    .object({
      currentPassword: z.string().min(1, t('validation.required')),
      newPassword: z
        .string()
        .min(8, t('validation.minLength', { min: 8 }))
        .max(50, t('validation.maxLength', { max: 50 }))
        .regex(/[a-z]/, t('validation.lowercase'))
        .regex(/[A-Z]/, t('validation.uppercase'))
        .regex(/[0-9]/, t('validation.number')),
      confirmPassword: z.string().min(1, t('validation.required')),
      showCurrentPassword: z.boolean().optional(),
      showNewPassword: z.boolean().optional(),
      showConfirmPassword: z.boolean().optional(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('validation.passwordMatch'),
      path: ['confirmPassword'],
    })

  type ChangePasswordSchema = z.infer<typeof changePasswordSchema>

  const methods = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
    },
  })

  async function handleSubmit(values: ChangePasswordSchema) {
    try {
      setIsLoading(true)

      await user.updatePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        signOutOfOtherSessions: false,
      })

      Toast.show({
        type: 'success',
        text1: t('changePassword.passwordChanged'),
      })

      router.back()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { methods, t, handleSubmit: methods.handleSubmit(handleSubmit) }
}
