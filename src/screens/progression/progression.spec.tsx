import { render } from '@testing-library/react-native'

import { Progression } from './progression'
import { useColorScheme } from '@/hooks'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('Progression', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<Progression />, {
      wrapper: BottomSheetModalProvider,
    })
    expect(getByTestId('progression')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(<Progression />, {
      wrapper: BottomSheetModalProvider,
    })
    expect(getByTestId('progression')).toBeDefined()
  })
})
