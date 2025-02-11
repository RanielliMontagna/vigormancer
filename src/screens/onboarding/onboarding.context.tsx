import { createContext, useContext } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { OnboardingSchema, onboardingSchema } from './onboarding.schema'
import { router } from 'expo-router'
import { useAppStore } from '@/store'
import { completeOnboarding } from '@/db/controllers/user/complete-onboarding'
import dayjs from 'dayjs'
import { useAuth } from '@clerk/clerk-expo'

export enum OnboardingSteps {
  WELCOME,
  SEX,
  AGE,
  WEIGHT,
  HEIGHT,
  GOAL,
  READY,
}

interface OnboardingContextProps {
  methods: UseFormReturn<OnboardingSchema>
  prevStep: () => void
  handleSubmitOnboarding: () => Promise<void>
}

export const OnboardingContext = createContext({} as OnboardingContextProps)

export function OnboardingProvider({ children }) {
  const { userId, signOut } = useAuth()
  const { setIsLoading, handleErrors } = useAppStore()

  const methods = useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: { age: 30, weight: 70, height: 170 },
  })

  function prevStep() {
    router.back()
  }

  async function handleSubmitOnboarding({ age, goal, height, sex, weight }: OnboardingSchema) {
    try {
      setIsLoading(true)

      await completeOnboarding({
        userId,
        birthdate: dayjs().subtract(age, 'year').toDate(),
        height,
        weight,
        sex,
        goal,
      })

      methods.reset()
      router.replace('onboarding/ready')
    } catch (error) {
      handleErrors(error)

      router.dismissAll()
      router.replace('(public)')
      signOut()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <OnboardingContext.Provider
      value={{
        methods,
        prevStep,
        handleSubmitOnboarding: methods.handleSubmit(handleSubmitOnboarding),
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboardingContext() {
  const context = useContext(OnboardingContext)

  return context
}
