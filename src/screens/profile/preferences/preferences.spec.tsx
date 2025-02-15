import { act, fireEvent, renderWithProviders } from '@/utils'

import { Preferences } from './preferences'
import { router } from 'expo-router'

let mockCurrentLanguage = 'en-US'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: mockCurrentLanguage,
      changeLanguage: jest.fn(),
    },
  }),
}))

describe('Preferences', () => {
  beforeEach(() => {
    mockCurrentLanguage = 'en-US'
  })

  it('should render successfully', () => {
    const { getByTestId } = renderWithProviders(<Preferences />)

    expect(getByTestId('preferences')).toBeDefined()
  })

  it('should call handleGoToLanguageScreen when language is pressed', () => {
    jest.spyOn(router, 'push')

    const { getByTestId } = renderWithProviders(<Preferences />)

    act(() => {
      const language = getByTestId('language')
      fireEvent.press(language)
    })

    expect(router.push).toHaveBeenCalledWith('(private)/language')
  })

  it('should call handleLogout when logout is pressed', () => {
    const { getByTestId } = renderWithProviders(<Preferences />)

    act(() => {
      const logout = getByTestId('logout')
      fireEvent.press(logout)
    })
  })

  it('should be able with language pt-BR', () => {
    mockCurrentLanguage = 'pt-BR'

    const { getByTestId } = renderWithProviders(<Preferences />)

    act(() => {
      const language = getByTestId('language')
      fireEvent.press(language)
    })
  })

  it('should be able to call toggleColorScheme', () => {
    const { getByTestId } = renderWithProviders(<Preferences />)

    act(() => {
      const theme = getByTestId('theme')
      fireEvent.press(theme)
    })
  })
})
