import { Module } from '@nestjs/common';
import { ORDER_REPOSITORY } from './application/repository/order.repository.interface';
import { OrderRepository } from './infrastructure/persistence/order.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './domain/order.entity';
import { OrderMapper } from './application/order.mapper';
import { OrderService } from './application/service/order.service';
import { OrderController } from './interface/order.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { ProductModule } from '../product/product.module';
import { ItemModule } from '../item/item.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Order]), AuthModule, ProductModule, ItemModule],
  controllers: [OrderController],
  providers: [
    OrderMapper,
    OrderService,
    { provide: ORDER_REPOSITORY, useClass: OrderRepository },
  ],
})
export class OrderModule {}
