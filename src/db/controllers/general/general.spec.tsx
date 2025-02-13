import { getDatabaseVersion } from './get-db-version'

jest.mock('@/db', () => ({
  db: {
    getFirstAsync: jest.fn().mockResolvedValue({ id: '1' }),
  },
}))

describe('@db/controllers/general', () => {
  describe('getDatabaseVersion', () => {
    it('should call getDatabaseVersion with correct values', async () => {
      const getDatabaseVersionSpy = jest.fn(getDatabaseVersion)

      await getDatabaseVersionSpy()

      expect(getDatabaseVersionSpy).toHaveBeenCalledWith()
    })
  })
})
