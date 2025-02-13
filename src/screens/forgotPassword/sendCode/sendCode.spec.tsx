import { act, fireEvent, render } from '@/utils'

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

  it('should be able to back to previous step', () => {
    const { getByTestId } = render(<SendCode />)

    act(() => {
      fireEvent.press(getByTestId('back-button'))
    })

    expect(getByTestId('send-code')).toBeDefined()
  })
})
