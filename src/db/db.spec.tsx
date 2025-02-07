import { SQLiteDatabase } from 'expo-sqlite'
import { createCategory, createExercise, fetchCategories, migrateDbIfNeeded } from '.'

jest.mock('@/db/controllers/categories/create-category', () => ({
  createCategory: jest.fn(),
}))

jest.mock('@/db/controllers/categories/fetch-categories', () => ({
  fetchCategories: jest.fn(),
}))

jest.mock('@/db/controllers/exercises/create-exercise', () => ({
  createExercise: jest.fn(),
}))

describe('db', () => {
  beforeAll(() => {
    jest.clearAllMocks()
    ;(createCategory as jest.Mock).mockImplementation(() => Promise.resolve({ id: 1 }))
    ;(fetchCategories as jest.Mock).mockImplementation(() =>
      Promise.resolve([
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
      ]),
    )
    ;(createExercise as jest.Mock).mockImplementation(() => Promise.resolve({ id: 1 }))
  })

  it('should be able to migrate the database', () => {
    // Arrange
    const db = {
      getFirstAsync: jest.fn().mockResolvedValue({ user_version: 0 }),
      execAsync: jest.fn(),
    } as unknown as SQLiteDatabase

    migrateDbIfNeeded(db)

    expect(db.getFirstAsync).toHaveBeenCalledWith('PRAGMA user_version')
  })

  it('should not migrate the database if it is already up to date', () => {
    // Arrange
    const db = {
      getFirstAsync: jest.fn().mockResolvedValue({ user_version: 1 }),
      execAsync: jest.fn(),
    } as unknown as SQLiteDatabase

    migrateDbIfNeeded(db)

    expect(db.getFirstAsync).toHaveBeenCalledWith('PRAGMA user_version')

    migrateDbIfNeeded(db)

    expect(db.execAsync).not.toHaveBeenCalled()
  })

  it('if currentDbVersion is 0, it should execute the migration script', () => {
    // Arrange
    const db = {
      getFirstAsync: jest.fn().mockResolvedValue({ user_version: 0 }),
      execAsync: jest.fn(),
    } as unknown as SQLiteDatabase

    migrateDbIfNeeded(db)

    expect(db.getFirstAsync).toHaveBeenCalledWith('PRAGMA user_version')
  })
})
