import { v4 as uuidv4 } from 'uuid'
import { db } from '@/db'
import { UserStreak, UserStreakRepository } from '../userStreak'
import dayjs from 'dayjs'

export class SqliteUserStreakRepository implements UserStreakRepository {
  async createStreak(userId: string): Promise<UserStreak> {
    const id = uuidv4()

    await db.runAsync(
      'INSERT INTO user_streaks (id, userId, currentStreak, longestStreak) VALUES (?, ?, ?, ?)',
      [id, userId, 0, 0],
    )

    return { id, userId, currentStreak: 0, longestStreak: 0 }
  }

  async getStreak(userId: string): Promise<UserStreak> {
    const userStreak = await db.getFirstAsync<UserStreak>(
      'SELECT * FROM user_streaks WHERE userId = ?',
      [userId],
    )

    if (userStreak) return userStreak

    return await this.createStreak(userId)
  }

  async incrementStreak(userId: string, date: string): Promise<{ currentStreak: number }> {
    const userStreak = await this.getStreak(userId)

    const lastWorkoutDate = dayjs(userStreak.lastWorkoutDate).format('YYYY-MM-DD')
    const dateFormatted = dayjs(date).format('YYYY-MM-DD')

    if (lastWorkoutDate === dateFormatted) return { currentStreak: userStreak.currentStreak }

    const currentStreak = userStreak.currentStreak + 1

    if (currentStreak > userStreak.longestStreak) {
      await db.runAsync(
        'UPDATE user_streaks SET currentStreak = ?, longestStreak = ? WHERE userId = ?',
        [currentStreak, currentStreak, userId],
      )
    } else {
      await db.runAsync('UPDATE user_streaks SET currentStreak = ? WHERE userId = ?', [
        currentStreak,
        userId,
      ])
    }

    await db.runAsync('UPDATE user_streaks SET lastWorkoutDate = ? WHERE userId = ?', [
      dateFormatted,
      userId,
    ])

    return { currentStreak }
  }

  async resetStreak(userId: string): Promise<{ streakReset: boolean }> {
    const userStreak = await this.getStreak(userId)

    const qtdDaysSinceLastWorkout = dayjs().diff(dayjs(userStreak.lastWorkoutDate), 'day')

    if (qtdDaysSinceLastWorkout > 1) {
      await db.runAsync('UPDATE user_streaks SET currentStreak = 0 WHERE userId = ?', [userId])

      return { streakReset: true }
    }

    return { streakReset: false }
  }
}
