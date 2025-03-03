import { SqliteSessionWorkoutRepository } from '@/db/repositories/sqlite/sqlite-session-workout-repository'

export function getLastSessions(userId: string) {
  const sessionWorkoutRepository = new SqliteSessionWorkoutRepository()

  return sessionWorkoutRepository.getLastSessions(userId)
}
