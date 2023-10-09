import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Base {
  @PrimaryGeneratedColumn()
  id: number | undefined;
  @CreateDateColumn()
  createdAt: Date | undefined;
  @UpdateDateColumn()
  updatedAt: Date | undefined;
}
