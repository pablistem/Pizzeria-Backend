import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductService } from './application/service/product.service';
import { ProductController } from './interface/product.controller';
import { ProductRepository } from './infrastructure/product.repository';
import { Product } from './domain/product.entity';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { ProductMapper } from './product.mapper';
import { TestingModule } from '@nestjs/testing';
import { TestService } from '../test/application/service/test.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    UserModule,
    AuthModule,
    TestingModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, ProductMapper, TestService],
  exports: [ProductService],
})
export class ProductModule {}
