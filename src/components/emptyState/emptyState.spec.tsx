import React from 'react'
import { render } from '@testing-library/react-native'

import { EmptyState } from '@/components'

describe('EmptyState', () => {
  it('should be able to render', () => {
    const { getByTestId } = render(
      <EmptyState title="Title" subtitle="Subtitle" svgImage={() => <></>} />,
    )

    expect(getByTestId('empty-state')).toBeDefined()
  })
})
