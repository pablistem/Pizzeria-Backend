import { User } from '../../../module/user/domain/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  refreshToken: string;

  @ManyToOne(() => User, (user) => user.sessions, { cascade: true })
  @JoinColumn()
  user: User;

  constructor(refreshToken: string, user: User) {
    this.user = user;
    this.refreshToken = refreshToken;
  }
}
