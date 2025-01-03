import { render } from '@testing-library/react-native'

import { Dashboard } from './dashboard'
import { useColorScheme } from '@/hooks'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('Dashboard', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<Dashboard />)
    expect(getByTestId('dashboard')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(<Dashboard />)
    expect(getByTestId('dashboard')).toBeDefined()
  })
})
