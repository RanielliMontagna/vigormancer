import { render } from '@testing-library/react-native'

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
})
