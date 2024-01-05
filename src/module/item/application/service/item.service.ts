import { Injectable, Inject } from '@nestjs/common';
import {
  IItemRepository,
  ITEM_REPOSITORY,
} from '../repository/item.repository.interface';
import { Item } from '../../domain/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @Inject(ITEM_REPOSITORY) private itemRepository: IItemRepository,
  ) {}

  async save(item: Item): Promise<Item> {
    return await this.itemRepository.create(item);
  }

  async delete(itemId: number) {
    await this.itemRepository.delete(itemId);
  }

  async deleteRelation(items: Array<Item>) {
    await this.itemRepository.deleteRelation(items);
  }
}
