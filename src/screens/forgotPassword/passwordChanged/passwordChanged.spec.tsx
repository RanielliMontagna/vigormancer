import { render } from '@/utils'

import { useColorScheme } from '@/hooks'
import { PasswordChanged } from './passwordChanged'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('ForgotPassword/PasswordChanged', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<PasswordChanged />)
    expect(getByTestId('password-changed')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(<PasswordChanged />)
    expect(getByTestId('password-changed')).toBeDefined()
  })
})
