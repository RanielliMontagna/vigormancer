import { SqliteCategoriesRepository } from '@/db/repositories/sqlite/sqlite-categories-repository'

export interface GetCategory {
  id: string
}

export function getCategory({ id }: GetCategory) {
  const categoriesRepository = new SqliteCategoriesRepository()

  return categoriesRepository.getCategory(id)
}
