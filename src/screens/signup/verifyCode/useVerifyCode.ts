import { z } from 'zod'
import { useSignUp } from '@clerk/clerk-expo'

import { router } from 'expo-router'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/store'
import Toast from 'react-native-toast-message'
import { createUser } from '@/db/controllers/user/create-user'

export function useVerifyCode() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const { setIsLoading, handleErrors } = useAppStore()

  const { t } = useTranslation()

  const verificationCodeSchema = z.object({
    code: z.string().min(1, t('validation.required')),
  })

  type VerificationCodeSchema = z.infer<typeof verificationCodeSchema>

  const methods = useForm<VerificationCodeSchema>({
    resolver: zodResolver(verificationCodeSchema),
    defaultValues: { code: '' },
  })

  // Handle submission of verification form
  const onVerifyPress = async (data: VerificationCodeSchema) => {
    if (!isLoaded) return

    try {
      setIsLoading(true)

      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code: data.code })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })

        // Create a user in the database
        await createUser({
          username: signUpAttempt.username,
          email: signUpAttempt.emailAddress,
          clerkId: signUpAttempt.createdUserId,
        })

        Toast.show({
          type: 'success',
          text1: t('signup.verifySuccess'),
          text2: t('signup.verifySuccessMessage'),
        })

        router.replace('(private)/onboarding')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (error) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      handleErrors(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    methods,
    onVerifyPress,
  }
}
