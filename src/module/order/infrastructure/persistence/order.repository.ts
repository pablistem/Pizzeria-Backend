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
    throw new Error('Method not implemented.');
  }
  findOne(id: number): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  create(order: Order): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  update(id: number, order: Order): Promise<Order> {
    throw new Error('Method not implemented.');
  }
}
