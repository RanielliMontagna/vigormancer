import { v4 as uuidv4 } from 'uuid'
import { db } from '@/db'
import { UserStreak, UserStreakRepository } from '../userStreak'

export class SqliteUserStreakRepository implements UserStreakRepository {
  async createStreak(userId: string): Promise<{ id: string }> {
    const id = uuidv4()

    await db.runAsync(
      'INSERT INTO user_streaks (id, userId, currentStreak, longestStreak) VALUES (?, ?, ?, ?)',
      [id, userId, 0, 0],
    )

    return { id }
  }

  async getStreak(userId: string): Promise<UserStreak> {
    return await db.getFirstAsync<UserStreak>('SELECT * FROM user_streaks WHERE userId = ?', [
      userId,
    ])
  }

  async incrementStreak(userId: string): Promise<void> {
    await db.runAsync(
      'UPDATE user_streaks SET currentStreak = currentStreak + 1 WHERE userId = ?',
      [userId],
    )

    await db.runAsync(
      'UPDATE user_streaks SET longestStreak = GREATEST(longestStreak, currentStreak) WHERE userId = ?',
      [userId],
    )
  }

  async resetStreak(userId: string): Promise<void> {
    await db.runAsync('UPDATE user_streaks SET currentStreak = 0 WHERE userId = ?', [userId])
  }

  async updateLastWorkoutDate(userId: string, date: string): Promise<void> {
    await db.runAsync('UPDATE user_streaks SET lastWorkoutDate = ? WHERE userId = ?', [
      date,
      userId,
    ])
  }
}
