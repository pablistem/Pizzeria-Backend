import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from '../repository/order.repository.interface';
import { Order, OrderStatus } from '../../domain/order.entity';
import { UserService } from '../../../../module/user/application/service/user.service';
import { RoleEnum } from '../../../../module/user/domain/user.entity';

import {
  CannotAccessOrderException,
  CannotUpdateOrderException,
} from '../errors/CannotUpdateOrder';
import { Item } from 'src/module/item/domain/item.entity';
import { ProductService } from 'src/module/product/application/service/product.service';
import { ItemService } from 'src/module/item/application/service/item.service';
import { DeleteResult } from 'typeorm';
@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) private orderRepository: IOrderRepository,
    @Inject(UserService) private userService: UserService,
    @Inject(ProductService) private productService: ProductService,
    @Inject(ItemService) private itemService: ItemService,
  ) {}

  async delete(userId: number, orderId: number): Promise<DeleteResult> {
    const user = await this.userService.findUserById(userId);
    if (user.role === RoleEnum.admin) {
      const orderToDelete = await this.findById(userId, orderId);
      if (!orderToDelete) {
        throw new NotFoundException();
      }
      await this.itemService.deleteRelation(orderToDelete.items);
      return await this.orderRepository.delete(orderId);
    }
    const order = user.orders.find((order) => order.id === orderId);
    if (!order) {
      throw new CannotAccessOrderException();
    }
    await this.itemService.deleteRelation(order.items);
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
    const newOrder = new Order();

    const savedOrder = await this.orderRepository.create(newOrder);
    savedOrder.items = await this.saveItems(order.items, savedOrder);
    const total = savedOrder.items.reduce((acc, item) => {
      return acc + item.subTotal;
    }, 0);
    savedOrder.total = total;
    savedOrder.user = user;
    const createOrder = await this.orderRepository.save(savedOrder);
    return createOrder;
  }

  async findProductsByOrder(
    items: Item[],
  ): Promise<{ items: Item[]; total: number }> {
    let totalOrder = 0;
    const savedItems: Item[] = await Promise.all(
      items.map(async (item) => {
        const newItem = new Item();
        const product = await this.productService.getOne(item.product.id);
        const subtotal = product.price * item.quantity;
        newItem.subTotal = subtotal;
        newItem.quantity = item.quantity;
        newItem.discount = item.discount;
        newItem.product = product;
        totalOrder += subtotal;
        return newItem;
      }),
    );
    return { items: savedItems, total: totalOrder };
  }

  async update(userId: number, orderId: number, updatedOrder: Order) {
    const user = await this.userService.findUserById(userId);
    if (user.role === RoleEnum.admin) {
      return await this.orderRepository.update(orderId, updatedOrder);
    }
    const order = user.orders.find((order) => order.id === orderId);
    if (!order) {
      throw new CannotAccessOrderException();
    }
    if (order.status !== OrderStatus.pending) {
      throw new CannotUpdateOrderException();
    }
    return await this.orderRepository.update(orderId, updatedOrder);
  }

  async saveItems(items: Item[], savedOrder: Order): Promise<Item[]> {
    const savedItems = items.map(async (item: Item) => {
      const newItem = new Item();
      const product = await this.productService.getOne(item.product.id);
      const subtotal = product.price * item.quantity;
      newItem.product = product;
      newItem.order = savedOrder;
      newItem.subTotal = subtotal;
      newItem.quantity = item.quantity;
      const savedItem = await this.itemService.save(newItem);
      return savedItem;
    });
    const result = await Promise.all(savedItems);
    return result;
  }
}
