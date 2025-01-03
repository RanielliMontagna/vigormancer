import { render } from '@testing-library/react-native'

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
})
