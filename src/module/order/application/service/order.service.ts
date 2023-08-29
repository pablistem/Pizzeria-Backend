import { Injectable, Inject } from '@nestjs/common';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from '../repository/order.repository.interface';
import { Order } from '../../domain/order.entity';
import { UserService } from 'src/module/user/application/service/user.service';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) private orderRepository: IOrderRepository,
    @Inject(UserService) private userService: UserService,
  ) {}

  async create(order: Order): Promise<Order> {
    return await this.orderRepository.create(order);
  }
}
