import { act, fireEvent, render } from '@/utils'

import { Login } from './login'
import { useColorScheme } from '@/hooks'
import { router } from 'expo-router'

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

  it('should be able to click em forgot password', () => {
    jest.spyOn(router, 'push')

    const { getByTestId } = render(<Login />)

    act(() => {
      const forgotPassword = getByTestId('go-to-forgot-password')
      fireEvent.press(forgotPassword)
    })

    expect(router.push).toHaveBeenCalledWith('/forgot-password')
  })

  it('should be able to click em sign up', () => {
    jest.spyOn(router, 'push')

    const { getByTestId } = render(<Login />)

    act(() => {
      const signUp = getByTestId('go-to-signup')
      fireEvent.press(signUp)
    })

    expect(router.push).toHaveBeenCalledWith('/signup')
  })

  it('should be able to click em google login', () => {
    const { getByTestId } = render(<Login />)

    act(() => {
      const googleLogin = getByTestId('google-login')
      fireEvent.press(googleLogin)
    })

    expect(getByTestId('google-login')).toBeDefined()
  })

  it('should be able to submit form', () => {
    const { getByTestId } = render(<Login />)

    act(() => {
      const email = getByTestId('email')
      fireEvent.changeText(email, 'john@doe.com')

      const password = getByTestId('password')
      fireEvent.changeText(password, '123456')

      const submit = getByTestId('submit')
      fireEvent.press(submit)
    })

    expect(getByTestId('submit')).toBeDefined()
  })
})
