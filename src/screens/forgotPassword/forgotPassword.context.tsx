import { createContext, useContext, useState } from 'react'
import { router } from 'expo-router'

export enum StepForgotPassword {
  SEND_CODE,
  OTP_VERIFICATION,
  RESET_PASSWORD,
  SUCCESS,
}

interface ForgotPasswordContextProps {
  step: StepForgotPassword
  nextStep: () => void
  prevStep: () => void
}

export const ForgotPasswordContext = createContext({} as ForgotPasswordContextProps)

export function ForgotPasswordProvider({ children }) {
  const [step, setStep] = useState<StepForgotPassword>(StepForgotPassword.SEND_CODE)

  function handleBack() {
    if (!router.canGoBack()) return router.push('/')
    router.back()
  }

  function nextStep() {
    if (step === StepForgotPassword.SUCCESS) {
      handleBack()
      return
    }

    setStep((prevStep) => prevStep + 1)
  }

  function prevStep() {
    if (step === StepForgotPassword.SEND_CODE) {
      handleBack()
      return
    }

    setStep((prevStep) => prevStep - 1)
  }

  return (
    <ForgotPasswordContext.Provider value={{ step, nextStep, prevStep }}>
      {children}
    </ForgotPasswordContext.Provider>
  )
}

export function useForgotPasswordContext() {
  const context = useContext(ForgotPasswordContext)

  if (!context) {
    throw new Error('useForgotPassword must be used within a ForgotPasswordProvider')
  }

  return context
}
