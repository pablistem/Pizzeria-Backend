import { Category } from '../../../../src/module/category/application/domain/category.entity';
import { Base } from '../../../common/domain/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Option } from 'src/module/option/domain/option.entity';

@Entity()
export class Product extends Base {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    default:
      'https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg',
  })
  image: string;

  @ManyToOne(() => Category, (category) => category.products, { cascade: true })
  @JoinColumn()
  category: Category | undefined;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  stock: number | undefined;

  @OneToMany(() => Option, (option) => option.product)
  options: Option[] | undefined;
}
