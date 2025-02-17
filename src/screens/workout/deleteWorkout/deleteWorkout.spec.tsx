import { renderWithProviders } from '@/utils/test/test-utils'

import { DeleteWorkoutDialog } from './deleteWorkout'
import { WorkoutDifficulty } from '@/db/repositories/workouts'
import { useColorScheme } from '@/hooks'

const mockUseColorScheme = useColorScheme as jest.Mock

describe('DeleteWorkoutDialog', () => {
  it('should render correctly', async () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: false })

    const workout = {
      id: '1',
      name: 'Workout 1',
      description: 'Description 1',
      difficulty: WorkoutDifficulty.BEGINNER,
      image: '',
      exercises: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const handleDeleteWorkout = jest.fn()

    const { getByText } = renderWithProviders(
      <DeleteWorkoutDialog workout={workout} handleDeleteWorkout={handleDeleteWorkout} />,
    )

    expect(getByText('workout.workoutDetails.delete')).toBeDefined()
  })

  it('should render with dark color scheme', async () => {
    mockUseColorScheme.mockReturnValue({ isDarkColorScheme: true })

    const workout = {
      id: '1',
      name: 'Workout 1',
      description: 'Description 1',
      difficulty: WorkoutDifficulty.BEGINNER,
      image: '',
      exercises: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const handleDeleteWorkout = jest.fn()

    const { getByText } = renderWithProviders(
      <DeleteWorkoutDialog workout={workout} handleDeleteWorkout={handleDeleteWorkout} />,
    )

    expect(getByText('workout.workoutDetails.delete')).toBeDefined()
  })
})
