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
  name: string;

  @Column()
  lastName: string;

  @Column()
  hash: string | undefined;

  @Column()
  verified: boolean | undefined;

  @Column()
  role: string | undefined;

  @Column({ default: '' })
  phone: string | undefined;

  @OneToMany(() => Order, (order) => order.user)
  @JoinColumn()
  orders: Order[] | undefined;

  @OneToMany(() => Auth, (auth) => auth.user)
  sessions: Auth | undefined;

  @OneToOne(() => Profile)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile | number;

  constructor(
    email: string,
    name: string,
    lastName: string,
    profile: number,
    hash: string | undefined,
    verified: boolean | undefined,
    role: string | undefined,
    phone?: string,
    createdAt?: Date | undefined,
    updatedAt?: Date | undefined,
    sessions?: undefined,
  ) {
    super();
    this.email = email;
    this.name = name;
    this.lastName = lastName;
    this.hash = hash;
    this.profile = profile;
    this.verified = verified;
    this.role = role;
    this.phone = phone;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.sessions = sessions;
  }
}
