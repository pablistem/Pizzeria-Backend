import { Base } from 'src/common/domain/base.entity';
import { User } from 'src/module/user/domain/user.entity';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Profile extends Base {
  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  height: number;

  @Column({ nullable: true })
  postalCode: number;

  @Column({ nullable: true })
  age: number;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
