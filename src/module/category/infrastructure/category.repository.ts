import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Category } from '../application/domain/category.entity';
import { ICategoryRepository } from '../application/repository/category.repository.interface';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  repository: Repository<Category>;
  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Category);
  }
  async save(category: Category): Promise<Category> {
    category.name.toLocaleLowerCase();
    const categoryToSave = this.repository.create(category);
    return await this.repository.save(categoryToSave);
  }

  async update(category: Category): Promise<Category> {
    return await this.repository.save(category);
  }

  async getAll(): Promise<Category[]> {
    return await this.repository.find();
  }

  async delete(category: Category): Promise<void> {
    await this.repository.delete(category);
  }

  async getCategoryById(id: number): Promise<Category> {
    return await this.repository.findOne({ where: { id } });
  }

  async findOneByName(name: string): Promise<Category> {
    return await this.repository.findOne({ where: { name } });
  }
}
