import { useFormContext } from 'react-hook-form'

import { GoalEnum, OnboardingSchema } from '../onboarding.schema'
import { useOnboardingContext } from '../onboarding.context'

export function useGoal() {
  const { prevStep, handleSubmitOnboarding } = useOnboardingContext()
  const { watch, setValue } = useFormContext<OnboardingSchema>()

  const goals = [
    { id: GoalEnum.LoseWeight, label: 'Lose Weight' },
    { id: GoalEnum.BuildMuscle, label: 'Build Muscle' },
    { id: GoalEnum.ImproveStamina, label: 'Improve Stamina' },
    { id: GoalEnum.ImproveHealth, label: 'Improve Health' },
    { id: GoalEnum.StayActive, label: 'Stay Active' },
  ]

  const selectedGoal = watch('goal')

  function setGoal(goal: GoalEnum) {
    setValue('goal', goal)
  }

  return { goals, selectedGoal, setGoal, prevStep, handleSubmitOnboarding }
}
