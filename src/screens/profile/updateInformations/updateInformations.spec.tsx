import { act, fireEvent, render } from '@/utils'

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

  it('should be able to submit the form', () => {
    const { getByTestId } = render(<UpdateInformations />)

    act(() => {
      fireEvent.changeText(getByTestId('username'), 'username')
      fireEvent.changeText(getByTestId('fullName'), 'fullName')

      fireEvent.press(getByTestId('submit-button'))
    })

    expect(getByTestId('update-informations')).toBeDefined()
  })
})
