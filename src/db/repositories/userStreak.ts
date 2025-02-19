export interface UserStreak {
  id: string
  userId: string
  currentStreak: number
  longestStreak: number
  lastWorkoutDate?: string
}

export interface UserStreakRepository {
  createStreak(userId: string): Promise<UserStreak>
  getStreak(userId: string): Promise<UserStreak>
  incrementStreak(userId: string, date: string): Promise<{ currentStreak: number }>
  resetStreak(userId: string): Promise<void>
}
