import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({default:'https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg'})
  image: string;

  @Column()
  category: string;

  @Column({default:0})
  price: number;

  @Column({default:0})
  stock: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date | undefined;

  @Column({ default: null })
  updatedAt: Date | undefined;

  constructor(
    name:string,
    description:string,
    category: string,
    price:number,
    image?:string,
    stock?:number,
  ){
    this.name=name
    this.description=description
    this.image=image
    this.category=category
    this.price=price
    this.stock=stock
  }
}
