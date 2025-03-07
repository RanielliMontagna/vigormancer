import { act, fireEvent, waitFor } from '@/utils'

import { AddExercise } from './addExercise'

import { createWorkoutExercise, fetchExercises } from '@/db'
import { useColorScheme } from '@/hooks'
import { ExerciseType, ExerciseWithCategory } from '@/db/repositories/exercises'
import { renderWithProviders } from '@/utils'

jest.mock('@/db')

const mockUseColorScheme = useColorScheme as jest.Mock

describe('AddExercise', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetchExercises as jest.Mock).mockImplementation(async () => {
      return [
        {
          id: 1,
          exerciseName: 'Exercise 1',
          image: 'image',
          categoryName: 'Category 1',
          categoryId: '1',
          type: ExerciseType.STRENGTH,
        },
        {
          id: 2,
          exerciseName: 'Exercise 2',
          image: 'image',
          categoryName: 'Category 2',
          categoryId: '2',
          type: ExerciseType.CARDIO,
        },
      ] as ExerciseWithCategory[]
    })
    ;(createWorkoutExercise as jest.Mock).mockImplementation(async () => {
      return { id: '1' }
    })
  })

  it('should render correctly', async () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: false })

    const { getByText } = renderWithProviders(<AddExercise />)

    expect(getByText('workout.addExercise.title')).toBeDefined()
  })

  it('should be able to search for exercises', async () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: false })

    const { getByTestId } = renderWithProviders(<AddExercise />)

    await act(() => {
      const searchInput = getByTestId('search')
      fireEvent.changeText(searchInput, 'Exercise 1')
    })

    // Aguardar o carregamento dos dados
    await waitFor(() => expect(getByTestId('exercise-1')).toBeDefined())
  })

  it('should be able to select an exercise', async () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = renderWithProviders(<AddExercise />)

    const exercise = getByTestId('exercise-1')
    act(() => {
      fireEvent.press(exercise)
    })

    expect(createWorkoutExercise).toHaveBeenCalledTimes(1)
  })
})
