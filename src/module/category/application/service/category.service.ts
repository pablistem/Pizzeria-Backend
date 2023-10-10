import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  CATEGORY_REPOSITORY,
  ICategoryRepository,
} from '../repository/category.repository.interface';
import { Category } from '../domain/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async create(category: Category) {
    const categoryFound = await this.categoryRepository.finOneByName(
      category.name,
    );
    if (categoryFound) {
      throw new HttpException(
        `${category.name} already register`,
        HttpStatus.CONFLICT,
      );
    } else {
      return await this.categoryRepository.save(category);
    }
  }
  async update(id: number, category: Category) {
    const categoryFound = await this.categoryRepository.getCategoryById(id);
    if (categoryFound) {
      categoryFound.name = category.name;
      return await this.categoryRepository.save(categoryFound);
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: number) {
    const categoryFound = await this.categoryRepository.getCategoryById(id);
    if (categoryFound) {
      return await this.categoryRepository.delete(categoryFound);
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async getOne(id: number): Promise<Category> {
    return await this.categoryRepository.getCategoryById(id);
  }

  async getAll(): Promise<Category[]> {
    return this.categoryRepository.getAll();
  }
}
