import { waitFor } from '@/utils'

import { WorkoutDifficulty, WorkoutWithExercises } from '@/db/repositories/workouts'
import { renderWithProviders } from '@/utils/test/test-utils'
import { useColorScheme } from '@/hooks'
import { getWorkout } from '@/db'

import { WorkoutDetails } from './workoutDetails'

const mockUseColorScheme = useColorScheme as jest.Mock

jest.mock('@/db', () => ({ getWorkout: jest.fn() }))

const responseMock: WorkoutWithExercises = {
  id: '1',
  name: 'Workout 1',
  description: 'Description 1',
  difficulty: WorkoutDifficulty.BEGINNER,
  exercises: [],
  image: 'image',
  updatedAt: '2021-09-01T00:00:00.000Z',
  createdAt: '2021-09-01T00:00:00.000Z',
}

describe('WorkoutDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Without data', () => {
    it('should render correctly', async () => {
      mockUseColorScheme.mockReturnValue({ isDarkColorScheme: false })
      ;(getWorkout as jest.Mock).mockImplementationOnce(async () => responseMock)

      const { getByTestId } = renderWithProviders(<WorkoutDetails />)

      await waitFor(() => {
        expect(getByTestId('workout-details')).toBeDefined()
      })
    })

    it('should render correctly with dark color scheme', async () => {
      mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })
      ;(getWorkout as jest.Mock).mockImplementationOnce(async () => responseMock)

      mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

      const { getByTestId } = renderWithProviders(<WorkoutDetails />)

      await waitFor(() => {
        expect(getByTestId('workout-details')).toBeDefined()
      })
    })
  })

  describe('With data', () => {
    it('should render correctly with exercises', async () => {
      mockUseColorScheme.mockReturnValue({ isDarkColorScheme: false })
      ;(getWorkout as jest.Mock).mockImplementationOnce(async () => ({
        ...responseMock,
        difficulty: WorkoutDifficulty.INTERMEDIATE,
        image: undefined,
        exercises: [
          {
            id: '1',
            workoutId: '1',
            repetitions: 10,
            sets: 3,
            exerciseId: 1,
            exerciseName: 'Exercise 1',
            categoryId: '1',
            categoryName: 'Category 1',
            updatedAt: '2021-09-01T00:00:00.000Z',
            createdAt: '2021-09-01T00:00:00.000Z',
          },
          {
            id: '2',
            workoutId: '1',
            repetitions: 10,
            sets: 3,
            exerciseId: 2,
            exerciseName: 'Exercise 2',
            categoryId: '2',
            categoryName: 'Category 2',
            updatedAt: '2021-09-01T00:00:00.000Z',
            createdAt: '2021-09-01T00:00:00.000Z',
          },
        ],
      }))

      const { getByTestId } = renderWithProviders(<WorkoutDetails />)

      await waitFor(() => {
        expect(getByTestId('workout-details')).toBeDefined()
      })
    })

    it('should render correctly with exercises and dark color scheme', async () => {
      mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })
      ;(getWorkout as jest.Mock).mockImplementationOnce(async () => ({
        ...responseMock,
        difficulty: WorkoutDifficulty.ADVANCED,
        image: undefined,
        exercises: [
          {
            id: '1',
            workoutId: '1',
            repetitions: 10,
            sets: 3,
            exerciseId: 1,
            exerciseName: 'Exercise 1',
            categoryId: '1',
            categoryName: 'Category 1',
            updatedAt: '2021-09-01T00:00:00.000Z',
            createdAt: '2021-09-01T00:00:00.000Z',
          },
          {
            id: '2',
            workoutId: '1',
            repetitions: 10,
            sets: 3,
            exerciseId: 2,
            exerciseName: 'Exercise 2',
            categoryId: '2',
            categoryName: 'Category 2',
            updatedAt: '2021-09-01T00:00:00.000Z',
            createdAt: '2021-09-01T00:00:00.000Z',
          },
        ],
      }))

      const { getByTestId } = renderWithProviders(<WorkoutDetails />)

      await waitFor(() => {
        expect(getByTestId('workout-details')).toBeDefined()
      })
    })
  })
})
