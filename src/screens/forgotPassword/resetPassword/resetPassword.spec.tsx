import { render } from '@/utils'

import { useColorScheme } from '@/hooks'
import { ResetPassword } from './resetPassword'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('ForgotPassword/ResetPassword', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<ResetPassword />)
    expect(getByTestId('reset-password')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(<ResetPassword />)
    expect(getByTestId('reset-password')).toBeDefined()
  })
})
