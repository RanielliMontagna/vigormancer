import { SqliteCategoriesRepository } from '@/db/repositories/sqlite/sqlite-categories-repository'

export interface DeleteCategory {
  id: string
}

export function deleteCategory({ id }: DeleteCategory) {
  const categoriesRepository = new SqliteCategoriesRepository()

  return categoriesRepository.deleteCategory(id)
}
