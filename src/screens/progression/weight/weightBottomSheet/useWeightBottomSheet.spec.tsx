import { useWeightBottomSheet } from './useWeightBottomSheet'
import { getLatestWeight } from '@/db'
import { renderHookWithProviders } from '@/utils'

jest.mock('@/db', () => ({
  getLatestWeight: jest.fn(),
  updateUserWeight: jest.fn(),
}))

const mockClose = jest.fn()

jest.mock('../../progression.context', () => {
  return {
    useProgressionContext: jest.fn(() => {
      const ref = { current: { close: mockClose } }

      return { weightBottomSheetRef: ref }
    }),
  }
})

describe('useWeightBottomSheet', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(getLatestWeight as jest.Mock).mockResolvedValueOnce({
      current: 50,
      heaviest: 80,
      lightest: 50,
    })
  })

  it('should be able to call handleCancel', () => {
    const { result } = renderHookWithProviders(useWeightBottomSheet)

    result.current.handleCancel()

    expect(mockClose).toHaveBeenCalledTimes(1)
  })

  it('should be able to call handleSubmit', () => {
    const { result } = renderHookWithProviders(useWeightBottomSheet)

    result.current.handleSubmit({ weight: 70 })

    expect(mockClose).toHaveBeenCalledTimes(0)
  })
})
