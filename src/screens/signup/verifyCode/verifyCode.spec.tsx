import { act, fireEvent, render } from '@testing-library/react-native'

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

  it('should be able to submit the form', () => {
    const { getByTestId } = render(<VerifyCode />)

    act(() => {
      const codeInput = getByTestId('verify-code-code')
      fireEvent.changeText(codeInput, '123456')
    })

    act(() => {
      const submitButton = getByTestId('verify-code-submit')
      fireEvent.press(submitButton)
    })

    expect(getByTestId('verify-code')).toBeDefined()
  })
})
