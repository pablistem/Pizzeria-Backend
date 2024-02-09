import { Base } from 'src/common/domain/base.entity';
import { Address } from 'src/module/address/domain/address.entity';
import { User } from 'src/module/user/domain/user.entity';
import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Profile extends Base {
  @Column()
  avatar: string;

  @Column()
  street: string;

  @Column()
  height: number;

  @Column()
  postalCode: number;

  @Column()
  age: number;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user' })
  user: User;

  @OneToMany(() => Address, (address) => address.profile)
  addresses: Address[];
}
