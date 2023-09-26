import { Injectable } from '@nestjs/common';
import { Item } from '../domain/item.entity';
import { ItemDto } from './dto/item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemMapper {
  fromEntityToDto(item: Item): ItemDto {
    const dto = new ItemDto();
    Object.keys(dto).forEach((key) => {
      dto[key] = item[key];
    });
    return dto;
  }

  fromDtoToEntity(dto: UpdateItemDto | CreateItemDto | ItemDto): Item {
    const item = new Item();
    Object.keys(item).forEach((key) => {
      item[key] = dto[key];
    });
    return item;
  }
}
