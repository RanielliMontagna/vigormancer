import { render } from '@/utils'

import { Notifications } from './notifications'
import { useColorScheme } from '@/hooks'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('Notifications', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<Notifications />)
    expect(getByTestId('notifications')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(<Notifications />)
    expect(getByTestId('notifications')).toBeDefined()
  })
})
