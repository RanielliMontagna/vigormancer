import { Form } from '@/components'
import { OnboardingProvider, useOnboardingContext } from '@/screens/onboarding/onboarding.context'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { methods } = useOnboardingContext()
  return <Form {...methods}>{children}</Form>
}

export default function OnboardingWrapperLayout(props: LayoutProps) {
  return (
    <OnboardingProvider>
      <Layout {...props} />
    </OnboardingProvider>
  )
}
