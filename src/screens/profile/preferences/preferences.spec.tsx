import { act, fireEvent, render } from '@testing-library/react-native'

import { Preferences } from './preferences'
import { router } from 'expo-router'
import { Wrapper } from '@/utils/test/test-utils'

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
    const { getByTestId } = render(<Preferences />, { wrapper: Wrapper })

    expect(getByTestId('preferences')).toBeDefined()
  })

  it('should call handleGoToLanguageScreen when language is pressed', () => {
    jest.spyOn(router, 'push')

    const { getByTestId } = render(<Preferences />, { wrapper: Wrapper })

    act(() => {
      const language = getByTestId('language')
      fireEvent.press(language)
    })

    expect(router.push).toHaveBeenCalledWith('(private)/language')
  })

  it('should call handleLogout when logout is pressed', () => {
    const { getByTestId } = render(<Preferences />, { wrapper: Wrapper })

    act(() => {
      const logout = getByTestId('logout')
      fireEvent.press(logout)
    })
  })

  it('should be able with language pt-BR', () => {
    mockCurrentLanguage = 'pt-BR'

    const { getByTestId } = render(<Preferences />, { wrapper: Wrapper })

    act(() => {
      const language = getByTestId('language')
      fireEvent.press(language)
    })
  })

  it('should be able to call toggleColorScheme', () => {
    const { getByTestId } = render(<Preferences />, { wrapper: Wrapper })

    act(() => {
      const theme = getByTestId('theme')
      fireEvent.press(theme)
    })
  })
})
