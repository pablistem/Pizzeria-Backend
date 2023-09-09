import { Module } from '@nestjs/common';
import { ProductService } from './application/service/product.service';
import { ProductController } from './interface/product.controller';
import { ProductRepository } from './infrastructure/product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './domain/product.entity';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { AdminStrategy } from 'src/common/guards/admin.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), UserModule, AuthModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, AdminStrategy],
})
export class ProductModule {}
