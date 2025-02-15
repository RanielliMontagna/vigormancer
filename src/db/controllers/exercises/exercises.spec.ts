import { ExerciseType } from '@/db/repositories/exercises'
import { createExercise, deleteExercise, fetchExercises, getExercise, updateExercise } from '.'

jest.mock('@/db', () => ({
  db: {
    runAsync: jest.fn().mockResolvedValue(true),
    getAllAsync: jest.fn().mockResolvedValue([]),
    getFirstAsync: jest.fn().mockResolvedValue({ id: '1', exerciseName: 'Exercise', type: 0 }),
  },
}))

describe('@db/controllers/exercises', () => {
  describe('createExercise', () => {
    it('should call createExercise with correct values', async () => {
      const createExerciseSpy = jest.fn(createExercise)

      await createExerciseSpy({
        id: 1,
        categoryId: '1',
        exerciseName: 'Exercise',
        type: ExerciseType.STRENGTH,
      })

      expect(createExerciseSpy).toHaveBeenCalledWith({
        categoryId: '1',
        exerciseName: 'Exercise',
        id: 1,
        type: ExerciseType.STRENGTH,
      })
    })
  })

  describe('deleteExercise', () => {
    it('should call deleteExercise with correct values', async () => {
      const deleteExerciseSpy = jest.fn(deleteExercise)

      await deleteExerciseSpy({ id: 1 })

      expect(deleteExerciseSpy).toHaveBeenCalledWith({ id: 1 })
    })
  })

  describe('fetchExercises', () => {
    it('should call fetchExercises with correct values', async () => {
      const fetchExercisesSpy = jest.fn(fetchExercises)

      await fetchExercisesSpy()

      expect(fetchExercisesSpy).toHaveBeenCalledWith()
    })
  })

  describe('getExercise', () => {
    it('should call getExercise with correct values', async () => {
      const getExerciseSpy = jest.fn(getExercise)

      await getExerciseSpy({ id: '1' })

      expect(getExerciseSpy).toHaveBeenCalledWith({ id: '1' })
    })
  })

  describe('updateExercise', () => {
    it('should call updateExercise with correct values', async () => {
      const updateExerciseSpy = jest.fn(updateExercise)

      await updateExerciseSpy({
        id: 1,
        exerciseName: 'Exercise',
        type: ExerciseType.STRENGTH,
      })

      expect(updateExerciseSpy).toHaveBeenCalledWith({
        id: 1,
        exerciseName: 'Exercise',
        type: ExerciseType.STRENGTH,
      })
    })
  })
})
