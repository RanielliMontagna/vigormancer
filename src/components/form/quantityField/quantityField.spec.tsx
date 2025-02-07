import { fireEvent, render, renderHook } from '@testing-library/react-native'
import { QuantityField } from './quantityField'
import { FormProvider, useForm } from 'react-hook-form'
import { act } from 'react'

describe('QuantityField', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useForm())

    const { getByTestId } = render(
      <FormProvider {...result.current}>
        <QuantityField control={result.current.control} name="quantity" />,
      </FormProvider>,
    )

    expect(getByTestId('quantity-field')).toBeDefined()
  })

  it('should be able to decrement quantity', () => {
    const { result } = renderHook(() => useForm({ defaultValues: { quantity: 1 } }))

    const { getByTestId } = render(
      <FormProvider {...result.current}>
        <QuantityField control={result.current.control} name="quantity" />,
      </FormProvider>,
    )

    act(() => {
      fireEvent(getByTestId('decrement-button'), 'pressIn')
      fireEvent(getByTestId('decrement-button'), 'pressOut')
    })

    act(() => {
      fireEvent(getByTestId('decrement-button'), 'pressIn')
      fireEvent(getByTestId('decrement-button'), 'pressOut')
    })
  })

  it('should be able to increment quantity', () => {
    const { result } = renderHook(() => useForm({ defaultValues: { quantity: 999998 } }))

    const { getByTestId } = render(
      <FormProvider {...result.current}>
        <QuantityField control={result.current.control} name="quantity" />,
      </FormProvider>,
    )

    act(() => {
      fireEvent(getByTestId('increment-button'), 'pressIn')
      fireEvent(getByTestId('increment-button'), 'pressOut')
    })

    act(() => {
      fireEvent(getByTestId('increment-button'), 'pressIn')
      fireEvent(getByTestId('increment-button'), 'pressOut')
    })
  })
})
