import { act, fireEvent, render, waitFor } from '@testing-library/react-native'

import { Workout } from './workout'
import { useColorScheme } from '@/hooks'
import { useWorkout } from './useWorkout'
import { WorkoutDifficulty, Workout as WorkoutType } from '@/db/repositories/workouts'
import { Wrapper } from '@/utils/test/test-utils'

const mockUseColorScheme = useColorScheme as jest.Mock

const useWorkoutMockValues = {
  t: jest.fn((key) => key),
  workouts: [] as WorkoutType[],
  isLoading: false,
  isWorkoutsEmpty: true,
  refetch: jest.fn(),
  handleAddWorkout: jest.fn(),
  handleOpenWorkoutDetails: jest.fn(),
}

jest.mock('./useWorkout', () => ({ useWorkout: jest.fn() }))

describe('Workout', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useWorkout as jest.Mock).mockImplementation(() => useWorkoutMockValues)
  })

  it('should render successfully', () => {
    const { getByTestId } = render(<Workout />, { wrapper: Wrapper })
    expect(getByTestId('workout')).toBeDefined()
  })

  it('should render with dark color scheme', () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const { getByTestId } = render(<Workout />, { wrapper: Wrapper })
    expect(getByTestId('workout')).toBeDefined()
  })

  it('should render flash list when workouts is not empty', async () => {
    ;(useWorkout as jest.Mock).mockImplementation(() => ({
      ...useWorkoutMockValues,
      isWorkoutsEmpty: false,
      workouts: [
        {
          id: '1',
          name: 'Workout 1',
          description: 'Description 1',
          difficulty: WorkoutDifficulty.BEGINNER,
          createdAt: '2021-09-01T00:00:00.000Z',
          updatedAt: '2021-09-01T00:00:00.000Z',
        },
        {
          id: '2',
          name: 'Workout 2',
          description: 'Description 2',
          difficulty: WorkoutDifficulty.INTERMEDIATE,
          createdAt: '2021-09-02T00:00:00.000Z',
          updatedAt: '2021-09-02T00:00:00.000Z',
        },
        {
          id: '3',
          name: 'Workout 3',
          description: 'Description 3',
          difficulty: WorkoutDifficulty.ADVANCED,
          createdAt: '2021-09-03T00:00:00.000Z',
          updatedAt: '2021-09-03T00:00:00.000Z',
          image: 'image',
        },
      ],
    }))

    const { getByTestId } = render(<Workout />, { wrapper: Wrapper })

    expect(getByTestId('flash-list')).toBeDefined()

    await waitFor(() => expect(getByTestId('workout-list-item-0')).toBeTruthy())
  })

  it('should render flash list with data and dark color scheme', async () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })
    ;(useWorkout as jest.Mock).mockImplementation(() => ({
      ...useWorkoutMockValues,
      isWorkoutsEmpty: false,
      workouts: [
        {
          id: '1',
          name: 'Workout 1',
          description: 'Description 1',
          difficulty: WorkoutDifficulty.BEGINNER,
          createdAt: '2021-09-01T00:00:00.000Z',
          updatedAt: '2021-09-01T00:00:00.000Z',
        },
        {
          id: '2',
          name: 'Workout 2',
          description: 'Description 2',
          difficulty: WorkoutDifficulty.INTERMEDIATE,
          createdAt: '2021-09-02T00:00:00.000Z',
          updatedAt: '2021-09-02T00:00:00.000Z',
        },
        {
          id: '3',
          name: 'Workout 3',
          description: 'Description 3',
          difficulty: WorkoutDifficulty.ADVANCED,
          createdAt: '2021-09-03T00:00:00.000Z',
          updatedAt: '2021-09-03T00:00:00.000Z',
        },
      ],
    }))

    const { getByTestId } = render(<Workout />, { wrapper: Wrapper })

    expect(getByTestId('flash-list')).toBeDefined()

    await waitFor(() => expect(getByTestId('workout-list-item-0')).toBeTruthy())
  })

  it('should be able workout details when workout item is clicked', async () => {
    ;(useWorkout as jest.Mock).mockImplementation(() => ({
      ...useWorkoutMockValues,
      isWorkoutsEmpty: false,
      workouts: [
        {
          id: '1',
          name: 'Workout 1',
          description: 'Description 1',
          difficulty: WorkoutDifficulty.BEGINNER,
          createdAt: '2021-09-01T00:00:00.000Z',
          updatedAt: '2021-09-01T00:00:00.000Z',
        },
      ],
    }))

    const { getByTestId } = render(<Workout />, { wrapper: Wrapper })

    act(() => {
      const workoutItem = getByTestId('workout-list-item-0')
      fireEvent.press(workoutItem)
    })

    await waitFor(() =>
      expect(useWorkoutMockValues.handleOpenWorkoutDetails).toHaveBeenCalledWith('1'),
    )
  })
})
