import { Module } from '@nestjs/common';
import { ITEM_REPOSITORY } from './application/repository/item.repository.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './domain/item.entity';
import { ItemMapper } from './application/item.mapper';
import { ItemService } from './application/service/item.service';
import { CommonModule } from 'src/common/common.module';
import { ItemRepository } from './infrastructure/persistence/item.repository';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([Item])],
  providers: [
    ItemMapper,
    ItemService,
    { provide: ITEM_REPOSITORY, useClass: ItemRepository },
  ],
  exports: [ItemService],
})
export class ItemModule {}
