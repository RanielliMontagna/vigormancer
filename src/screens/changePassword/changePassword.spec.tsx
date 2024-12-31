import { render } from '@testing-library/react-native'

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
})
