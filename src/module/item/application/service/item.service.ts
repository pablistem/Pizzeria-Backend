import { Injectable, Inject } from '@nestjs/common';
import {
  ITEM_REPOSITORY,
  IItemRepository,
} from '../repository/item.repository.interface';
import { CreateItemDto } from '../dto/create-item.dto';

@Injectable()
export class ItemService {
  constructor(
    @Inject(ITEM_REPOSITORY) private itemRepository: IItemRepository,
  ) {}

  async save(newItem: CreateItemDto) {
    return await this.itemRepository.create(newItem);
  }
}
