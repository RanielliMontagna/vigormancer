import { Progression } from './progression'
import { useColorScheme } from '@/hooks'
import { getHistoryWeight, getLatestWeight } from '@/db'
import { renderWithProviders } from '@/utils'

const mockUseColorScheme = useColorScheme as jest.Mock

jest.mock('@/db', () => ({
  getLatestWeight: jest.fn(),
  getHistoryWeight: jest.fn(),
}))

describe('Progression', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(getLatestWeight as jest.Mock).mockResolvedValueOnce({
      current: 75,
      heaviest: 80,
      lightest: 70,
    })
    ;(getHistoryWeight as jest.Mock).mockResolvedValueOnce([
      { weight: 80, recordedAt: '2024-01-01T00:00:00Z' },
      { weight: 78, recordedAt: '2024-01-10T00:00:00Z' },
      { weight: 75, recordedAt: '2024-01-20T00:00:00Z' },
    ])
  })

  it('should render successfully', () => {
    const { getByTestId } = renderWithProviders(<Progression />)
    expect(getByTestId('progression')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = renderWithProviders(<Progression />)
    expect(getByTestId('progression')).toBeDefined()
  })
})
