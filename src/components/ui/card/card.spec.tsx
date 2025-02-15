import React from 'react'
import { render } from '@/utils'

import { Card, CardHeader, CardContent, CardFooter } from '@/components'

describe('Card', () => {
  it('should be able to render', () => {
    const { getByTestId } = render(<Card />)

    expect(getByTestId('card-view')).toBeDefined()
  })

  it('should be able to render header', () => {
    const { getByTestId } = render(<CardHeader />)

    expect(getByTestId('card-header-view')).toBeDefined()
  })

  it('should be able to render content', () => {
    const { getByTestId } = render(<CardContent />)

    expect(getByTestId('card-content-view')).toBeDefined()
  })

  it('should be able to render footer', () => {
    const { getByTestId } = render(<CardFooter />)

    expect(getByTestId('card-footer-view')).toBeDefined()
  })
})
