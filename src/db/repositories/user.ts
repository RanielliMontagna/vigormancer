export enum GoalEnum {
  LoseWeight = 1,
  BuildMuscle = 2,
  ImproveStamina = 3,
  ImproveHealth = 4,
  StayActive = 5,
}

export enum SexEnum {
  Male = 1,
  Female = 2,
}

export interface User {
  id: string
  username: string
  email: string
  sex: SexEnum
  goal: GoalEnum
  birthdate: Date
  onboarding: boolean
  createdAt: Date
  updatedAt: Date
}

export interface UserWeight {
  id: string
  userId: string
  weight: number
  recordedAt: Date
}

export interface UserHeight {
  id: string
  userId: string
  height: number
  recordedAt: Date
}

export type CreateUserParams = {
  clerkId: string
  username: string
  email: string
}

export interface OnboardingDataParams {
  sex: SexEnum
  birthdate: Date
  weight: number
  height: number
  goal: number
  userId: string
}

export interface UserRepository {
  createUser(user: CreateUserParams): Promise<{ id: string }>
  hasCompletedOnboarding(userId: string): Promise<boolean>
  completeOnboarding(data: OnboardingDataParams): Promise<void>
  updateHeight(userId: string, height: number): Promise<void>
  updateWeight(userId: string, weight: number): Promise<void>
}
