import { renderHook } from '@/utils'
import { useColorScheme as useNativewindColorScheme } from 'nativewind'

import { useColorScheme } from './useColorScheme'

jest.mock('nativewind')

const mockUseNativewindColorScheme = useNativewindColorScheme as jest.Mock

describe('useColorScheme', () => {
  it('should return isDarkColorScheme as false', () => {
    mockUseNativewindColorScheme.mockReturnValue({ colorScheme: 'light' })

    const { isDarkColorScheme } = renderHook(() => useColorScheme()).result.current

    expect(isDarkColorScheme).toBe(false)
  })

  it('should return isDarkColorScheme as true', () => {
    mockUseNativewindColorScheme.mockReturnValue({ colorScheme: 'dark' })

    const { isDarkColorScheme } = renderHook(() => useColorScheme()).result.current

    expect(isDarkColorScheme).toBe(true)
  })

  it('should return dark when colorScheme is null', () => {
    mockUseNativewindColorScheme.mockReturnValue({ colorScheme: null })

    const { colorScheme } = renderHook(() => useColorScheme()).result.current

    expect(colorScheme).toBe('dark')
  })
})
