import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './infrastructure/category.repository';
import { CategoryController } from './interface/category.controller';
import { Category } from './application/domain/category.entity';
import { AuthModule } from '../auth/auth.module';
import { CATEGORY_REPOSITORY } from './application/repository/category.repository.interface';
import { CategoryService } from './application/service/category.service';
import { CategoryMapper } from './application/category.mapper';
import { UserService } from '../user/application/service/user.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), AuthModule, UserModule],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    CategoryMapper,
    {
      provide: CATEGORY_REPOSITORY,
      useClass: CategoryRepository,
    },
  ],
})
export class CategoryModule {}
