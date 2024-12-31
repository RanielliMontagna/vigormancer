import { render } from '@testing-library/react-native'

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
})
