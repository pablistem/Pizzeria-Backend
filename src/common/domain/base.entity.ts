import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Base {
  @PrimaryGeneratedColumn()
  id: number | undefined;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date | undefined;
  @Column({ default: null })
  updatedAt: Date | undefined;
}
