import { Product } from '../../../../../src/module/product/domain/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ unique: true })
  name: string | undefined;

  @OneToMany(() => Product, (products) => products.category)
  products: Product[] | undefined;
}
