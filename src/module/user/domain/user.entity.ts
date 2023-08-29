import { Base } from 'src/common/domain/base.entity';
import { Auth } from '../../auth/domain/auth.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from 'src/module/order/domain/order.entity';

export enum RoleEnum {
  admin = 'admin',
  user = 'user',
}

@Entity()
export class User extends Base {
  @Column({ unique: true })
  email: string;
  @Column()
  name: string;
  @Column()
  lastName: string;
  @Column()
  hash: string | undefined;
  @Column()
  verified: boolean | undefined;
  @Column()
  role: string | undefined;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToOne(() => Auth)
  @JoinColumn()
  sessions: Auth | undefined;

  constructor(
    email: string,
    name: string,
    lastName: string,
    hash?: string | undefined,
    verified?: boolean | undefined,
    role?: string | undefined,
    createdAt?: Date | undefined,
    updatedAt?: Date | undefined,
    sessions?: undefined,
  ) {
    super();
    this.email = email;
    this.name = name;
    this.lastName = lastName;
    this.hash = hash;
    this.verified = verified;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.sessions = sessions;
  }
}
