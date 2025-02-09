export interface UserInformation {
  id: string
  sex: string
  age: number
  weight: number
  height: number
  goal: number
  onboarding: boolean
  createdAt: string
  updatedAt: string
}

export type CreateUserInformation = Omit<UserInformation, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateUserInformation = Omit<Partial<UserInformation>, 'createdAt' | 'updatedAt'>

export interface UserInformationRepository {
  getUserInformation(id: string): Promise<UserInformation | undefined>
  createUserInformation(userInformation: CreateUserInformation): Promise<void>
  updateUserInformation(userInformation: UpdateUserInformation): Promise<void>
}
