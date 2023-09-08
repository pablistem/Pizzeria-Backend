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

  find(): Promise<Order[]> {
    return this.repository.find();
  }
  findOne(id: number): Promise<Order> {
    return this.repository.findOne({ where: { id } });
  }
  async create(order: Order): Promise<Order> {
    const newOrder = this.repository.create(order);
    return await this.repository.save(newOrder);
  }
  update(id: number, order: Order): Promise<Order> {
    return;
  }
}
