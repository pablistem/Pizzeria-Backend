import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ unique: true })
  name: string | undefined;
}
