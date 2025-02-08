import { act, fireEvent, render, waitFor } from '@testing-library/react-native'

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

  it('should be able to navigate between steps', async () => {
    const { getByTestId } = render(<ForgotPassword />)

    // Send code step

    act(() => {
      fireEvent.changeText(getByTestId('send-code-email'), 'john@doe.com')
      fireEvent.press(getByTestId('send-code-submit'))
    })

    // OTP verification step

    await waitFor(() => {
      expect(getByTestId('otp-verification')).toBeDefined()
    })

    act(() => {
      fireEvent.press(getByTestId('resend-code'))
      fireEvent.changeText(getByTestId('otp-verification-code'), '1234')
      fireEvent.press(getByTestId('otp-verification-submit'))
    })

    // Reset password step

    await waitFor(() => {
      expect(getByTestId('reset-password')).toBeDefined()
    })

    act(() => {
      fireEvent.press(getByTestId('reset-password-password-end-adornment'))
      fireEvent.press(getByTestId('reset-password-confirm-password-end-adornment'))

      fireEvent.changeText(getByTestId('reset-password-password'), 'Password123!')
      fireEvent.changeText(getByTestId('reset-password-confirm-password'), 'Password123!')
      fireEvent.press(getByTestId('reset-password-submit'))
    })
  })
})
