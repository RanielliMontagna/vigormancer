import React from 'react'
import { render, fireEvent, act } from '@testing-library/react-native'

import { BackButton } from '@/components'
import { useColorScheme } from '@/hooks'
import { router } from 'expo-router'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('BackButton', () => {
  it('should be able to render', () => {
    const { getByTestId } = render(<BackButton />)

    expect(getByTestId('back-button-touchable-opacity')).toBeDefined()
  })

  it('should be able with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(<BackButton />)

    expect(getByTestId('back-button-touchable-opacity')).toBeDefined()
  })

  it('should be able to call onPress function', () => {
    const onPress = jest.fn()

    const { getByTestId } = render(<BackButton onPress={onPress} />)

    act(() => {
      fireEvent.press(getByTestId('back-button-touchable-opacity'))
    })

    expect(onPress).toHaveBeenCalled()
  })

  it('should be able to call router.canGoBack and router.back', () => {
    const { getByTestId } = render(<BackButton />)

    router.canGoBack = jest.fn().mockReturnValue(false)

    act(() => {
      fireEvent.press(getByTestId('back-button-touchable-opacity'))
    })

    expect(router.canGoBack).toHaveBeenCalled()
  })

  it('should be able to call router.canGoBack and router.back', () => {
    const { getByTestId } = render(<BackButton />)

    router.canGoBack = jest.fn().mockReturnValue(true)
    router.back = jest.fn()

    act(() => {
      fireEvent.press(getByTestId('back-button-touchable-opacity'))
    })

    expect(router.back).toHaveBeenCalled()
  })
})
