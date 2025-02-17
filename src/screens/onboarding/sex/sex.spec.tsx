import { act, fireEvent, render } from '@/utils'
import { router } from 'expo-router'

import { Sex } from './sex'
import { useColorScheme } from '@/hooks'
import OnboardingWrapperLayout from '@/__mocks__/onboardingProvider.mock'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('Sex', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(
      <OnboardingWrapperLayout>
        <Sex />
      </OnboardingWrapperLayout>,
    )
    expect(getByTestId('sex')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(
      <OnboardingWrapperLayout>
        <Sex />
      </OnboardingWrapperLayout>,
    )
    expect(getByTestId('sex')).toBeDefined()
  })

  it('should be able to navigate to the next screen', async () => {
    jest.spyOn(router, 'back')

    const { getByTestId } = render(
      <OnboardingWrapperLayout>
        <Sex />
      </OnboardingWrapperLayout>,
    )

    await act(() => {
      const selectedSex = getByTestId('sex-male')
      fireEvent.press(selectedSex)
    })

    await act(() => {
      const button = getByTestId('sex-button')
      fireEvent.press(button)
    })

    expect(router.push).toHaveBeenCalledWith('onboarding/age')
  })
})
