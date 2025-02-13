import { router } from 'expo-router'
import { act, fireEvent, render } from '@/utils'

import { Height } from './height'
import { useColorScheme } from '@/hooks'
import OnboardingWrapperLayout from '@/__mocks__/onboardingProvider.mock'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('Height', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(
      <OnboardingWrapperLayout>
        <Height />
      </OnboardingWrapperLayout>,
    )
    expect(getByTestId('height')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(
      <OnboardingWrapperLayout>
        <Height />
      </OnboardingWrapperLayout>,
    )
    expect(getByTestId('height')).toBeDefined()
  })

  it('should be able to navigate to the next screen', () => {
    jest.spyOn(router, 'back')

    const { getByTestId } = render(
      <OnboardingWrapperLayout>
        <Height />
      </OnboardingWrapperLayout>,
    )

    act(() => {
      const button = getByTestId('height-button')
      fireEvent.press(button)
    })

    expect(router.push).toHaveBeenCalledWith('onboarding/goal')
  })
})
