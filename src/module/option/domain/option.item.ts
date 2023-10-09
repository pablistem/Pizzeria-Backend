import { Base } from '../../../common/domain/base.entity';
import { Entity, ManyToMany } from 'typeorm';
import { Item } from 'src/module/item/domain/item.entity';

@Entity()
export class OptionItems extends Base {
  @ManyToMany(() => Item, (item) => item.id)
  items: Item[];
}
