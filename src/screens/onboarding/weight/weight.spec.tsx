import { render } from '@testing-library/react-native'

import { Weight } from './weight'
import { useColorScheme } from '@/hooks'
import OnboardingWrapperLayout from '@/__mocks__/onboardingProvider.mock'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('Weight', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(
      <OnboardingWrapperLayout>
        <Weight />
      </OnboardingWrapperLayout>,
    )
    expect(getByTestId('weight')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(
      <OnboardingWrapperLayout>
        <Weight />
      </OnboardingWrapperLayout>,
    )
    expect(getByTestId('weight')).toBeDefined()
  })
})
