import { Injectable, Inject } from '@nestjs/common';
import { ITEM_REPOSITORY } from '../repository/item.repository.interface';
import { Item } from '../../domain/item.entity';
import { ItemRepository } from '../../infrastructure/persistence/item.repository';
import { Order } from '../../../../../src/module/order/domain/order.entity';

@Injectable()
export class ItemService {
  constructor(
    @Inject(ITEM_REPOSITORY) private itemRepository: ItemRepository,
  ) {}

  async save(item: Item): Promise<Item> {
    return await this.itemRepository.create(item);
  }

  async delete(itemId: number) {
    await this.itemRepository.delete(itemId);
  }

  async deleteRelation(items: Array<Item>){
    await this.itemRepository.deleteRelation(items)
  }

}
