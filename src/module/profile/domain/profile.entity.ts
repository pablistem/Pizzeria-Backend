import { Base } from 'src/common/domain/base.entity';
import { Address } from 'src/module/address/domain/address.entity';
import { User } from 'src/module/user/domain/user.entity';
import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity({ name: 'profile' })
export class Profile extends Base {
  @Column({ nullable: true })
  avatar: string;

  @Column()
  name: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  age: number;

  @Column()
  phone: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User | number;

  @OneToMany(() => Address, (address) => address.profile)
  addresses: Address[];
}
