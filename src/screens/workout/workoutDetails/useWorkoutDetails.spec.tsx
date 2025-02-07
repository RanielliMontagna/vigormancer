import { renderHook } from '@testing-library/react-native'
import { Wrapper } from '@/utils/test/test-utils'

import { useWorkoutDetails } from './useWorkoutDetails'
import { WorkoutDifficulty, WorkoutWithExercises } from '@/db/repositories/workouts'

import { deleteWorkout, getWorkout } from '@/db'
import { router } from 'expo-router'

jest.mock('@/db', () => ({
  getWorkout: jest.fn(),
  deleteWorkout: jest.fn(),
}))

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

describe('useWorkoutDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(getWorkout as jest.Mock).mockImplementationOnce(async () => responseMock)
    ;(deleteWorkout as jest.Mock).mockImplementationOnce(async () => {})
  })
  it('should call router.push when handleGoToAddExercise is called', async () => {
    jest.spyOn(router, 'push')

    const { result } = renderHook(() => useWorkoutDetails(), { wrapper: Wrapper })

    await result.current.handleGoToAddExercise()

    expect(router.push).toHaveBeenCalledWith('(private)/workouts/1/add-exercise')
  })

  it('should call deleteWorkout and router.back when handleDeleteWorkout is called', async () => {
    jest.spyOn(router, 'back')

    const { result } = renderHook(() => useWorkoutDetails(), { wrapper: Wrapper })

    await result.current.handleDeleteWorkout()

    expect(deleteWorkout).toHaveBeenCalledWith({ id: '1' })
    expect(router.back).toHaveBeenCalled()
  })
})
