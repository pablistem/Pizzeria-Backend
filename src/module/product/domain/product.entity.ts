import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { Base } from '../../../common/domain/base.entity';
import { Option } from '../../option/domain/option.entity';

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

  @Column({ default: 'Not implemented' })
  category: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  stock: number | undefined;

  @OneToMany(() => Option, (option) => option.product)
  @JoinColumn()
  options: Option[];
}
