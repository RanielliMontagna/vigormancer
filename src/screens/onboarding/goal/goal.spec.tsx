import { render } from '@testing-library/react-native'

import { Goal } from './goal'
import { useColorScheme } from '@/hooks'
import OnboardingWrapperLayout from '@/__mocks__/onboardingProvider.mock'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('Goal', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(
      <OnboardingWrapperLayout>
        <Goal />
      </OnboardingWrapperLayout>,
    )
    expect(getByTestId('goal')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(
      <OnboardingWrapperLayout>
        <Goal />
      </OnboardingWrapperLayout>,
    )
    expect(getByTestId('goal')).toBeDefined()
  })
})
