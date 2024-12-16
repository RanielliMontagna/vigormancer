import { OnboardingProvider, OnboardingSteps, useOnboardingContext } from './onboarding.context'

import { Sex } from './sex/sex'
import { Age } from './age/age'
import { Goal } from './goal/goal'
import { Ready } from './ready/ready'
import { Weight } from './weight/weight'
import { Height } from './height/height'
import { Welcome } from './welcome/welcome'
import { Form } from '@/components'

function Onboarding() {
  const { step, methods } = useOnboardingContext()

  const StepComponent = {
    [OnboardingSteps.WELCOME]: Welcome,
    [OnboardingSteps.SEX]: Sex,
    [OnboardingSteps.AGE]: Age,
    [OnboardingSteps.WEIGHT]: Weight,
    [OnboardingSteps.HEIGHT]: Height,
    [OnboardingSteps.GOAL]: Goal,
    [OnboardingSteps.READY]: Ready,
  }[step]

  return <Form {...methods}>{StepComponent && <StepComponent />}</Form>
}

function OnboardingWrapper() {
  return (
    <OnboardingProvider>
      <Onboarding />
    </OnboardingProvider>
  )
}

export { OnboardingWrapper as Onboarding }
