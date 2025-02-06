import { v4 as uuidv4 } from 'uuid'
import {
  CreateCategoryParams,
  UpdateCategoryParams,
  Category,
  CategoriesRepository,
} from '../categories'

import { db } from '@/db'

export class SqliteCategoriesRepository implements CategoriesRepository {
  async getCategories() {
    const categories = await db.getAllAsync<Category>('SELECT * FROM categories')

    return categories
  }

  async getCategory(id: string) {
    const category = await db.getFirstAsync<Category>('SELECT * FROM categories WHERE id = ?', [id])

    return category
  }

  async createCategory(category: CreateCategoryParams) {
    const id = uuidv4()

    await db.runAsync(
      'INSERT INTO categories (id, name, description, image, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
      [
        id,
        category.name,
        category.description,
        category.image,
        new Date().toISOString(),
        new Date().toISOString(),
      ],
    )

    return { id }
  }

  async updateCategory(category: UpdateCategoryParams) {
    await db.runAsync(
      'UPDATE categories SET name = ?, description = ?, image = ?, updatedAt = ? WHERE id = ?',
      [category.name, category.description, category.image, new Date().toISOString(), category.id],
    )

    return
  }

  async deleteCategory(id: string) {
    await db.runAsync('DELETE FROM categories WHERE id = ?', [id])

    return
  }
}
