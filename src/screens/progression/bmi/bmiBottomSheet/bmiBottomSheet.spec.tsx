import { renderWithProviders } from '@/utils'
import { BmiBottomSheet } from './bmiBottomSheet'
import { getHeight, getLatestWeight } from '@/db'

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

      return { bmiBottomSheetRef: ref }
    }),
  }
})

describe('bmiBottomSheet', () => {
  beforeEach(() => {
    ;(getLatestWeight as jest.Mock).mockResolvedValueOnce({
      current: 50,
      heaviest: 80,
      lightest: 50,
    })
    ;(getHeight as jest.Mock).mockResolvedValueOnce(170)
  })

  it('should start with the bottom sheet open', async () => {
    renderWithProviders(<BmiBottomSheet />)

    // Aguarda a execução assíncrona do mock
    await Promise.resolve()

    expect(mockPresent).toHaveBeenCalledTimes(1)
  })
})
