import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  CATEGORY_REPOSITORY,
  ICategoryRepository,
} from '../repository/category.repository.interface';
import { Category } from '../domain/category.entity';
import { UserService } from '../../../../../src/module/user/application/service/user.service';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: ICategoryRepository,
    private readonly userService: UserService,
  ) {}

  async create(category: Category, userId: number): Promise<Category> {
    const admin = await this.userService.validateUserAdmin(userId);
    if (admin) {
      const categoryFound = await this.categoryRepository.findOneByName(
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
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
  async update(
    id: number,
    category: Category,
    userId: number,
  ): Promise<Category> {
    const admin = await this.userService.validateUserAdmin(userId);
    if (admin) {
      const categoryFound = await this.categoryRepository.getCategoryById(id);
      if (categoryFound) {
        categoryFound.name = category.name;
        return await this.categoryRepository.save(categoryFound);
      } else {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  async delete(id: number, userId: number): Promise<void> {
    const admin = await this.userService.validateUserAdmin(userId);
    if (admin) {
      const categoryFound = await this.categoryRepository.getCategoryById(id);
      if (categoryFound) {
        await this.categoryRepository.delete(categoryFound);
      } else {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  async getOne(id: number, userId: number): Promise<Category> {
    const admin = await this.userService.validateUserAdmin(userId);
    if (admin) {
      const category = await this.categoryRepository.getCategoryById(id);
      if (category) {
        return category;
      } else {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  async getAll(): Promise<Category[]> {
    return this.categoryRepository.getAll();
  }
}
