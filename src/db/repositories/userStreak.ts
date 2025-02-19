export interface UserStreak {
  id: string
  userId: string
  currentStreak: number
  longestStreak: number
  lastWorkoutDate?: string
}

export interface UserStreakRepository {
  createStreak(userId: string): Promise<{ id: string }>
  getStreak(userId: string): Promise<UserStreak>
  incrementStreak(userId: string): Promise<void>
  resetStreak(userId: string): Promise<void>
  updateLastWorkoutDate(userId: string, date: string): Promise<void>
}
