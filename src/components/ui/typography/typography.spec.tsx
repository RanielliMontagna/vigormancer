import React from 'react'
import { render } from '@/utils'

import { H1, H2, H3, H4, P, BlockQuote, Code, Lead, Large, Small, Muted, Text } from '@/components'

describe('Typography', () => {
  it('should be able to render H1', () => {
    const { getByTestId } = render(<H1 />)

    expect(getByTestId('h1')).toBeDefined()
  })

  it('should be able to render H1 with slot', () => {
    const { getByTestId } = render(
      <H1 asChild>
        <Text>Slot</Text>
      </H1>,
    )

    expect(getByTestId('h1')).toBeDefined()
  })

  it('should be able to render H2', () => {
    const { getByTestId } = render(<H2 />)

    expect(getByTestId('h2')).toBeDefined()
  })

  it('should be able to render H2 with slot', () => {
    const { getByTestId } = render(
      <H2 asChild>
        <Text>Slot</Text>
      </H2>,
    )

    expect(getByTestId('h2')).toBeDefined()
  })

  it('should be able to render H3', () => {
    const { getByTestId } = render(<H3 />)

    expect(getByTestId('h3')).toBeDefined()
  })

  it('should be able to render H3 with slot', () => {
    const { getByTestId } = render(
      <H3 asChild>
        <Text>Slot</Text>
      </H3>,
    )

    expect(getByTestId('h3')).toBeDefined()
  })

  it('should be able to render H4', () => {
    const { getByTestId } = render(<H4 />)

    expect(getByTestId('h4')).toBeDefined()
  })

  it('should be able to render H4 with slot', () => {
    const { getByTestId } = render(
      <H4 asChild>
        <Text>Slot</Text>
      </H4>,
    )

    expect(getByTestId('h4')).toBeDefined()
  })

  it('should be able to render P', () => {
    const { getByTestId } = render(<P />)

    expect(getByTestId('p')).toBeDefined()
  })

  it('should be able to render P with slot', () => {
    const { getByTestId } = render(
      <P asChild>
        <Text>Slot</Text>
      </P>,
    )

    expect(getByTestId('p')).toBeDefined()
  })

  it('should be able to render BlockQuote', () => {
    const { getByTestId } = render(<BlockQuote />)

    expect(getByTestId('blockquote')).toBeDefined()
  })

  it('should be able to render BlockQuote with slot', () => {
    const { getByTestId } = render(
      <BlockQuote asChild>
        <Text>Slot</Text>
      </BlockQuote>,
    )

    expect(getByTestId('blockquote')).toBeDefined()
  })

  it('should be able to render Code', () => {
    const { getByTestId } = render(<Code />)

    expect(getByTestId('code')).toBeDefined()
  })

  it('should be able to render Code with slot', () => {
    const { getByTestId } = render(
      <Code asChild>
        <Text>Slot</Text>
      </Code>,
    )

    expect(getByTestId('code')).toBeDefined()
  })

  it('should be able to render Lead', () => {
    const { getByTestId } = render(<Lead />)

    expect(getByTestId('lead')).toBeDefined()
  })

  it('should be able to render Lead with slot', () => {
    const { getByTestId } = render(
      <Lead asChild>
        <Text>Slot</Text>
      </Lead>,
    )

    expect(getByTestId('lead')).toBeDefined()
  })

  it('should be able to render Large', () => {
    const { getByTestId } = render(<Large />)

    expect(getByTestId('large')).toBeDefined()
  })

  it('should be able to render Large with slot', () => {
    const { getByTestId } = render(
      <Large asChild>
        <Text>Slot</Text>
      </Large>,
    )

    expect(getByTestId('large')).toBeDefined()
  })

  it('should be able to render Small', () => {
    const { getByTestId } = render(<Small />)

    expect(getByTestId('small')).toBeDefined()
  })

  it('should be able to render Small with slot', () => {
    const { getByTestId } = render(
      <Small asChild>
        <Text>Slot</Text>
      </Small>,
    )

    expect(getByTestId('small')).toBeDefined()
  })

  it('should be able to render Muted', () => {
    const { getByTestId } = render(<Muted />)

    expect(getByTestId('muted')).toBeDefined()
  })

  it('should be able to render Muted with slot', () => {
    const { getByTestId } = render(
      <Muted asChild>
        <Text>Slot</Text>
      </Muted>,
    )

    expect(getByTestId('muted')).toBeDefined()
  })
})
