import { Auth } from '../../auth/domain/auth.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum RoleEnum {
  admin = 'admin',
  user = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number | undefined;
  @Column({ unique: true })
  email: string;
  @Column()
  name: string;
  @Column()
  lastName: string;
  @Column()
  hash: string | undefined;
  @Column()
  verified: boolean | undefined;
  @Column()
  role: string | undefined;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date | undefined;
  @Column({ default: null })
  updatedAt: Date | undefined;
  @OneToOne(() => Auth)
  @JoinColumn()
  sessions: Auth | undefined;

  constructor(
    email: string,
    name: string,
    lastName: string,
    hash?: string | undefined,
    verified?: boolean | undefined,
    role?: string | undefined,
    createdAt?: Date | undefined,
    updatedAt?: Date | undefined,
    sessions?: undefined,
  ) {
    this.email = email;
    this.name = name;
    this.lastName = lastName;
    this.hash = hash;
    this.verified = verified;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.sessions = sessions;
  }
}
