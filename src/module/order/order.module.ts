import { Module } from '@nestjs/common';
import { ORDER_REPOSITORY } from './application/repository/order.repository.interface';
import { OrderRepository } from './infrastructure/persistence/order.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './domain/order.entity';
import { OrderMapper } from './application/order.mapper';
import { OrderService } from './application/service/order.service';
import { OrderController } from './interface/order.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    OrderMapper,
    OrderService,
    { provide: ORDER_REPOSITORY, useClass: OrderRepository },
  ],
  exports: [],
})
export class OrderModule {}
