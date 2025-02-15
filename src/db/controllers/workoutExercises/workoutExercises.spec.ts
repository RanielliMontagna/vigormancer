import {
  createWorkoutExercise,
  deleteWorkoutExercise,
  fetchWorkoutExercises,
  getWorkoutExercise,
  updateWorkoutExercise,
} from '.'

const mockData = {
  exerciseId: 1,
  sets: 3,
  repetitions: 10,
  rest: 60,
  weight: 50,
  workoutId: '1',
}

jest.mock('@/db', () => ({
  db: {
    runAsync: jest.fn().mockResolvedValue(true),
    getAllAsync: jest.fn().mockResolvedValue([]),
    getFirstAsync: jest.fn().mockResolvedValue(mockData),
  },
}))

describe('@db/controllers/workoutExercises', () => {
  describe('createWorkoutExercise', () => {
    it('should call createWorkoutExercise with correct values', async () => {
      const createWorkoutExerciseSpy = jest.fn(createWorkoutExercise)

      await createWorkoutExerciseSpy(mockData)

      expect(createWorkoutExerciseSpy).toHaveBeenCalledWith(mockData)
    })
  })

  describe('deleteWorkoutExercise', () => {
    it('should call deleteWorkoutExercise with correct values', async () => {
      const deleteWorkoutExerciseSpy = jest.fn(deleteWorkoutExercise)

      await deleteWorkoutExerciseSpy({ workoutExerciseId: '1' })

      expect(deleteWorkoutExerciseSpy).toHaveBeenCalledWith({ workoutExerciseId: '1' })
    })
  })

  describe('fetchWorkoutExercises', () => {
    it('should call fetchWorkoutExercises with correct values', async () => {
      const fetchWorkoutExercisesSpy = jest.fn(fetchWorkoutExercises)

      await fetchWorkoutExercisesSpy({ workoutId: '1' })

      expect(fetchWorkoutExercisesSpy).toHaveBeenCalledWith({ workoutId: '1' })
    })
  })

  describe('getWorkoutExercise', () => {
    it('should call getWorkoutExercise with correct values', async () => {
      const getWorkoutExerciseSpy = jest.fn(getWorkoutExercise)

      await getWorkoutExerciseSpy({ id: '1' })

      expect(getWorkoutExerciseSpy).toHaveBeenCalledWith({ id: '1' })
    })
  })

  describe('updateWorkoutExercise', () => {
    it('should call updateWorkoutExercise with correct values', async () => {
      const updateWorkoutExerciseSpy = jest.fn(updateWorkoutExercise)

      await updateWorkoutExerciseSpy({ id: '1', ...mockData })

      expect(updateWorkoutExerciseSpy).toHaveBeenCalledWith({ id: '1', ...mockData })
    })
  })
})
