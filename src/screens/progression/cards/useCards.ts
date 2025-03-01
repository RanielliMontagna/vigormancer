import { useQuery } from '@tanstack/react-query'
import { useUser } from '@clerk/clerk-expo'
import { getUserStreak, quantityFinishedSessionWorkout } from '@/db'

export function useCards() {
  const { user } = useUser()

  const streakQuery = useQuery({
    queryKey: ['streak'],
    queryFn: () => getUserStreak(user.id),
    gcTime: 0,
  })

  const workoutsFinishedQuery = useQuery({
    queryKey: ['workoutsFinished'],
    queryFn: () => quantityFinishedSessionWorkout(user.id),
  })

  const streakCount = streakQuery.data?.currentStreak ?? 0

  return {
    streakCount,
    workoutsFinished: workoutsFinishedQuery.data ?? 0,
  }
}
