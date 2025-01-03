import { render } from '@testing-library/react-native'

import { SignUp } from './signup'
import { useColorScheme } from '@/hooks'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('SignUp', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<SignUp />)
    expect(getByTestId('sign-up')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(<SignUp />)
    expect(getByTestId('sign-up')).toBeDefined()
  })
})
