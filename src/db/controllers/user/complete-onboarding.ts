import { SqliteUserRepository } from '@/db/repositories/sqlite/sqlite-user-repository'
import { OnboardingDataParams } from '@/db/repositories/user'

export function completeOnboarding(onboardingData: OnboardingDataParams) {
  const userRepository = new SqliteUserRepository()

  return userRepository.completeOnboarding(onboardingData)
}
