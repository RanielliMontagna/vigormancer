import { createContext, useContext, useState } from 'react'
import { router } from 'expo-router'

export enum StepForgotPassword {
  SEND_CODE,
  OTP_VERIFICATION,
  RESET_PASSWORD,
  SUCCESS,
}

interface ForgotPasswordContextProps {
  email: string
  step: StepForgotPassword
  nextStep: () => void
  prevStep: () => void
  handleSaveEmail: (email: string) => void
}

export const ForgotPasswordContext = createContext({} as ForgotPasswordContextProps)

export function ForgotPasswordProvider({ children }) {
  const [email, setEmail] = useState('')
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

  function handleSaveEmail(email: string) {
    setEmail(email)
  }

  return (
    <ForgotPasswordContext.Provider value={{ email, step, nextStep, prevStep, handleSaveEmail }}>
      {children}
    </ForgotPasswordContext.Provider>
  )
}

export function useForgotPasswordContext() {
  const context = useContext(ForgotPasswordContext)

  return context
}
