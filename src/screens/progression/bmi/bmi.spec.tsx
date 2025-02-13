import { renderWithProviders } from '@/utils'
import { Bmi } from './bmi'
import { getHeight, getLatestWeight } from '@/db'

jest.mock('@/db', () => ({
  getLatestWeight: jest.fn(),
  getHeight: jest.fn(),
}))

describe('@screen/progession/bmi', () => {
  it('should render successfully', () => {
    const { getByTestId } = renderWithProviders(<Bmi />)

    expect(getByTestId('bmi')).toBeDefined()
  })

  it('should render with category Underweight', () => {
    ;(getLatestWeight as jest.Mock).mockResolvedValueOnce({
      current: 50,
      heaviest: 80,
      lightest: 50,
    })
    ;(getHeight as jest.Mock).mockResolvedValueOnce(170)

    const { getByTestId } = renderWithProviders(<Bmi />)

    expect(getByTestId('bmi')).toBeDefined()
  })

  it('should render with category Normal', () => {
    ;(getLatestWeight as jest.Mock).mockResolvedValueOnce({
      current: 70,
      heaviest: 80,
      lightest: 50,
    })
    ;(getHeight as jest.Mock).mockResolvedValueOnce(170)

    const { getByTestId } = renderWithProviders(<Bmi />)

    expect(getByTestId('bmi')).toBeDefined()
  })

  it('should render with category Overweight', () => {
    ;(getLatestWeight as jest.Mock).mockResolvedValueOnce({
      current: 80,
      heaviest: 80,
      lightest: 50,
    })
    ;(getHeight as jest.Mock).mockResolvedValueOnce(170)

    const { getByTestId } = renderWithProviders(<Bmi />)

    expect(getByTestId('bmi')).toBeDefined()
  })

  it('should render with category ObesityI', () => {
    ;(getLatestWeight as jest.Mock).mockResolvedValueOnce({
      current: 100,
      heaviest: 80,
      lightest: 50,
    })
    ;(getHeight as jest.Mock).mockResolvedValueOnce(170)

    const { getByTestId } = renderWithProviders(<Bmi />)

    expect(getByTestId('bmi')).toBeDefined()
  })

  it('should render with category ObesityII', () => {
    ;(getLatestWeight as jest.Mock).mockResolvedValueOnce({
      current: 110,
      heaviest: 80,
      lightest: 50,
    })
    ;(getHeight as jest.Mock).mockResolvedValueOnce(170)

    const { getByTestId } = renderWithProviders(<Bmi />)

    expect(getByTestId('bmi')).toBeDefined()
  })

  it('should render with category ObesityIII', () => {
    ;(getLatestWeight as jest.Mock).mockResolvedValueOnce({
      current: 120,
      heaviest: 80,
      lightest: 50,
    })
    ;(getHeight as jest.Mock).mockResolvedValueOnce(170)

    const { getByTestId } = renderWithProviders(<Bmi />)

    expect(getByTestId('bmi')).toBeDefined()
  })
})
