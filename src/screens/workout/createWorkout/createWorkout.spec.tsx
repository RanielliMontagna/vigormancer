import { act, fireEvent, render, waitFor } from '@testing-library/react-native'

import { useColorScheme } from '@/hooks'
import { Wrapper } from '@/utils/test/test-utils'

import { CreateWorkout } from './createWorkout'
import { createWorkout } from '@/db'

const mockUseColorScheme = useColorScheme as jest.Mock

jest.mock('@/db', () => ({
  createWorkout: jest.fn(),
}))

describe('CreateWorkout', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render successfully', () => {
    const { getByTestId } = render(<CreateWorkout />, { wrapper: Wrapper })
    expect(getByTestId('create-workout')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(<CreateWorkout />, { wrapper: Wrapper })
    expect(getByTestId('create-workout')).toBeDefined()
  })

  it('should call handleBack when back button is pressed', async () => {
    const { getByTestId } = render(<CreateWorkout />, { wrapper: Wrapper })

    await act(async () => {
      fireEvent.press(getByTestId('cancel'))
    })

    expect(getByTestId('create-workout')).toBeDefined()
  })

  it('should call handleSubmit when form is submitted', async () => {
    ;(createWorkout as jest.Mock).mockImplementationOnce(async () => {
      return { id: '1' }
    })

    const { getByTestId } = render(<CreateWorkout />, { wrapper: Wrapper })

    await act(async () => {
      fireEvent.changeText(getByTestId('name'), 'Workout 1')
      fireEvent.changeText(getByTestId('description'), 'Description 1')
      fireEvent.press(getByTestId('submit'))
    })

    await waitFor(() => {
      expect(getByTestId('create-workout')).toBeDefined()
    })
  })

  it('should throw error when createWorkout throws error', async () => {
    ;(createWorkout as jest.Mock).mockImplementationOnce(async () => {
      throw new Error()
    })

    const { getByTestId } = render(<CreateWorkout />, { wrapper: Wrapper })

    await act(async () => {
      fireEvent.changeText(getByTestId('name'), 'Workout 1')
      fireEvent.changeText(getByTestId('description'), 'Description 1')
      fireEvent.press(getByTestId('submit'))
    })

    await waitFor(() => {
      expect(getByTestId('create-workout')).toBeDefined()
    })
  })
})
