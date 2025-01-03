import { render } from '@testing-library/react-native'

import { Ready } from './ready'
import { useColorScheme } from '@/hooks'
import OnboardingWrapperLayout from '@/__mocks__/onboardingProvider.mock'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('Ready', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(
      <OnboardingWrapperLayout>
        <Ready />
      </OnboardingWrapperLayout>,
    )
    expect(getByTestId('ready')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(
      <OnboardingWrapperLayout>
        <Ready />
      </OnboardingWrapperLayout>,
    )
    expect(getByTestId('ready')).toBeDefined()
  })
})
