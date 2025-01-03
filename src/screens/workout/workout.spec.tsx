import { render } from '@testing-library/react-native'

import { Workout } from './workout'
import { useColorScheme } from '@/hooks'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('Workout', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<Workout />)
    expect(getByTestId('workout')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(<Workout />)
    expect(getByTestId('workout')).toBeDefined()
  })
})
