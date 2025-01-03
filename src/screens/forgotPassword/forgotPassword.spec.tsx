import { render } from '@testing-library/react-native'

import { ForgotPassword } from './forgotPassword'
import { useColorScheme } from '@/hooks'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('ForgotPassword', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<ForgotPassword />)
    expect(getByTestId('forgot-password')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(<ForgotPassword />)
    expect(getByTestId('forgot-password')).toBeDefined()
  })
})
