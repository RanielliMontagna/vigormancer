import { createContext, useContext } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { OnboardingSchema, onboardingSchema } from './onboarding.schema'
import { router } from 'expo-router'
import { useAppStore } from '@/store'

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
  const { setIsLoading, handleErrors } = useAppStore()

  const methods = useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: { age: 30, weight: 70, height: 170 },
  })

  function prevStep() {
    if (!router.canGoBack()) return
    router.back()
  }

  async function handleSubmitOnboarding() {
    try {
      setIsLoading(true)

      //TODO: Handle onboarding submission
      await Promise.resolve()

      methods.reset()
      router.replace('onboarding/ready')
    } catch (error) {
      handleErrors(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <OnboardingContext.Provider value={{ methods, prevStep, handleSubmitOnboarding }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboardingContext() {
  const context = useContext(OnboardingContext)

  if (!context) {
    throw new Error('useOnboarding must be used within a OnboardingProvider')
  }

  return context
}
