import { act, fireEvent, render } from '@testing-library/react-native'
import { router } from 'expo-router'

import { Age } from './age'
import { useColorScheme } from '@/hooks'
import OnboardingWrapperLayout from '@/__mocks__/onboardingProvider.mock'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('Age', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(
      <OnboardingWrapperLayout>
        <Age />
      </OnboardingWrapperLayout>,
    )
    expect(getByTestId('age')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(
      <OnboardingWrapperLayout>
        <Age />
      </OnboardingWrapperLayout>,
    )
    expect(getByTestId('age')).toBeDefined()
  })

  it('should be able to navigate to the next screen', () => {
    jest.spyOn(router, 'back')

    const { getByTestId } = render(
      <OnboardingWrapperLayout>
        <Age />
      </OnboardingWrapperLayout>,
    )

    act(() => {
      const button = getByTestId('age-button')
      fireEvent.press(button)
    })

    expect(router.push).toHaveBeenCalledWith('onboarding/weight')
  })
})
