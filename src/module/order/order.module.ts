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
import { ProductService } from '../product/application/service/product.service';
import { ItemService } from '../item/application/service/item.service';
import { ProductRepository } from '../product/infrastructure/product.repository';
import { ITEM_REPOSITORY } from '../item/application/repository/item.repository.interface';
import { ItemRepository } from '../item/infrastructure/persistence/item.repository';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Order]), AuthModule],
  controllers: [OrderController],
  providers: [
    OrderMapper,
    OrderService,
    ProductService,
    ProductRepository,
    ItemService,
    { provide: ITEM_REPOSITORY, useClass: ItemRepository },
    { provide: ORDER_REPOSITORY, useClass: OrderRepository },
  ],
})
export class OrderModule {}
