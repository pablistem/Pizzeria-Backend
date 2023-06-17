import { Module } from '@nestjs/common';
import { ProductService } from './application/service/product.service';
import { ProductController } from './interface/product.controller';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
