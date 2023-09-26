import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './infrastructure/category.repository';
import { CategoryController } from './interface/category.controller';
import { Category } from './application/domain/category.entity';
import { AuthModule } from '../auth/auth.module';
import { CATEGORY_REPOSITORY } from './application/repository/category.repository.interface';
import { CategoryService } from './application/service/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), AuthModule],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    {
      provide: CATEGORY_REPOSITORY,
      useClass: CategoryRepository,
    },
  ],
})
export class CategoryModule {}
