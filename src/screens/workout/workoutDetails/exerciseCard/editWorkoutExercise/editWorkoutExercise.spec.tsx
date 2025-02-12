import { fireEvent, render } from '@testing-library/react-native'
import { Wrapper } from '@/utils/test/test-utils'

import { EditWorkoutExercise } from './editWorkoutExercise'
import { updateWorkoutExercise, getWorkoutExercise } from '@/db'
import { WorkoutExerciseWithCategory } from '@/db/repositories/workoutExercises'
import { act } from 'react'

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
    const { getByTestId } = render(<EditWorkoutExercise />, { wrapper: Wrapper })

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

    const { getByTestId } = render(<EditWorkoutExercise />, { wrapper: Wrapper })

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

    const { getByTestId } = render(<EditWorkoutExercise />, { wrapper: Wrapper })

    expect(getByTestId('edit-workout-exercise')).toBeDefined()
  })
})
