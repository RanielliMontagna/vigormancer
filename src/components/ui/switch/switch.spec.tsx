import { render } from '@/utils'

import { Switch } from './switch'
import { useColorScheme } from '@/hooks'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('Switch', () => {
  it('should render successfully', () => {
    mockUseColorScheme.mockReturnValue({
      colorScheme: 'light',
      isDarkColorScheme: false,
    })

    const { getByTestId } = render(<Switch checked={false} onCheckedChange={jest.fn()} />)
    expect(getByTestId('switch')).toBeDefined()
  })

  it('should render with disabled state', () => {
    mockUseColorScheme.mockReturnValue({
      colorScheme: 'light',
      isDarkColorScheme: false,
    })

    const { getByTestId } = render(<Switch checked={false} onCheckedChange={jest.fn()} disabled />)
    expect(getByTestId('switch')).toBeDefined()
  })
})
