import { act, fireEvent, render } from '@/utils'
import { router } from 'expo-router'

import { Welcome } from './welcome'
import { useColorScheme } from '@/hooks'
import OnboardingWrapperLayout from '@/__mocks__/onboardingProvider.mock'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('Welcome', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(
      <OnboardingWrapperLayout>
        <Welcome />
      </OnboardingWrapperLayout>,
    )
    expect(getByTestId('welcome')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(
      <OnboardingWrapperLayout>
        <Welcome />
      </OnboardingWrapperLayout>,
    )
    expect(getByTestId('welcome')).toBeDefined()
  })

  it('should be able to navigate to the next screen', () => {
    jest.spyOn(router, 'back')

    const { getByTestId } = render(
      <OnboardingWrapperLayout>
        <Welcome />
      </OnboardingWrapperLayout>,
    )

    act(() => {
      const button = getByTestId('welcome-button')
      fireEvent.press(button)
    })

    expect(router.push).toHaveBeenCalledWith('onboarding/sex')
  })
})
