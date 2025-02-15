import { act, fireEvent, render } from '@/utils'

import { SignUp } from './signup'
import { useColorScheme } from '@/hooks'
import { router } from 'expo-router'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('SignUp', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<SignUp />)
    expect(getByTestId('sign-up')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(<SignUp />)
    expect(getByTestId('sign-up')).toBeDefined()
  })

  it('should be able to toggle passwords visibility', () => {
    const { getByTestId } = render(<SignUp />)

    act(() => {
      fireEvent.press(getByTestId('toggle-password'))
      fireEvent.press(getByTestId('toggle-confirm-password'))
    })

    expect(getByTestId('password').props.secureTextEntry).toBe(false)
    expect(getByTestId('confirm-password').props.secureTextEntry).toBe(false)
  })

  it('should navigate back to login screen', () => {
    jest.spyOn(router, 'back')

    const { getByTestId } = render(<SignUp />)

    act(() => {
      fireEvent.press(getByTestId('back-to-login'))
    })

    expect(router.back).toHaveBeenCalled()
  })

  it('should be able to sign up', () => {
    const { getByTestId } = render(<SignUp />)

    act(() => {
      fireEvent.changeText(getByTestId('username'), 'john')
      fireEvent.changeText(getByTestId('email'), 'john@doe.com')
      fireEvent.changeText(getByTestId('password'), '123456')
      fireEvent.changeText(getByTestId('confirm-password'), '123456')
      fireEvent.press(getByTestId('sign-up-button'))
    })
  })

  it('should be able to sign up with google', () => {
    const { getByTestId } = render(<SignUp />)

    act(() => {
      fireEvent.press(getByTestId('google-signup'))
    })
  })
})
