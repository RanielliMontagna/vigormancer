import { act } from 'react'
import { renderHook } from '@testing-library/react-native'

import { useAppStore } from './appStore'

describe('appStore', () => {
  it('should return the initial state', () => {
    const { result } = renderHook(() => useAppStore())
    expect(result.current.isLoading).toBe(false)
  })

  it('should set isLoading to true', () => {
    const { result } = renderHook(() => useAppStore())

    act(() => {
      result.current.setIsLoading(true)
    })

    expect(result.current.isLoading).toBe(true)
  })

  it('should use handleErrors with default error message', () => {
    const { result } = renderHook(() => useAppStore())

    act(() => {
      result.current.handleErrors('error')
    })

    expect(result.current.isLoading).toBe(false)
  })

  it('should use handleErrors with clerk error message', () => {
    const { result } = renderHook(() => useAppStore())

    act(() => {
      result.current.handleErrors('clerk error')
    })

    expect(result.current.isLoading).toBe(false)
  })
})
