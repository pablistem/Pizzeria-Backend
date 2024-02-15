import { Base } from 'src/common/domain/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Profile extends Base {
  @Column()
  avatar: string;

  @Column()
  street: string;

  @Column()
  height: number;

  @Column()
  postalCode: number;

  @Column()
  age: number;
}
