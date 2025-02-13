import { renderHook } from '@testing-library/react-native'
import { useBmiBottomSheet } from './useBmiBottomSheet'
import { getHeight, getLatestWeight } from '@/db'
import { Wrapper } from '@/utils/test/test-utils'

jest.mock('@/db', () => ({
  getLatestWeight: jest.fn(),
  getHeight: jest.fn(),
  updateUserHeight: jest.fn(),
  updateUserWeight: jest.fn(),
}))

const mockClose = jest.fn()

jest.mock('../../progression.context', () => {
  return {
    useProgressionContext: jest.fn(() => {
      const ref = { current: { close: mockClose } }

      return { bmiBottomSheetRef: ref }
    }),
  }
})

describe('useBmiBottomSheet', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(getLatestWeight as jest.Mock).mockResolvedValueOnce({
      current: 50,
      heaviest: 80,
      lightest: 50,
    })
    ;(getHeight as jest.Mock).mockResolvedValueOnce(170)
  })

  it('should return the expected values', () => {
    const { result } = renderHook(() => useBmiBottomSheet(), { wrapper: Wrapper })

    expect(result.current).toBeDefined()
  })

  it('should be able to call handleCancel', () => {
    const { result } = renderHook(() => useBmiBottomSheet(), { wrapper: Wrapper })

    result.current.handleCancel()

    expect(mockClose).toHaveBeenCalledTimes(1)
  })

  it('should be able to call handleSubmit', () => {
    const { result } = renderHook(() => useBmiBottomSheet(), { wrapper: Wrapper })

    result.current.handleSubmit({ weight: 70, height: 180 })

    expect(mockClose).toHaveBeenCalledTimes(0)
  })

  it('should be able to call handleSubmit with the same values', () => {
    const { result } = renderHook(() => useBmiBottomSheet(), { wrapper: Wrapper })

    result.current.handleSubmit({ weight: 50, height: 170 })

    expect(mockClose).toHaveBeenCalledTimes(1)
  })
})
