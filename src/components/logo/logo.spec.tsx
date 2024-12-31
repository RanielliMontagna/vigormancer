import React from 'react'
import { render } from '@testing-library/react-native'

import { Logo } from '@/components'
import { useColorScheme } from '@/hooks'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('Logo', () => {
  it('should be able to render', () => {
    const { getByTestId } = render(<Logo />)

    expect(getByTestId('logo-view')).toBeDefined()
  })

  it('should be able to render horizontal orientation', () => {
    const { getByTestId } = render(<Logo orientation="horizontal" />)

    expect(getByTestId('logo-view')).toBeDefined()
  })

  it('should be able to render vertical orientation', () => {
    const { getByTestId } = render(<Logo orientation="vertical" />)

    expect(getByTestId('logo-view')).toBeDefined()
  })

  it('should be able to render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(<Logo />)

    expect(getByTestId('logo-view')).toBeDefined()
  })
})
