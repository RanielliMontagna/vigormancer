import { createContext, useContext, useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { OnboardingSchema, onboardingSchema } from './onboarding.schema'

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
  step: OnboardingSteps
  nextStep: () => void
  prevStep: () => void
}

export const OnboardingContext = createContext({} as OnboardingContextProps)

export function OnboardingProvider({ children }) {
  const [step, setStep] = useState<OnboardingSteps>(OnboardingSteps.WELCOME)

  const methods = useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
  })

  function nextStep() {
    setStep((prevStep) => prevStep + 1)
  }

  function prevStep() {
    setStep((prevStep) => prevStep - 1)
  }

  return (
    <OnboardingContext.Provider value={{ step, methods, prevStep, nextStep }}>
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
