import { v4 as uuidv4 } from 'uuid'

import { CreateUserParams, OnboardingDataParams, User, UserRepository } from '../user'

import { db } from '@/db'

export class SqliteUserRepository implements UserRepository {
  async createUser(user: CreateUserParams): Promise<{ id: string }> {
    const id = uuidv4()

    await db.runAsync(
      'INSERT INTO users (id, username, email, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)',
      [id, user.username, user.email, new Date().toISOString(), new Date().toISOString()],
    )

    return { id }
  }

  async hasCompletedOnboarding(userId: string): Promise<boolean> {
    const user = db.getFirstAsync<User>('SELECT * FROM users WHERE id = ?', [userId])

    return user.then((u) => u.onboarding)
  }

  async completeOnboarding({
    birthdate,
    goal,
    height,
    sex,
    userId,
    weight,
  }: OnboardingDataParams): Promise<void> {
    await db.runAsync(
      `UPDATE users
       SET sex = ?, birthdate = ?, goal = ?, onboarding = 1 
       WHERE id = ?`,
      [sex, birthdate.toISOString(), goal, userId],
    )

    await db.runAsync('INSERT INTO user_weight (userId, weight, recordedAt) VALUES (?, ?, ?)', [
      userId,
      weight,
      new Date().toISOString(),
    ])

    await db.runAsync('INSERT INTO user_height (userId, height, recordedAt) VALUES (?, ?, ?)', [
      userId,
      height,
      new Date().toISOString(),
    ])
  }

  async updateHeight(userId: string, height: number): Promise<void> {
    await db.runAsync('INSERT INTO user_height (userId, height, recordedAt) VALUES (?, ?, ?)', [
      userId,
      height,
      new Date().toISOString(),
    ])
  }

  async updateWeight(userId: string, weight: number): Promise<void> {
    await db.runAsync('INSERT INTO user_weight (userId, weight, recordedAt) VALUES (?, ?, ?)', [
      userId,
      weight,
      new Date().toISOString(),
    ])
  }
}
