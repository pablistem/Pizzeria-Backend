import { Entity, Column, OneToOne } from 'typeorm';
import { Base } from 'src/common/domain/base.entity';

@Entity({ name: 'address'})
export class Address extends Base {

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  city: string;
  
  @Column({ type: 'json', nullable: true, default: '[]'})
  addresses: string[];
}