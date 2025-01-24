import { SqliteCategoriesRepository } from '@/db/repositories/sqlite/sqlite-categories-repository'

export function fetchCategories() {
  const categoriesRepository = new SqliteCategoriesRepository()

  return categoriesRepository.getCategories()
}
