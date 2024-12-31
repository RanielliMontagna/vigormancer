import React from 'react'
import { render } from '@testing-library/react-native'

import { LoadingOverlay } from '@/components'
import { useColorScheme } from '@/hooks'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('LoadingOverlay', () => {
  it('should render', () => {
    const { getByTestId } = render(<LoadingOverlay />)

    expect(getByTestId('loading-activity-indicator')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(<LoadingOverlay />)

    expect(getByTestId('loading-activity-indicator')).toBeDefined()
  })
})
