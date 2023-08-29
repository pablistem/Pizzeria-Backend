import { Module } from '@nestjs/common';
import { ProductService } from './application/service/product.service';
import { ProductController } from './interface/product.controller';
import { ProductRepository } from './infrastructure/product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './domain/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
