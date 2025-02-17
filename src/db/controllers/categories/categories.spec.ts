import { createCategory, deleteCategory, fetchCategories, getCategory, updateCategory } from '.'

jest.mock('@/db', () => ({
  db: {
    runAsync: jest.fn().mockResolvedValue(true),
    getAllAsync: jest.fn().mockResolvedValue([]),
    getFirstAsync: jest
      .fn()
      .mockResolvedValue({ id: '1', name: 'Category', description: 'Description' }),
  },
}))

describe('@db/controllers/categories', () => {
  describe('createCategory', () => {
    it('should call createCategory with correct values', async () => {
      const createCategorySpy = jest.fn(createCategory)

      await createCategorySpy({
        name: 'Category',
        description: 'Description',
      })

      expect(createCategorySpy).toHaveBeenCalledWith({
        name: 'Category',
        description: 'Description',
      })
    })
  })

  describe('deleteCategory', () => {
    it('should call deleteCategory with correct values', async () => {
      const deleteCategorySpy = jest.fn(deleteCategory)

      await deleteCategorySpy({ id: '1' })

      expect(deleteCategorySpy).toHaveBeenCalledWith({ id: '1' })
    })
  })

  describe('fetchCategories', () => {
    it('should call fetchCategories with correct values', async () => {
      const fetchCategoriesSpy = jest.fn(fetchCategories)

      await fetchCategoriesSpy()

      expect(fetchCategoriesSpy).toHaveBeenCalledWith()
    })
  })

  describe('getCategory', () => {
    it('should call getCategory with correct values', async () => {
      const getCategorySpy = jest.fn(getCategory)

      await getCategorySpy({ id: '1' })

      expect(getCategorySpy).toHaveBeenCalledWith({ id: '1' })
    })
  })

  describe('updateCategory', () => {
    it('should call updateCategory with correct values', async () => {
      const updateCategorySpy = jest.fn(updateCategory)

      await updateCategorySpy({
        id: '1',
        name: 'Category',
        description: 'Description',
      })

      expect(updateCategorySpy).toHaveBeenCalledWith({
        id: '1',
        name: 'Category',
        description: 'Description',
      })
    })
  })
})
