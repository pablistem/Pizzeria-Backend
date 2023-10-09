import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Base {
  @PrimaryGeneratedColumn()
  id: number | undefined;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @CreateDateColumn()
  createdAt: Date | undefined;
  @Column({ default: null })
  @UpdateDateColumn()
  updatedAt: Date | undefined;
}
