import { Base } from '../../../common/domain/base.entity';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/domain/product.entity';

@Entity()
export class Option extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  variant: string;

  @Column()
  price: number;

  @ManyToOne(() => Product, (product) => product.options, { cascade: true })
  @JoinColumn({ name: 'product' })
  product: Product;
}
