import { renderHookWithProviders } from '@/utils'
import { useBmiBottomSheet } from './useBmiBottomSheet'
import { getHeight, getLatestWeight } from '@/db'

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
    const { result } = renderHookWithProviders(useBmiBottomSheet)

    expect(result.current).toBeDefined()
  })

  it('should be able to call handleCancel', () => {
    const { result } = renderHookWithProviders(useBmiBottomSheet)

    result.current.handleCancel()

    expect(mockClose).toHaveBeenCalledTimes(1)
  })

  it('should be able to call handleSubmit', () => {
    const { result } = renderHookWithProviders(useBmiBottomSheet)

    result.current.handleSubmit({ weight: 70, height: 180 })

    expect(mockClose).toHaveBeenCalledTimes(0)
  })

  it('should be able to call handleSubmit with the same values', () => {
    const { result } = renderHookWithProviders(useBmiBottomSheet)

    result.current.handleSubmit({ weight: 50, height: 170 })

    expect(mockClose).toHaveBeenCalledTimes(1)
  })
})
