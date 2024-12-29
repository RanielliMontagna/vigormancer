import z from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppStore } from '@/store'
import Toast from 'react-native-toast-message'
import { router } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'

export function useUpdateInformations() {
  const { t } = useTranslation()
  const { user } = useUser()
  const { setIsLoading } = useAppStore()

  const updateInformationsSchema = z.object({
    username: z.string().min(4, t('validation.minLength', { min: 4 })),
    fullName: z.string().optional(),
    email: z.string().email(t('validation.email')),
    weight: z.string().min(1, t('validation.required')),
    height: z.string().min(1, t('validation.required')),
  })

  type UpdateInformationsSchema = z.infer<typeof updateInformationsSchema>

  const defaultValues = {
    username: user.username,
    fullName: user.fullName || '',
    email: user.primaryEmailAddress.emailAddress,
    weight: '64',
    height: '173',
  }

  const methods = useForm<UpdateInformationsSchema>({
    resolver: zodResolver(updateInformationsSchema),
    defaultValues,
  })

  const handleSubmit: SubmitHandler<UpdateInformationsSchema> = async (values) => {
    try {
      setIsLoading(true)

      const isFormChanged = Object.keys(defaultValues).some(
        (key) =>
          defaultValues[key as keyof UpdateInformationsSchema] !==
          values[key as keyof UpdateInformationsSchema],
      )

      if (isFormChanged) {
        //TODO: Update user information (on backend)

        await user.update({
          username: values.username,
          firstName: values.fullName.split(' ')[0],
          lastName: values.fullName.split(' ')[1],
        })

        Toast.show({
          type: 'success',
          text1: t('updateInformations.informationsUpdated'),
        })
      } else {
        Toast.show({
          type: 'info',
          text1: t('updateInformations.notChanged'),
          text2: t('updateInformations.notChangedMessage'),
        })
      }

      router.back()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { methods, t, handleSubmit: methods.handleSubmit(handleSubmit) }
}
