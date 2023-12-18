import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

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
}
