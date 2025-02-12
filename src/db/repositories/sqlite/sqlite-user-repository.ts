import { v4 as uuidv4 } from 'uuid'

import {
  CreateUserParams,
  OnboardingDataParams,
  User,
  UserHeight,
  UserHistoryWeightReturn,
  UserRepository,
  UserWeight,
  UserWeightReturn,
} from '../user'

import { db } from '@/db'

export class SqliteUserRepository implements UserRepository {
  async createUser(user: CreateUserParams): Promise<{ id: string }> {
    const id = uuidv4()

    await db.runAsync(
      'INSERT INTO users (id, username, email, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)',
      [user.clerkId, user.username, user.email, new Date().toISOString(), new Date().toISOString()],
    )

    return { id }
  }

  async hasCompletedOnboarding(userId: string): Promise<boolean> {
    const user = await db.getFirstAsync<User>('SELECT * FROM users WHERE id = ?', [userId])

    if (!user) return false

    return Boolean(user.onboarding)
  }

  async updateHeight(userId: string, height: number): Promise<void> {
    await db.runAsync('INSERT INTO user_height (userId, height, recordedAt) VALUES (?, ?, ?)', [
      userId,
      height,
      new Date().toISOString(),
    ])
  }

  async updateWeight(userId: string, weight: number): Promise<void> {
    const lastWeight = await db.getFirstAsync<UserWeight>(
      'SELECT * FROM user_weight WHERE userId = ? ORDER BY recordedAt DESC LIMIT 1',
      [userId],
    )

    await db.runAsync(
      'INSERT INTO user_weight (userId, current, heaviest, lightest, recordedAt) VALUES (?, ?, ?, ?, ?)',
      [
        userId,
        weight,
        Math.max(weight, lastWeight?.heaviest || weight),
        Math.min(weight, lastWeight?.lightest || weight),
        new Date().toISOString(),
      ],
    )
  }

  async completeOnboarding({
    birthdate,
    goal,
    height,
    sex,
    userId,
    weight,
  }: OnboardingDataParams): Promise<void> {
    const user = await db.getFirstAsync<User>('SELECT * FROM users WHERE id = ?', [userId])

    if (!user) {
      throw new Error('User not found')
    }

    await db.runAsync(
      `UPDATE users
       SET sex = ?, birthdate = ?, goal = ?, onboarding = 1 
       WHERE id = ?`,
      [sex, birthdate.toISOString(), goal, userId],
    )

    await db.runAsync(
      'INSERT INTO user_weight (userId, current, heaviest, lightest, recordedAt) VALUES (?, ?, ?, ?, ?)',
      [userId, weight, weight, weight, new Date().toISOString()],
    )

    await db.runAsync('INSERT INTO user_height (userId, height, recordedAt) VALUES (?, ?, ?)', [
      userId,
      height,
      new Date().toISOString(),
    ])
  }

  async getUserById(userId: string): Promise<User> {
    const user = await db.getFirstAsync<User>('SELECT * FROM users WHERE id = ?', [userId])

    return user
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await db.getFirstAsync<User>('SELECT * FROM users WHERE email = ?', [email])

    return user
  }

  async getLatestUserWeight(userId: string): Promise<UserWeightReturn> {
    const { current, heaviest, lightest } = await db.getFirstAsync<UserWeight>(
      'SELECT * FROM user_weight WHERE userId = ? ORDER BY recordedAt DESC LIMIT 1',
      [userId],
    )

    return { current, heaviest, lightest }
  }

  async getHistoryUserWeight(userId: string): Promise<UserHistoryWeightReturn[]> {
    const weights = await db.getAllAsync<UserWeight>(
      `SELECT current, recordedAt
       FROM user_weight
       WHERE userId = ?
       ORDER BY recordedAt DESC
       LIMIT 7`,
      [userId],
    )

    return weights.map(({ current, recordedAt }) => ({ weight: current, recordedAt }))
  }

  async getUserHeight(userId: string) {
    const lastHeight = await db.getFirstAsync<UserHeight>(
      'SELECT * FROM user_height WHERE userId = ? ORDER BY recordedAt DESC LIMIT 1',
      [userId],
    )

    return lastHeight?.height
  }
}
