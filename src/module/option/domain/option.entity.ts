import { Base } from '../../../common/domain/base.entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../../product/domain/product.entity';

@Entity()
export class Option extends Base {
  @Column()
  variant: string;

  @Column()
  price: number;

  @ManyToOne(() => Product, (product) => product.options)
  @JoinColumn({ name: 'product' })
  product: Product;
}
