import { User } from '../../../module/user/domain/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  refreshToken: string;

  @OneToOne(() => User, (user) => user.sessions, { cascade: true })
  user: User;

  constructor(refreshToken: string, user: User) {
    this.user = user;
    this.refreshToken = refreshToken;
  }
}
