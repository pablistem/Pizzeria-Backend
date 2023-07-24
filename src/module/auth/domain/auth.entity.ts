import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  idUser: number | undefined;

  @Column()
  refreshToken: string;

  constructor(refreshToken: string, idUser?: number) {
    this.idUser = idUser;
    this.refreshToken = refreshToken;
  }
}
