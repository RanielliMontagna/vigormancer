import { render } from '@testing-library/react-native'

import { Workout } from './workout'
import { useColorScheme } from '@/hooks'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/libs/react-query'

const mockUseColorScheme = useColorScheme as jest.Mock

const Wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('Workout', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<Workout />, { wrapper: Wrapper })
    expect(getByTestId('workout')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(<Workout />, { wrapper: Wrapper })
    expect(getByTestId('workout')).toBeDefined()
  })
})
