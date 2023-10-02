import { Category } from '../domain/category.entity';

export const CATEGORY_REPOSITORY = 'CATEGORY_REPOSITORY';

export interface ICategoryRepository {
  save(category: Category): Promise<Category>;
  update(category: Category): Promise<Category>;
  getAll(): Promise<Category[]>;
  delete(category: Category): Promise<void>;
  getCategoryById(id: number): Promise<Category>;
  finOneByName(name: string): Promise<Category>;
}
