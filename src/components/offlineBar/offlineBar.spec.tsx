import React from 'react'
import { render } from '@/utils'

import { OfflineBar } from '@/components'

describe('OfflineBar', () => {
  it('should be able to render', () => {
    const { getByTestId } = render(<OfflineBar />)

    expect(getByTestId('offline-bar')).toBeDefined()
  })

  it('should not render in production', () => {
    process.env.NODE_ENV = 'production'

    const { queryByTestId } = render(<OfflineBar />)

    expect(queryByTestId('offline-bar')).toBeNull()
  })
})
