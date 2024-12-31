import React from 'react'
import { render } from '@testing-library/react-native'

import { LoadingOverlay } from '@/components'

describe('LoadingOverlay', () => {
  it('should render', () => {
    const { debug, getByTestId } = render(<LoadingOverlay />)

    debug()

    expect(getByTestId('loading-activity-indicator')).toBeDefined()
  })
})
