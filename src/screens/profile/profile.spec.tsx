import { render } from '@testing-library/react-native'

import { Profile } from './profile'
import { useColorScheme } from '@/hooks'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('Profile', () => {
  it('should render successfully', () => {
    mockUseColorScheme.mockReturnValue({ colorScheme: 'light', isDarkColorScheme: false })

    const { getByTestId } = render(<Profile />)
    expect(getByTestId('profile')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ colorScheme: 'dark', isDarkColorScheme: true })

    const { getByTestId } = render(<Profile />)
    expect(getByTestId('profile')).toBeDefined()
  })
})
