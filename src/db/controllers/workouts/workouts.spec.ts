import { WorkoutDifficulty } from '@/db/repositories/workouts'
import { createWorkout, deleteWorkout, fetchWorkouts, getWorkout, updateWorkout } from '.'

jest.mock('@/db', () => ({
  db: {
    runAsync: jest.fn().mockResolvedValue(true),
    getAllAsync: jest.fn().mockResolvedValue([]),
    getFirstAsync: jest
      .fn()
      .mockResolvedValue({ id: '1', name: 'Workout', description: 'Description', difficulty: 2 }),
  },
  fetchWorkoutExercises: jest.fn().mockResolvedValue([]),
}))

describe('@db/controllers/workouts', () => {
  describe('createWorkout', () => {
    it('should call createWorkout with correct values', async () => {
      const createWorkoutSpy = jest.fn(createWorkout)

      await createWorkoutSpy({
        name: 'Workout',
        description: 'Description',
        difficulty: WorkoutDifficulty.ADVANCED,
      })

      expect(createWorkoutSpy).toHaveBeenCalledWith({
        name: 'Workout',
        description: 'Description',
        difficulty: WorkoutDifficulty.ADVANCED,
      })
    })
  })

  describe('deleteWorkout', () => {
    it('should call deleteWorkout with correct values', async () => {
      const deleteWorkoutSpy = jest.fn(deleteWorkout)

      await deleteWorkoutSpy({ id: '1' })

      expect(deleteWorkoutSpy).toHaveBeenCalledWith({ id: '1' })
    })
  })

  describe('fetchWorkouts', () => {
    it('should call fetchWorkouts with correct values', async () => {
      const fetchWorkoutsSpy = jest.fn(fetchWorkouts)

      await fetchWorkoutsSpy()

      expect(fetchWorkoutsSpy).toHaveBeenCalledWith()
    })
  })

  describe('getWorkout', () => {
    it('should call getWorkout with correct values', async () => {
      const getWorkoutSpy = jest.fn(getWorkout)

      await getWorkoutSpy({ id: '1' })

      expect(getWorkoutSpy).toHaveBeenCalledWith({ id: '1' })
    })
  })

  describe('updateWorkout', () => {
    it('should call updateWorkout with correct values', async () => {
      const updateWorkoutSpy = jest.fn(updateWorkout)

      await updateWorkoutSpy({
        id: '1',
        name: 'Workout',
        description: 'Description',
        difficulty: WorkoutDifficulty.ADVANCED,
      })

      expect(updateWorkoutSpy).toHaveBeenCalledWith({
        id: '1',
        name: 'Workout',
        description: 'Description',
        difficulty: WorkoutDifficulty.ADVANCED,
      })
    })
  })
})
