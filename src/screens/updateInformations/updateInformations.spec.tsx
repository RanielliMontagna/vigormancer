import { render } from '@testing-library/react-native'

import { UpdateInformations } from './updateInformations'
import { useColorScheme } from '@/hooks'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('UpdateInformations', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<UpdateInformations />)
    expect(getByTestId('update-informations')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(<UpdateInformations />)
    expect(getByTestId('update-informations')).toBeDefined()
  })
})
