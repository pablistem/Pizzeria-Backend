import { Injectable, Inject } from '@nestjs/common';
import {
  ITEM_REPOSITORY,
  IItemRepository,
} from '../repository/item.repository.interface';

@Injectable()
export class ItemService {
  constructor(
    @Inject(ITEM_REPOSITORY) private itemRepository: IItemRepository,
  ) {}
}
