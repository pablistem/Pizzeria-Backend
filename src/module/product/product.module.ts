import { Module } from '@nestjs/common';
import { ProductService } from './application/service/product.service';
import { ProductController } from './interface/product.controller';
import { ProductRepository } from './infrastructure/product.repository';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
