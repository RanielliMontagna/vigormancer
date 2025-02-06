import { SqliteCategoriesRepository } from '@/db/repositories/sqlite/sqlite-categories-repository'
import { UpdateCategoryParams } from '@/db/repositories/categories'

export function updateCategory(params: UpdateCategoryParams) {
  const categoriesRepository = new SqliteCategoriesRepository()

  return categoriesRepository.updateCategory(params)
}
