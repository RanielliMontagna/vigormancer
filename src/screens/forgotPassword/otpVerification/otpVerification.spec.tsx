import { render } from '@testing-library/react-native'

import { useColorScheme } from '@/hooks'
import { OtpVerification } from './otpVerification'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('ForgotPassword/OptVerification', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<OtpVerification />)
    expect(getByTestId('otp-verification')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(<OtpVerification />)
    expect(getByTestId('otp-verification')).toBeDefined()
  })
})
