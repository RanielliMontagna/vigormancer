import { router } from 'expo-router'

import { useWorkout } from './useWorkout'
import { renderHookWithProviders } from '@/utils'

describe('useWorkout', () => {
  it('should return the correct values', async () => {
    const { result } = renderHookWithProviders(useWorkout)

    expect(result.current.t).toBeDefined()
    expect(result.current.workouts).toBeUndefined()
    expect(result.current.isLoading).toBe(true)
    expect(result.current.isWorkoutsEmpty).toBe(false)
    expect(result.current.refetch).toBeDefined()
    expect(result.current.handleAddWorkout).toBeDefined()
    expect(result.current.handleOpenWorkoutDetails).toBeDefined()
  })

  it('should call router.push when handleAddWorkout is called', async () => {
    jest.spyOn(router, 'push')

    const { result } = renderHookWithProviders(useWorkout)

    await result.current.handleAddWorkout()

    expect(router.push).toHaveBeenCalledWith('(private)/workouts/create-workout')
  })

  it('should call router.push when handleOpenWorkoutDetails is called', async () => {
    jest.spyOn(router, 'push')

    const { result } = renderHookWithProviders(useWorkout)

    await result.current.handleOpenWorkoutDetails('1')

    expect(router.push).toHaveBeenCalledWith('(private)/workouts/1')
  })
})
