import { EditWorkoutExercise } from './editWorkoutExercise'
import { updateWorkoutExercise, getWorkoutExercise } from '@/db'
import { WorkoutExerciseWithCategory } from '@/db/repositories/workoutExercises'
import { act } from 'react'
import { fireEvent, renderWithProviders } from '@/utils'

jest.mock('@/db', () => ({
  updateWorkoutExercise: jest.fn(),
  getWorkoutExercise: jest.fn(),
}))

describe('EditWorkoutExercise', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(updateWorkoutExercise as jest.Mock).mockImplementation(() => {})
  })
  it('should be able to render', async () => {
    const { getByTestId } = renderWithProviders(<EditWorkoutExercise />)

    expect(getByTestId('edit-workout-exercise')).toBeDefined()
  })

  it('should be able to update workout exercise', async () => {
    ;(getWorkoutExercise as jest.Mock).mockImplementationOnce(() => {
      return {
        id: '1',
        exerciseName: 'exerciseName',
        sets: 3,
        repetitions: 10,
      } as WorkoutExerciseWithCategory
    })

    const { getByTestId } = renderWithProviders(<EditWorkoutExercise />)

    await act(async () => {
      fireEvent.changeText(getByTestId('sets'), '5')
      fireEvent.changeText(getByTestId('repetitions'), '15')
      fireEvent.press(getByTestId('submit'))
    })
  })

  it('should be able to render with rest', async () => {
    ;(getWorkoutExercise as jest.Mock).mockImplementationOnce(() => {
      return {
        id: '1',
        exerciseName: 'exerciseName',
        sets: 3,
        repetitions: 10,
        rest: 60,
      } as WorkoutExerciseWithCategory
    })

    const { getByTestId } = renderWithProviders(<EditWorkoutExercise />)

    expect(getByTestId('edit-workout-exercise')).toBeDefined()
  })
})
