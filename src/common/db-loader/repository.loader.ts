import { Injectable } from '@nestjs/common';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { DataSource } from 'typeorm';

@Injectable()
export class DbLoaderRepository {
  dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async loadFixture(fixture: object[], entity: EntityClassOrSchema | string) {
    await this.dataSource.getRepository(entity).save(fixture);
  }
}