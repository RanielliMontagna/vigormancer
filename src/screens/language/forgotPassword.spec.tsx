import { render } from '@testing-library/react-native'

import { Language } from './language'
import { useColorScheme } from '@/hooks'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('Language', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<Language />)
    expect(getByTestId('language')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(<Language />)
    expect(getByTestId('language')).toBeDefined()
  })
})
