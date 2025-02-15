import { Profile } from './profile'
import { useColorScheme } from '@/hooks'
import { getLatestWeight } from '@/db'
import { renderWithProviders } from '@/utils'

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

    const { getByTestId } = renderWithProviders(<Profile />)
    expect(getByTestId('profile')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ colorScheme: 'dark', isDarkColorScheme: true })

    const { getByTestId } = renderWithProviders(<Profile />)
    expect(getByTestId('profile')).toBeDefined()
  })
})
