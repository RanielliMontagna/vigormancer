import { render } from '@testing-library/react-native'

import { Profile } from './profile'
import { useColorScheme } from '@/hooks'
import { Wrapper } from '@/utils/test/test-utils'
import { getLatestWeight } from '@/db'

const mockUseColorScheme = useColorScheme as jest.Mock

jest.mock('@/db', () => ({
  getDatabaseVersion: jest.fn(),
  getLatestWeight: jest.fn(),
  getHistoryWeight: jest.fn(),
}))

describe('Profile', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(getLatestWeight as jest.Mock).mockResolvedValueOnce({
      current: 75,
      heaviest: 80,
      lightest: 70,
    })
  })

  it('should render successfully', () => {
    mockUseColorScheme.mockReturnValue({ colorScheme: 'light', isDarkColorScheme: false })

    const { getByTestId } = render(<Profile />, { wrapper: Wrapper })
    expect(getByTestId('profile')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ colorScheme: 'dark', isDarkColorScheme: true })

    const { getByTestId } = render(<Profile />, { wrapper: Wrapper })
    expect(getByTestId('profile')).toBeDefined()
  })
})
