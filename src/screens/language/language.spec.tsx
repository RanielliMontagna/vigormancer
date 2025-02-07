import { fireEvent, render } from '@testing-library/react-native'

import { Language } from './language'
import { useColorScheme } from '@/hooks'
import { act } from 'react'

const mockUseColorScheme = useColorScheme as jest.Mock

jest.mock('@/libs/i18n', () => ({
  i18n: { changeLanguage: jest.fn(), reloadResources: jest.fn() },
}))

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

  it('should be able to call the function to change the language to English', () => {
    const { getByTestId } = render(<Language />)

    act(() => {
      const cardLanguage = getByTestId('card-language-en-US')
      fireEvent.press(cardLanguage)
    })
  })

  it('should be able to call the function to change the language to Portuguese', () => {
    const { getByTestId } = render(<Language />)

    act(() => {
      const cardLanguage = getByTestId('card-language-pt-BR')
      fireEvent.press(cardLanguage)
    })
  })
})
