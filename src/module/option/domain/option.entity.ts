import { Base } from '../../../common/domain/base.entity';
import { Column, Entity, ManyToOne, JoinTable } from 'typeorm';
import { Product } from 'src/module/product/domain/product.entity';

@Entity()
export class Option {
  @Column()
  variant: string;

  @Column()
  price: number;

  @ManyToOne(() => Product, (product) => product.options)
  @JoinTable({ name: 'product' })
  product: Product;
}
