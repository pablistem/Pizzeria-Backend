import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '../../application/repository/order.repository.interface';
import { Order } from '../../domain/order.entity';
import { DataSource, Repository } from 'typeorm';
@Injectable()
export class OrderRepository implements IOrderRepository {
  repository: Repository<Order>;

  constructor(datasource: DataSource) {
    this.repository = datasource.getRepository(Order);
  }

  async find(): Promise<Order[]> {
    return this.repository.find({
      relations: { user: true, items: { product: true } },
    });
  }

  async findOne(id: number): Promise<Order> {
    return this.repository.findOne({
      where: { id },
      relations: { user: true, items: true },
    });
  }

  async create(order: Order): Promise<Order> {
    const newOrder = this.repository.create(order);
    return await this.repository.save(newOrder);
  }

  async update(id: number, order: Order): Promise<Order> {
    const updatedOrder = await this.repository.save(order);
    return updatedOrder;
  }

  async delete(orderId: number): Promise<void> {
    await this.repository.delete(orderId);
  }

  async save(order: Order): Promise<Order> {
    return await this.repository.save(order);
  }
}
