import { render } from '@testing-library/react-native'

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
})
