import { Item } from 'src/module/item/domain/item.entity';
import { Base } from '../../../common/domain/base.entity';
import { User } from '../../../module/user/domain/user.entity';
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Option } from 'src/module/option/domain/option.entity';

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

  @Column({ nullable: true })
  total: number;

  @OneToMany(() => Item, (item) => item.order)
  items: Item[];

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToMany(() => Option)
  @JoinTable()
  options: Option[] | undefined;
}
