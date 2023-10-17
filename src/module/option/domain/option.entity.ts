import { Base } from '../../../common/domain/base.entity';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Product } from 'src/module/product/domain/product.entity';
import { Order } from 'src/module/order/domain/order.entity';

@Entity()
export class Option extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  variant: string;

  @Column()
  price: number;

  @ManyToOne(() => Product, (product) => product.options)
  @JoinColumn({ name: 'product' })
  product: Product | undefined;
}
