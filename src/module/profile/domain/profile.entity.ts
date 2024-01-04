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

  @Column({ name: 'full_name', default: '', type: 'text', unique: true })
  fullName: string;

  @Column({ name: 'phone', default: '', type: 'int', unique: true })
  phone: number;

  @Column({ name: 'address', default: '', type: 'varchar', unique: true })
  address: string;

  @OneToOne(() => User, (user) => user.profileId)
  @JoinColumn({ name: 'user_id' })
  userId: User | number;
}
