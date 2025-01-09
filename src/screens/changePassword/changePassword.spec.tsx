import { render, fireEvent, act } from '@testing-library/react-native'

import { ChangePassword } from './changePassword'
import { useColorScheme } from '@/hooks'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('ChangePassword', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<ChangePassword />)
    expect(getByTestId('change-password')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(<ChangePassword />)
    expect(getByTestId('change-password')).toBeDefined()
  })

  it('should change eye icon on current password field', () => {
    const { getByTestId } = render(<ChangePassword />)

    const eyeButton = getByTestId('eye-button-current-password')
    expect(eyeButton).toBeDefined()

    act(() => {
      fireEvent.press(eyeButton)
    })

    expect(eyeButton).toBeDefined()
  })

  it('should change eye icon on new password field', () => {
    const { getByTestId } = render(<ChangePassword />)

    const eyeButton = getByTestId('eye-button-new-password')
    expect(eyeButton).toBeDefined()

    act(() => {
      fireEvent.press(eyeButton)
    })

    expect(eyeButton).toBeDefined()
  })

  it('should change eye icon on confirm password field', () => {
    const { getByTestId } = render(<ChangePassword />)

    const eyeButton = getByTestId('eye-button-confirm-password')
    expect(eyeButton).toBeDefined()

    act(() => {
      fireEvent.press(eyeButton)
    })

    expect(eyeButton).toBeDefined()
  })
})
