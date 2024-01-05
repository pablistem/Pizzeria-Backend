import { Base } from './../../../../src/common/domain/base.entity';
import { User } from '../../../module/user/domain/user.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Auth extends Base {
  @Column()
  refreshToken: string;

  @ManyToOne(() => User, (user) => user.sessions)
  @JoinColumn()
  user: User;

  constructor(refreshToken: string, user: User) {
    super();
    this.user = user;
    this.refreshToken = refreshToken;
  }
}
