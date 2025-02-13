import { render } from '@testing-library/react-native'

import { Dashboard } from './dashboard'
import { useColorScheme } from '@/hooks'
import { Wrapper } from '@/utils/test/test-utils'
import { getLatestWeight } from '@/db'
import { UserWeightReturn } from '@/db/repositories/user'

const mockUseColorScheme = useColorScheme as jest.Mock

jest.mock('@/db/controllers/user/get-latest-weight.ts', () => ({
  getLatestWeight: jest.fn(),
}))

describe('Dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(getLatestWeight as jest.Mock).mockImplementationOnce(async () => {
      return { current: 70, heaviest: 80, lightest: 60 } as UserWeightReturn
    })
  })

  it('should render successfully', () => {
    const { getByTestId } = render(<Dashboard />, { wrapper: Wrapper })
    expect(getByTestId('dashboard')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(<Dashboard />, { wrapper: Wrapper })
    expect(getByTestId('dashboard')).toBeDefined()
  })
})
