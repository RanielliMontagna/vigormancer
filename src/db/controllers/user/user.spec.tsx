import { GoalEnum, SexEnum } from '@/db/repositories/user'
import {
  completeOnboarding,
  createUser,
  getHeight,
  getHistoryWeight,
  getLatestWeight,
  getUserByEmail,
  getUserById,
  hasCompleteOnboarding,
  updateUserHeight,
  updateUserWeight,
} from '.'

jest.mock('@/db', () => ({
  db: {
    runAsync: jest.fn().mockResolvedValue(true),
    getFirstAsync: jest.fn().mockResolvedValue({ id: '1' }),
    getAllAsync: jest.fn().mockResolvedValue([]),
  },
}))

describe('@db/controllers/user', () => {
  describe('completeOnboarding', () => {
    it('should call completeOnboarding with correct values', async () => {
      const completeOnboardingSpy = jest.fn(completeOnboarding)

      const onboardingData = {
        userId: '1',
        birthdate: new Date('1996-01-01'),
        weight: 70,
        height: 180,
        goal: GoalEnum.BuildMuscle,
        sex: SexEnum.Male,
      }

      await completeOnboardingSpy(onboardingData)
      expect(completeOnboardingSpy).toHaveBeenCalledWith(onboardingData)
    })
  })

  describe('createUser', () => {
    it('should call createUser with correct values', async () => {
      const createUserSpy = jest.fn(createUser)

      const user = {
        clerkId: '1',
        email: 'john@doe.com',
        username: 'John Doe',
      }

      await createUserSpy(user)

      expect(createUserSpy).toHaveBeenCalledWith(user)
    })
  })

  describe('getHeight', () => {
    it('should call getHeight with correct values', async () => {
      const getHeightSpy = jest.fn(getHeight)

      await getHeightSpy('1')

      expect(getHeightSpy).toHaveBeenCalledWith('1')
    })
  })

  describe('getHistoryWeight', () => {
    it('should call getHistoryWeight with correct values', async () => {
      const getHistoryWeightSpy = jest.fn(getHistoryWeight)

      await getHistoryWeightSpy('1')

      expect(getHistoryWeightSpy).toHaveBeenCalledWith('1')
    })
  })

  describe('getLatestWeight', () => {
    it('should call getLatestWeight with correct values', async () => {
      const getLatestWeightSpy = jest.fn(getLatestWeight)

      await getLatestWeightSpy('1')

      expect(getLatestWeightSpy).toHaveBeenCalledWith('1')
    })
  })

  describe('getUserByEmail', () => {
    it('should call getUserByEmail with correct values', async () => {
      const getUserByEmailSpy = jest.fn(getUserByEmail)

      await getUserByEmailSpy('john@doe.com')

      expect(getUserByEmailSpy).toHaveBeenCalledWith('john@doe.com')
    })
  })

  describe('getUserById', () => {
    it('should call getUserById with correct values', async () => {
      const getUserByIdSpy = jest.fn(getUserById)

      await getUserByIdSpy('1')

      expect(getUserByIdSpy).toHaveBeenCalledWith('1')
    })
  })

  describe('hasCompleteOnboarding', () => {
    it('should call hasCompleteOnboarding with correct values', async () => {
      const hasCompleteOnboardingSpy = jest.fn(hasCompleteOnboarding)

      await hasCompleteOnboardingSpy('1')

      expect(hasCompleteOnboardingSpy).toHaveBeenCalledWith('1')
    })
  })

  describe('updateUserHeight', () => {
    it('should call updateUserHeight with correct values', async () => {
      const updateUserHeightSpy = jest.fn(updateUserHeight)

      await updateUserHeightSpy({ height: 180, userId: '1' })

      expect(updateUserHeightSpy).toHaveBeenCalledWith({ height: 180, userId: '1' })
    })
  })

  describe('updateUserWeight', () => {
    it('should call updateUserWeight with correct values', async () => {
      const updateUserWeightSpy = jest.fn(updateUserWeight)

      await updateUserWeightSpy({ weight: 70, userId: '1' })

      expect(updateUserWeightSpy).toHaveBeenCalledWith({ weight: 70, userId: '1' })
    })
  })
})
