import { createContext, useContext } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { OnboardingSchema, onboardingSchema } from './onboarding.schema'
import { router } from 'expo-router'
import Toast from 'react-native-toast-message'

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
      //TODO: Handle onboarding submission
      await Promise.resolve()

      methods.reset()
      router.replace('onboarding/ready')
    } catch {
      Toast.show({
        text1: 'A problem occurred',
        text2: 'Please try again later or contact support',
        type: 'success',
      })
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
