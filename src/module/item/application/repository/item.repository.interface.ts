import { Item } from '../../domain/item.entity';

export const ITEM_REPOSITORY = 'ITEM_REPOSITORY';

export interface IItemRepository {
  delete(itemId: number): Promise<void>;
  find(): Promise<Item[]>;
  findOne(id: number): Promise<Item>;
  create(item: Item): Promise<Item>;
  update(id: number, item: Item): Promise<Item>;
}
