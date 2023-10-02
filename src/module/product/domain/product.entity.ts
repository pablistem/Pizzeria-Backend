import { Base } from '../../../common/domain/base.entity';
import { Column, Entity } from 'typeorm';

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
  price: number | undefined;

  @Column({ default: 0 })
  stock: number | undefined;

  @Column({ default: 0 })
  options: string | undefined;
}
