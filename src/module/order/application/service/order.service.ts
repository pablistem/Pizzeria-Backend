import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from '../repository/order.repository.interface';
import { Order, OrderStatus } from '../../domain/order.entity';
import { UserService } from '../../../../module/user/application/service/user.service';
import { RoleEnum } from '../../../../module/user/domain/user.entity';
import { CannotUpdateOrderException } from '../errors/CannotUpdateOrder';
@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) private orderRepository: IOrderRepository,
    @Inject(UserService) private userService: UserService,
  ) {}

  async delete(userId: number, orderId: number): Promise<void> {
    await this.findById(userId, orderId);
    return await this.orderRepository.delete(orderId);
  }

  async findAll(userId: number): Promise<Order[]> {
    const user = await this.userService.findUserById(userId);
    if (user.role === RoleEnum.admin) {
      return await this.orderRepository.find();
    }
    return user.orders;
  }

  async findById(userId: number, id: number) {
    const user = await this.userService.findUserById(userId);
    if (user.role === RoleEnum.admin) {
      const order = await this.orderRepository.findOne(id);
      if (!order) {
        throw new NotFoundException();
      }
      return order;
    }
    const order = user.orders.find((order) => order.id === id);
    if (!order) {
      throw new NotFoundException();
    }
    return order;
  }

  async create(userId: number, order: Order): Promise<Order> {
    const user = await this.userService.findUserById(userId);
    order.user = user;
    return await this.orderRepository.create(order);
  }

  async update(userId: number, orderId: number, updatedOrder: Order) {
    const user = await this.userService.findUserById(userId);
    if (user.role === RoleEnum.admin) {
      return await this.orderRepository.update(orderId, updatedOrder);
    }
    const order = user.orders.find((order) => order.id === orderId);
    if (!order) {
      throw new NotFoundException();
    }
    if (order.status !== OrderStatus.pending) {
      throw new CannotUpdateOrderException();
    }
    return await this.orderRepository.update(orderId, updatedOrder);
  }
}
