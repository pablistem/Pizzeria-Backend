import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/module/user/domain/user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  phone: number;

  @Column({ default: '' })
  address: string;

  @OneToOne(() => User, (user) => user.profileId)
  @JoinColumn()
  userId: User;
}
