import { Item } from '../../item/domain/item.entity';
import { Base } from '../../../common/domain/base.entity';
import { User } from '../../../module/user/domain/user.entity';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

export enum OrderStatus {
  pending = 'pending',
  accepted = 'accepted',
  canceled = 'canceled',
  delivered = 'delivered',
}

@Entity()
export class Order extends Base {
  @Column({ default: OrderStatus.pending })
  status: string;

  /* It shows the total  */
  @Column({ nullable: true })
  total: number;

  @OneToMany(() => Item, (item) => item.order)
  items: Item[];

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
