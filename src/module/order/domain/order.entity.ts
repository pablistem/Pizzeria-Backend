import { Base } from '../../../common/domain/base.entity';
import { User } from '../../../module/user/domain/user.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class Order extends Base {
  @Column()
  status: string;

  @Column()
  total: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
