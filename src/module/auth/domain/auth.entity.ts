import { User } from '../../../module/user/domain/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idUser: number | undefined;

  @Column()
  refreshToken: string;

  @OneToOne(() => User, (user) => user.sessions)
  user: User;

  constructor(refreshToken: string, idUser?: number) {
    this.idUser = idUser;
    this.refreshToken = refreshToken;
  }
}
