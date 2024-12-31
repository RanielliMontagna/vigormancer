import { render } from '@testing-library/react-native'

import { VerifyCode } from './verifyCode'
import { useColorScheme } from '@/hooks'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('VerifyCode', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<VerifyCode />)
    expect(getByTestId('verify-code')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(<VerifyCode />)
    expect(getByTestId('verify-code')).toBeDefined()
  })
})
