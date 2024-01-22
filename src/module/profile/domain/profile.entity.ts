import { Base } from 'src/common/domain/base.entity';
import { User } from 'src/module/user/domain/user.entity';
import { Entity, Column, OneToOne } from 'typeorm';

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

  @OneToOne(() => User, {
    cascade: true,
  })
  user: User;
}
