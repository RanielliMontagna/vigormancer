import { render } from '@testing-library/react-native'

import { Progression } from './progression'
import { useColorScheme } from '@/hooks'
import { Wrapper } from '@/utils/test/test-utils'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('Progression', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<Progression />, { wrapper: Wrapper })
    expect(getByTestId('progression')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(<Progression />, { wrapper: Wrapper })
    expect(getByTestId('progression')).toBeDefined()
  })
})
