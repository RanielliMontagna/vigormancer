import { useFormContext } from 'react-hook-form'

import { GoalEnum, OnboardingSchema } from '../onboarding.schema'
import { useOnboardingContext } from '../onboarding.context'

export function useGoal() {
  const { prevStep, handleSubmitOnboarding } = useOnboardingContext()
  const { watch, setValue } = useFormContext<OnboardingSchema>()

  const goals = [
    { id: GoalEnum.LoseWeight },
    { id: GoalEnum.BuildMuscle },
    { id: GoalEnum.ImproveStamina },
    { id: GoalEnum.ImproveHealth },
    { id: GoalEnum.StayActive },
  ]

  const selectedGoal = watch('goal')

  function setGoal(goal: GoalEnum) {
    setValue('goal', goal)
  }

  return { goals, selectedGoal, setGoal, prevStep, handleSubmitOnboarding }
}
