import { act, fireEvent, render } from '@testing-library/react-native'

import { Login } from './login'
import { useColorScheme } from '@/hooks'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('Login', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<Login />)
    expect(getByTestId('login')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(<Login />)
    expect(getByTestId('login')).toBeDefined()
  })

  it('should be able to click em show password', () => {
    const { getByTestId } = render(<Login />)

    act(() => {
      const showPassword = getByTestId('show-password')
      fireEvent.press(showPassword)
    })

    expect(getByTestId('show-password')).toBeDefined()
  })
})
