import { Order } from '../../domain/order.entity';

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';

export interface IOrderRepository {
  find(): Promise<Order[]>;
  findOne(id: number): Promise<Order>
  create(order: Order): Promise<Order>;
  update(id: number, order: Order): Promise<Order>;
}
