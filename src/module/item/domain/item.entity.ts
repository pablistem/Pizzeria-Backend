import { Order } from '../../../../src/module/order/domain/order.entity';
import { Base } from '../../../common/domain/base.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../../../../src/module/product/domain/product.entity';

export enum OrderStatus {
  pending = 'pending',
  accepted = 'accepted',
  canceled = 'canceled',
  delivered = 'delivered',
}

@Entity()
export class Item extends Base {
  @Column()
  quantity: number;

  @Column()
  discount: number;

  @Column()
  subTotal: number;

  @ManyToOne(() => Order, (order) => order.items, { nullable: false })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
