import { SqliteCategoriesRepository } from '@/db/repositories/sqlite/sqlite-categories-repository'
import { CreateCategoryParams } from '@/db/repositories/categories'

export function createCategory(params: CreateCategoryParams) {
  const categorysRepository = new SqliteCategoriesRepository()

  return categorysRepository.createCategory(params)
}
