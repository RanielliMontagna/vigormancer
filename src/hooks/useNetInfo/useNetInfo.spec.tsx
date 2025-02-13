import { renderHook } from '@/utils'
import { useNetInfo } from './useNetInfo'

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  fetch: jest.fn(),
}))

describe('@hooks/useNetInfo', () => {
  it('should return isConnected as true', () => {
    const { result } = renderHook(() => useNetInfo())

    expect(result.current.isConnected).toBe(true)
  })
})
