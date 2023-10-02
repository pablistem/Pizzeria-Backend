import { Base } from '../../../common/domain/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Product } from 'src/module/product/domain/product.entity';

@Entity()
export class Option extends Base {
  @Column()
  variant: string;

  @Column()
  price: number;

  @ManyToOne(() => Product, (product) => product.options)
  product: Product;
}
