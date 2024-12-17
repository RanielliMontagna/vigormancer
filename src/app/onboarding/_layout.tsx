import { Form } from '@/components'
import { OnboardingProvider, useOnboardingContext } from '@/screens/onboarding/onboarding.context'
import { Stack } from 'expo-router'

function Layout() {
  const { methods } = useOnboardingContext()

  return (
    <Form {...methods}>
      <Stack screenOptions={{ headerShown: false }} />
    </Form>
  )
}

export default function WrapperLayout() {
  return (
    <OnboardingProvider>
      <Layout />
    </OnboardingProvider>
  )
}
