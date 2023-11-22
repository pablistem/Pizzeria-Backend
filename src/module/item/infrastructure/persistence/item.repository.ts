import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { IItemRepository } from '../../application/repository/item.repository.interface';
import { Item } from '../../domain/item.entity';
@Injectable()
export class ItemRepository implements IItemRepository {
  repository: Repository<Item>;

  constructor(datasource: DataSource) {
    this.repository = datasource.getRepository(Item);
  }

  async find(): Promise<Item[]> {
    return this.repository.find();
  }
  async findOne(id: number): Promise<Item> {
    return this.repository.findOne({
      where: { id },
      relations: { product: true, order: true },
    });
  }
  async create(item: Item): Promise<Item> {
    const newItem = this.repository.create(item);
    return await this.repository.save(newItem);
  }
  async update(id: number, item: Item): Promise<Item> {
    const updatedItem = await this.repository.save(item);
    return updatedItem;
  }
  async delete(itemId: number): Promise<void> {
    await this.repository.delete(itemId);
  }
  async deleteRelation(items: Array<Item>) {
    return await this.repository.remove(items);
  }
}
