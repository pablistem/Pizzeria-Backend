import { Base } from 'src/common/domain/base.entity';
import { Product } from '../../../../../src/module/product/domain/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Category extends Base {
  @Column({ unique: true, length: 50 })
  name: string | undefined;

  @OneToMany(() => Product, (products) => products.category)
  products: Product[] | undefined;
}
