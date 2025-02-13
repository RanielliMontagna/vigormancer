import { renderHook } from '@testing-library/react-native'

import { useExerciseCard } from './useExerciseCard'
import { act } from 'react'

jest.mock('@/db', () => ({
  deleteWorkoutExercise: jest.fn(),
}))

const mockProps = {
  id: '1',
  workoutId: '1',
  categoryId: '1',
  categoryName: 'Chest',
  exerciseId: 1,
  exerciseName: 'Bench Press',
  repetitions: 10,
  sets: 3,
  weight: 60,
  rest: 60,
  updatedAt: '2021-09-01T00:00:00.000Z',
  createdAt: '2021-09-01T00:00:00.000Z',
}

describe('useExerciseCard', () => {
  it('should return the correct values', () => {
    const { result } = renderHook(() => useExerciseCard(mockProps))

    expect(result.current.t).toBeDefined()
  })

  it('should be able to edit the exercise', () => {
    const { result } = renderHook(() => useExerciseCard(mockProps))

    act(() => {
      result.current.handleEditExercise()
    })

    expect(result.current.handleEditExercise).toBeDefined()
  })

  it('should be able to remove the exercise', () => {
    const { result } = renderHook(() => useExerciseCard(mockProps))

    act(() => {
      result.current.handleRemoveExercise()
    })

    expect(result.current.handleRemoveExercise).toBeDefined()
  })
})
