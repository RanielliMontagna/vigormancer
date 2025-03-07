import { WeightBottomSheet } from './weightBottomSheet'
import { getHeight, getLatestWeight } from '@/db'
import { renderWithProviders } from '@/utils'

jest.mock('@/db', () => ({
  getLatestWeight: jest.fn(),
  getHeight: jest.fn(),
}))

const mockPresent = jest.fn(() => Promise.resolve())

jest.mock('../../progression.context', () => {
  return {
    useProgressionContext: jest.fn(() => {
      const ref = { current: { present: mockPresent } }

      ref.current.present()

      return { weightBottomSheetRef: ref }
    }),
  }
})

describe('weightBottomSheet', () => {
  beforeEach(() => {
    ;(getLatestWeight as jest.Mock).mockResolvedValueOnce({
      current: 50,
      heaviest: 80,
      lightest: 50,
    })
    ;(getHeight as jest.Mock).mockResolvedValueOnce(170)
  })

  it('should start with the bottom sheet open', async () => {
    renderWithProviders(<WeightBottomSheet />)

    // Aguarda a execução assíncrona do mock
    await Promise.resolve()

    expect(mockPresent).toHaveBeenCalledTimes(1)
  })
})
