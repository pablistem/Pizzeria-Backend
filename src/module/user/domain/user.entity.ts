import { Base } from '../../../common/domain/base.entity';
import { Auth } from '../../auth/domain/auth.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Order } from '../../../module/order/domain/order.entity';
import { Profile } from 'src/module/profile/domain/profile.entity';

export enum RoleEnum {
  admin = 'admin',
  user = 'user',
}

@Entity()
export class User extends Base {
  @Column({ unique: true })
  email: string;
  
  @Column()
  hash: string | undefined;

  @Column()
  verified: boolean | undefined;

  @Column()
  role: string | undefined;

  @OneToMany(() => Order, (order) => order.user)
  @JoinColumn()
  orders: Order[] | undefined;

  @OneToMany(() => Auth, (auth) => auth.user)
  sessions: Auth | undefined;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile | undefined;

  constructor(
    email: string,
    hash: string | undefined,
    verified: boolean | undefined,
    role: string | undefined,
    createdAt?: Date | undefined,
    updatedAt?: Date | undefined,
    sessions?: undefined,
  ) {
    super();
    this.email = email;
    this.hash = hash;
    this.verified = verified;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.sessions = sessions;
  }
}
