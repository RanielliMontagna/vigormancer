import { v4 as uuidv4 } from 'uuid'

import {
  CreateUserInformation,
  UpdateUserInformation,
  UserInformation,
  UserInformationRepository,
} from '../userInformations'

import { db } from '@/db'

export class SqliteUserInformationsRepository implements UserInformationRepository {
  async getUserInformation(): Promise<UserInformation | undefined> {
    // Implement the logic to get user information from the database
    const userInformation = await db.getFirstAsync<UserInformation>('SELECT * FROM user_info')

    return userInformation || undefined
  }

  async createUserInformation({
    sex,
    age,
    weight,
    height,
    onboarding,
    goal,
  }: CreateUserInformation): Promise<void> {
    const id = uuidv4()

    await db.runAsync(
      'INSERT INTO user_info (id, sex, age, weight, height, goal, onboarding, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        id,
        sex,
        age,
        weight.toFixed(1),
        height,
        goal,
        onboarding,
        new Date().toISOString(),
        new Date().toISOString(),
      ],
    )
  }

  async updateUserInformation({
    sex,
    age,
    weight,
    height,
    goal,
    onboarding,
  }: UpdateUserInformation): Promise<void> {
    await db.runAsync(
      `UPDATE user_info
       SET sex = ?, age = ?, weight = ?, height = ?, goal = ?, onboarding = ?, updatedAt = ?`,
      [sex, age, weight, height, goal, onboarding, new Date().toISOString()],
    )
  }
}
