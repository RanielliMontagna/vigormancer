export interface Category {
  id: string
  name: string
  description?: string
  image?: string
  createdAt: string
  updatedAt: string
}

export type CreateCategoryParams = Omit<Category, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateCategoryParams = Omit<Category, 'createdAt' | 'updatedAt'>

export interface CategoriesRepository {
  createCategory(category: CreateCategoryParams): Promise<{ id: string }>
  getCategory(id: string): Promise<Category | undefined>
  getCategories(): Promise<Category[]>
  updateCategory(category: UpdateCategoryParams): Promise<void>
  deleteCategory(id: string): Promise<void>
}
