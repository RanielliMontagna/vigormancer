import { useUser } from '@clerk/clerk-expo'
import { getUserStreak, quantityFinishedSessionWorkout } from '@/db'

import { useCustomQuery } from '@/hooks'

export function useCards() {
  const { user } = useUser()

  const streakQuery = useCustomQuery({
    queryKey: ['streak'],
    queryFn: () => getUserStreak(user.id),
  })

  const workoutsFinishedQuery = useCustomQuery({
    queryKey: ['workoutsFinished'],
    queryFn: () => quantityFinishedSessionWorkout(user.id),
  })

  const streakCount = streakQuery.data?.currentStreak ?? 0

  return {
    streakCount,
    workoutsFinished: workoutsFinishedQuery.data ?? 0,
  }
}
