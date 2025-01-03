import { render } from '@testing-library/react-native'

import { useColorScheme } from '@/hooks'
import { SendCode } from './sendCode'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('ForgotPassword/SendCode', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<SendCode />)
    expect(getByTestId('send-code')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(<SendCode />)
    expect(getByTestId('send-code')).toBeDefined()
  })
})
